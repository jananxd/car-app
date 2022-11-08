import { MongoClient, Db } from "mongodb"

class Mongo {
    private mongoClient: MongoClient

    constructor() {
        const uri = `mongodb://${process.env.MONGO_HOST}:27017`;
        this.mongoClient = new MongoClient(uri);
    }

    async connect(): Promise<void> {
        await this.mongoClient.connect();
    }

    get db(): Db {
        return this.mongoClient.db(process.env.DB_NAME);
    }
}

export default new Mongo()
