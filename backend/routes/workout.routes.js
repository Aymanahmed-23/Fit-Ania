import { Router} from 'express';

import { generateWorkout} from '../controller/workout.controller.js';

const workoutRouter= Router();

workoutRouter.post('/generate', generateWorkout);


export default workoutRouter;