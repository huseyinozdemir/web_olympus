import { app, appServer } from '../../server';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import ContactModel from '../models/Contact';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.disconnect();
  await mongoose.connect(mongoUri, {});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  appServer.close();
});

describe('POST /api/contact/add', () => {
  it('should add contact info to the database', async () => {
    const contactInfo = {
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      phone: '900400440',
      message: 'Test message',
    };

    const response = await request(app)
      .post('/api/contact/add')
      .send(contactInfo)
      .expect(201);

    expect(response.body.message).toBe('Created successfully.');

    const savedContactInfo = await ContactModel.findOne({ email: 'john@example.com' });
    expect(savedContactInfo).toBeTruthy();
    expect(savedContactInfo?.name).toBe('John');
    expect(savedContactInfo?.message).toBe('Test message');
    return;
  });

  it('should return 500 if an error occurs during saving', async () => {
    const contactInfo = {
      email: 'john@example.com',
      message: 'Test message',
    };

    await request(app)
      .post('/api/contact/add')
      .send(contactInfo)
      .expect(500);
    return;
  });
});

describe('GET /api/contact/list', () => {
  it('should return all contact infos from the database', async () => {
    await ContactModel.deleteMany();
    await ContactModel.create({
      name: 'Jane',
      surname: 'Doe',
      email: 'jane@example.com',
      message: 'Test message 1',
    });
    await ContactModel.create({
      name: 'Bob',
      surname: 'Smith',
      email: 'bob@example.com',
      message: 'Test message 2',
    });

    const response = await request(app)
      .get('/api/contact/list')
      .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('Jane');
    expect(response.body[1].name).toBe('Bob');
  });

});
