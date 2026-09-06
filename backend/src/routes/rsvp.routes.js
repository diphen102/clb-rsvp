import { Router } from 'express';
import { submitRsvp } from '../controllers/rsvp.controller.js';
import { rsvpValidationRules, handleValidationErrors } from '../middleware/validate.middleware.js';
import { rsvpRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', rsvpRateLimiter, rsvpValidationRules, handleValidationErrors, submitRsvp);

export default router;
