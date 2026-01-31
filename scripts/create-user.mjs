import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
    console.error('Error: MONGODB_URI or DB_NAME not found in environment');
    process.exit(1);
}

async function main() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('user');

        const username = 'admin';
        const password = 'password123';
        const role = 'super-admin';

        // Check if user already exists
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            console.log(`User '${username}' already exists. Updating role to '${role}'...`);
            await collection.updateOne({ username }, { $set: { role, updatedAt: new Date() } });
            console.log('User role updated successfully.');
        } else {
            await collection.insertOne({
                username,
                password,
                role,
                email: 'admin@example.com',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log(`User '${username}' created successfully with role '${role}'.`);
            console.log(`Initial password: ${password}`);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

main();
