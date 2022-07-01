const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
var cors = require('cors')

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("ajke amar mon valo nei");
// });





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

        app.post("/todo", async (req, res) => {
            const newTask = req.body;
            const result = await toDoCollection.insertOne(newTask);
            res.send(result);
        });

        app.put("/task/:id", async (req, res) => {
            const id = req.params.id;
            const completed = req.body.completed;

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const completedTask = {
                $set: {
                    completed,
                },
            };
            const result = await toDoCollection.updateOne(
                filter,
                completedTask,
                options
            );
            res.send(result);
        });


        app.put("/editTask/:id", async (req, res) => {
            const id = req.params.id;
            const { task, date, time, completed } = req.body;

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedTask = {
                $set: {
                    date,
                    time,
                    task,
                    completed,
                },
            };
            const result = await toDoCollection.updateOne(
                filter,
                updatedTask,
                options
            );
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
