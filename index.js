const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gqfd9.mongodb.net/?retryWrites=true&w=majority`;

// mongodb connection
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('gadget_house').collection('inventories');
        const userCollection = client.db('gadget_house').collection('users');


        //api for inventories data load
        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        });

        // user creating
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send({ result, token });
        });



    }
    finally {

    }
}

run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Warehouse management server is Running!!')
});

app.listen(port, () => {
    console.log(`Gadget House app to port, ${port}`);
})



