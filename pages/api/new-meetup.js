// api route : /api/new-meetup
// only POST request

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://venkat:5Rb75UZTXrfXumm@cluster0.i6tjm.mongodb.net/meetupdb?retryWrites=true&w=majority');

        //creates a new db if db doest exists, and if no value is passed it uses db in the connection string
        const db = client.db();

        //creates a new collection if collection does'nt exists
        const collection = db.collection('meetups');

        const result = await collection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'meeting inserted' });
    }
}

export default handler;