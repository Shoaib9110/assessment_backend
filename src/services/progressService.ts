import { Request, Response } from 'express';
import Progress from '../models/progress';
import { User } from '../models/user';
import { broadcastNewProgress } from '../sseHandler';

// export const getAllProgress = async (req: Request, res: Response) => {
//     const progress = await Progress.findAll();
//     res.json(progress);
// };


export const getAllProgress = async (req: Request, res: Response) => {
    try {
        const progress = await Progress.findAll({
            include: {
                model: User,
                attributes: ['firstName'],
            },
        });
        const formattedProgress = progress.map(p => {
            const dateValue = p.date;
            if (!dateValue) return { ...p.toJSON(), date: null };

            const formattedDate = dateValue.toISOString().split('T')[0];

            return {
                ...p.toJSON(),
                date: formattedDate
            };
        });

        res.json(formattedProgress);
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json({ error: 'An error occurred while fetching progress data.' });
    }
};

export const getProgressByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const progress = await Progress.findAll({ where: { user_id: userId } });
    res.json(progress);
};

export const addProgress = async (req: Request, res: Response) => {
  try {
      const { user_id, date, value } = req.body;
      const createdAt = new Date();
      const updatedAt = new Date();

      const newProgress = await Progress.create({ user_id, date, value, createdAt, updatedAt});

      broadcastNewProgress(newProgress); // Notify all clients about the new progress

      res.status(201).json(newProgress);
  } catch (error) {
      console.error('Error while adding progress:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
