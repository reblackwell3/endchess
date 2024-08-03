// backend/games/gameController.test.js
import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import gameRoutes from './gameRoutes.js';
import connectDB from '../config/db.js';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

const app = express();
app.use(express.json());

before(async () => {
    await connectDB();
    app.use('/api/games', gameRoutes);
});

describe('Games Controller', () => {
    it('should get random game', async () => {
        const res = await request(app).get('/api/games/random');
        expect(res.status).to.equal(200);
    });
});
