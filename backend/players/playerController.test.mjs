import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import playerRoutes from './playerRoutes.js'; // Adjust the path as necessary
import connectDB from '../config/db.js';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

const app = express();
app.use(express.json());

let connection;

before(async () => {
    connection = await connectDB();
    app.use('/api/players', playerRoutes);
});

describe('Players Controller', () => {
    it('should create a new player', async () => {
        const res = await request(app)
            .post('/api/players')
            .send({ userId: 'jimmy' });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('userId', 'jimmy');
    });

    it('should get user by id', async () => {
        const res = await request(app).get('/api/players/jimmy');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object'); // Adjusted to check for an object
    });
});
