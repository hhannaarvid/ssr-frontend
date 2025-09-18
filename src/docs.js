import database from './db/database.js';
import { ObjectId } from 'mongodb';

const docs = {
    // Hämta alla dokument
    getAll: async function () {
        const { collection, client } = await database.getDb();
        const res = await collection.find().toArray();
        await client.close();
        return res;
    },

    // Hämta ett dokument baserat på ID
    getOne: async function (id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }

        const { collection, client } = await database.getDb();
        const documentID = { _id: new ObjectId(id) };
        const res = await collection.findOne(documentID);
        await client.close();
        return res;
    },

    // Lägg till ett nytt dokument
    addOne: async function (body) {
        const { collection, client } = await database.getDb();

        const doc = {
            title: body.title,
            content: body.content
        };

        const res = await collection.insertOne(doc);
        await client.close();
        return res;
    },

    // Uppdatera ett dokument baserat på ID
    updateOne: async function (id, body) {
        if (!ObjectId.isValid(id)) {
            return null;
        }

        const { collection, client } = await database.getDb();

        const update = {
            $set: {
                title: body.title,
                content: body.content
            }
        };

        const res = await collection.updateOne(
            { _id: new ObjectId(id) },
            update
        );

        await client.close();
        return res;
    }
};

export default docs;
