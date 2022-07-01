const express = require("express");
const app = express();
require('dotenv').config()
var cors = require('cors')

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("ajke amar mon valo nei");
// });




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@todo.kbflljo.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
    try {
        await client.connect();
        const toDoCollection = client.db("tododatabase").collection("todolist");

        app.get("/todo", async (req, res) => {
            const query = {completed: false};
            const cursor = toDoCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/completed", async (req, res) => {
            const query = {completed: true};
            const cursor = toDoCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);





app.listen(port, () => {
    console.log("runing to do");
});
