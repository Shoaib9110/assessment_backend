// src/sseHandler.ts
import { Response } from 'express';

const clients: Response[] = [];

export const addClient = (res: Response) => {
    clients.push(res);

    res.on('close', () => {
        clients.splice(clients.indexOf(res), 1);
    });
};

export const broadcastNewProgress = (newProgress: any) => {
    clients.forEach(client => client.write(`data: ${JSON.stringify(newProgress)}\n\n`));
};
