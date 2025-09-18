import { MongoClient } from "mongodb";
import { createRequire } from "module";
import dotenv from "dotenv";
dotenv.config();
const require = createRequire(import.meta.url);

const data = require("./setup.json");
const collectionName = "docs";

const database = {
    getDb: async function () {
        const dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@hocdocs.lkeu4fl.mongodb.net/?retryWrites=true&w=majority&appName=hocdocs`;

        const client = await MongoClient.connect(dsn);
        const db = client.db();
        const collection = db.collection(collectionName);

        return { collection, client };
    },

    reset: async function () {
        const { collection, client } = await this.getDb();

        await collection.deleteMany({});
        await collection.insertMany(data);

        console.log("Reset klar!");
        await client.close();
    }
};

export default database;
