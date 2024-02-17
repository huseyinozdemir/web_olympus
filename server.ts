import * as express from 'express';
import * as path from 'path';
import mongoose from 'mongoose';
import * as cors from 'cors';
import router from './src/routers/index';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "5001", 10);

const database: string = process.env.MONGO_DB_CONNECT ?? '';

if (!database) {
  throw new Error('MONGO_DB_CONNECT environment variable is not set');
}

mongoose.connect(database, {
}).then(() => {
  console.log("[MongoDB] Connection Succeeded.");
}).catch((err: Error | null) => {
  console.error('Error in DB connection:', err);
});

const app = express();
app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

const appServer = app.listen(PORT, () => {
    console.log(`[SERVER] Running on port ${PORT}.`);
});

export {app, appServer};
