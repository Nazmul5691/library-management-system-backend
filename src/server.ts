import {Server} from 'http'
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let server: Server;


const PORT = process.env.PORT || 5000;


async function main(){
    try {
        await mongoose.connect(process.env.DATABASE_URL as string);

        console.log('connected to mongodb using mongoose');

        server = app.listen(PORT, () =>{
            console.log(`App is listen on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();