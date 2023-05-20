const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://ahaduzzaman45503:d4IbTfNI8nR5uH0V@cluster0.qzwnegb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const alltoydatabase = client.db("alltoycarDB");
    const alltoyCollection = alltoydatabase.collection("alltoycardata");

    app.get('/toy', async(req, res) => {
      const cursor = alltoyCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    });

    app.get('/toy/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const toy = alltoyCollection.find(toy => toy.id === id) || {};
      res.send(toy)
    })

    const database = client.db("toyDB");
    const carCollection = database.collection("toyData");

    app.get('/toycardata', async(req, res) => {
      const cursor = carCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.post('/toycardata', async(req, res) => {
      const cardata = req.body;
      console.log('new car data', cardata);
      const result = await carCollection.insertOne(cardata);
      res.send(result);
    });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Server is Running Now')
});

app.listen(port, () => {
  console.log(`Server side running on this port ${port}`)
})