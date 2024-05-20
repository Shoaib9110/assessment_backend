// src/routes/eventRoutes.ts
import { Router } from 'express';
import { addClient } from '../sseHandler';

const router = Router();

router.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    addClient(res);
});

export default router;
