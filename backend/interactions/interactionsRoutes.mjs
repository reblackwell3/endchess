// routes/interactionsRoutes.mjs
import express from 'express';
import { createOrUpdateInteraction, getInteractions } from './interactionsController.mjs';

const router = express.Router();

router.post('/interactions', createOrUpdateInteraction);
router.get('/interactions/:username', getInteractions);

export default router;
