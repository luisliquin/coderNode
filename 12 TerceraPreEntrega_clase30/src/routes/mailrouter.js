import { Router } from 'express';
import transporter from '../config/nodemailer.js';

const router = Router();

router.post('/send', async (req, res) => {
    const { to, subject, html } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to,
            subject,
            html
        });
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

export default router;