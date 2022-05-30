const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 6000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gqfd9.mongodb.net/?retryWrites=true&w=majority`;

// mongodb connection
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        await client.connect();
        console.log('database connected');
    }
    finally {

    }
}

run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Warehouse management server is Running!!')
});

app.listen(port, () => {
    console.log('Listening to port', port);
})

