import { Request, Response } from 'express';
import { User } from '../models/user';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName']
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
};