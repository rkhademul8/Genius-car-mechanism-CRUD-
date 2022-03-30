const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors=require('cors')

const ObjectId=require('mongodb').ObjectId



require('dotenv').config()



// Genius-car
// xwUKATN6EgzdCZ0h

const app = express()
const port = process.env.PORT || 5000

// midleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pptx3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const database = client.db("Cardb");
      const servicesCollection = database.collection("services");

      //  get API

      app.get('/services',async(req,res)=>{
        const cursor= servicesCollection.find({})
        const services =await cursor.toArray()
        res.send(services)
      })

      // Get Single Service 

      app.get('/services/:id',async(req,res)=>{
        const id=req.params.id
        const query={_id:ObjectId(id)}
        const service=await servicesCollection.findOne(query)
        res.json(service)
      })

      // post API
      app.post('/services',async(req,res)=>{
        const service=req.body
        const result=await servicesCollection.insertOne(service)
        // console.log("hit the post api",service);
        res.json(result)
      })

      // delete API
      app.delete('/services/:id',async(req,res)=>{
        const id=req.params.id
        const query={_id:ObjectId(id)}
        const result=await servicesCollection.deleteOne(query)
        res.json(result)
      })
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Khademul!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})