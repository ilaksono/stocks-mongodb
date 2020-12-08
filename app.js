const app = require('express')();
const mongoose = require('mongoose');
const Post = require('./models/Post.js');
const cors = require('cors');
mongoose.connect("mongodb+srv://mongo:123@cluster0.tcldz.mongodb.net/testdb?retryWrites=true&w=majority", { useNewUrlParser: true }, () => {
  console.log('connected');
});

const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mongo:123@cluster0.tcldz.mongodb.net/ATLAS-Y40O4Z-SHARD-0?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
app.use(cors());
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongo:123@cluster0.tcldz.mongodb.net/testdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });



app.get('/', (req, res) => {
  res.send('we are on home');
});

app.post('/', async (req, res) => {
  // console.log(req.body);
  // res.json({msg:'hi'} );
  try {
    client.connect(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });
    const post = new Post({ ...req.body });
    const save = await post.save();
    res.json(save);

  } catch (er) {
    console.log(er);
    res.status(404).json({ msg: er });
  }
});
app.listen(3000, () => {
  console.log('listening 3000');
});