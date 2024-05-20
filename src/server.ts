// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import progressRoutes from './routes/progressRoutes';
import eventRoutes from './routes/eventRoutes';
import http from 'http';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api', progressRoutes);
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
