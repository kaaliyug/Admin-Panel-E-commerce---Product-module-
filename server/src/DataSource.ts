import 'reflect-metadata';
import { createConnection } from "typeorm";
import { Products } from "./entities/product.entity";
import * as dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,    
    database: process.env.DB_NAME,    
    synchronize: true, 
    // logging: true,  just to see what's happening in the console.
    logging: false,
    entities: [Products], // this is where were going to put our data models
    // entities: [ process.env.NODE_ENV === 'production' ? __dirname + '/entities/*.js' : 'src/entities/**/*.ts',], 
    migrations: [],
    subscribers: [],  
  });
}


