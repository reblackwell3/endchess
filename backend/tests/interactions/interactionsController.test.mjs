// tests/interactions.test.mjs
import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import interactionsRoutes from '../../interactions/interactionsRoutes.mjs'; // Adjust the path as necessary
import mongoose from 'mongoose';
import connectDB from '../../config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

const app = express();
app.use(express.json());

before(async () => {
    await connectDB();
    app.use('/api', interactionsRoutes);
});

describe('Interactions Controller', () => {
    it('should create or update an interaction', async () => {
        const res = await request(app)
            .post('/api/interactions')
            .send({
                username: 'testuser',
                featureName: 'solve_puzzles',
                featureId: 'puzzle001',
                result: 'success'
            });
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Interaction updated successfully');
    });

    it('should get interactions for a user', async () => {
        const res = await request(app).get('/api/interactions/testuser');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('username', 'testuser');
        expect(res.body.interactions).to.have.property('solve_puzzles');
        expect(res.body.interactions.solve_puzzles.feature_id).to.equal('puzzle001');
        expect(res.body.interactions.solve_puzzles.interactions[0]).to.have.property('result', 'success');
    });
});
