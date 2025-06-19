import {Server} from 'http'
import app from './app';
import mongoose from 'mongoose';

let server: Server;

const PORT = 5000;


async function main(){
    try {
        await mongoose.connect('mongodb+srv://libraryManagementSystem:KUmZru5RXgd7b4bt@cluster0.laemifb.mongodb.net/libraryManagementSystem?retryWrites=true&w=majority&appName=Cluster0');

        console.log('connected to mongodb using mongoose');

        server = app.listen(PORT, () =>{
            console.log(`App is listen on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();