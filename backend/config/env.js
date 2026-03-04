import {config} from 'dotenv';
config();
export const{ PORT, NODE_ENV, DB_URI, JWT_SECRET_KEY, JWT_EXPIRES_IN} = process.env;