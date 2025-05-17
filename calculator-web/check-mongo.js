// check-mongo.js
const { MongoClient } = require('mongodb');

// Use the connection string from your .env.local file
const uri = process.env.MONGODB_URI || 'mongodb+srv://homes4370:pOOEzcPjr93gV7JF@cluster0.dfwjapy.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

async function main() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas.');

    // List all databases
    const dbs = await client.db().admin().listDatabases();
    console.log('Databases:', dbs.databases.map(db => db.name));

    // Use 'test' as the default DB name if not specified
    const dbName = uri.split('/').pop().split('?')[0] || 'test';
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    // Show first 5 users
    if (collections.some(c => c.name === 'users')) {
      const users = await db.collection('users').find({}).limit(5).toArray();
      console.log('First 5 users:', users);
    } else {
      console.log('No users collection found.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main();
