const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// middleware for
app.use(cors());
app.use(express.json());
//this mongodb id and password
// process.env.DB_USER;
// process.env.DB_PASSWORD;
// install mongodb plugin
// console.log(process.env.DB_USER);
const uri =
  "mongodb+srv://RoadMuster:DJ7AMu9d8txtQ2Vx@cluster0.ci8pa6r.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //01
    // Create a new data and connect to MongoDB
    const productsCollection = client.db("productsDB").collection("products");
    //get data form client site to send  server "C" 01
    app.post("/addProducts", async (req, res) => {
      const product = req.body;
      console.log(product);
      // Insert the data on mongodb
      const result = await productsCollection.insertOne(product);
      res?.send(result);
    });
    //Read data and send on client site display 02
    app.get("/addProducts", async (req, res) => {
      const cursor = productsCollection.find();
      const products = await cursor.toArray();
      res.send(products);
    });
    //01 finish
    //  // Create a new data and connect to MongoDB 01
    const myCartsCollection = client.db("myCartDB").collection("myCarts");
    //get data form client site to send  server "C" 02
    app.post("/myCarts", async (req, res) => {
      const myCart = req.body;
      console.log(myCart);
      // Insert the data on mongodb
      const result = await myCartsCollection.insertOne(myCart);
      res?.send(result);
    });
    //Read data and send on client site display 02
    app.get("/myCarts", async (req, res) => {
      const cursor = myCartsCollection.find();
      const myCarts = await cursor.toArray();
      res.send(myCarts);
    });
    //delete single one by one by id 03
    app.delete("/myCarts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myCartsCollection.deleteOne(query);
      res.send(result);
      console.log(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//try to connect on server
app.get("/", (req, res) => {
  res.send("coming from server");
});
//this function always hear
app.listen(port, () => {
  console.log(`connecting server on port ${port}`);
});
