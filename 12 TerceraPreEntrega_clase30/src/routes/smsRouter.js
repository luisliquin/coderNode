import { Router } from 'express';
import client from '../config/twilio.js';

const router = Router();

router.post('/send', async (req, res) => {
    const { to, body } = req.body;
    try {
        await client.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });
        res.status(200).json({ message: 'SMS sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send SMS', error });
    }
});

export default router;