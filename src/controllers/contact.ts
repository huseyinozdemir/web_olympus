
import { Request, Response } from 'express';
import Contact from "../models/Contact";


export const addContact = async (req: Request, res: Response) => {
    const { name, surname, email, message } = req.body;
    try {
        const contactInfo = new Contact({ name, surname, email, message });
        await contactInfo.save();
        return res.status(201).json({ message: 'Created successfully.' });
    } catch (err: any) {
        return res.status(500).json({ error: `${err}` });
    }
};


export const getAllContact = async (req: Request, res: Response) => {
    try {
        const contactInfos = await Contact.find(req.query).select("name surname email message");
        return res.status(200).json(contactInfos);
    } catch (err: any) {
        return res.status(500).json({ error: `${err}` });
    }
};