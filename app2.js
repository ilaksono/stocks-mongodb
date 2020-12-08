const MongoClient = require('mongodb').MongoClient;
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// Connection url

const url = 'mongodb://localhost:27017';

// Database Name

const dbName = 'test';

// Connect using MongoClient

// MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

//   // Select the database by name

//   const testDb = client.db(dbName);
//   console.log(testDb);
//   client.close();

// });

app.post('/', (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, async function (err, client) {

    // Select the database by name
    try {
      const testDb = client.db(dbName);
      const stocks = testDb.collection('stocks').initializeUnorderedBulkOp();
      stocks
        .insert({ ...req.body })
        .insert({ symbol: 'OK', name: 'DONE' });
      console.log(stocks);
      // coll.insert({ ...req.body });
      await stocks.execute();

    } catch (er) {
      console.log(er);
    }

    res.json('ok');
    client.close();

  });
});

app.post('/hi', (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
    try {
      const data = req.body.data;
      const db = client.db('trader');
      const stocks = db.collection('stocks').initializeOrderedBulkOp();
      console.log(data);
      const prom = data.map(each => {
        return stocks.insert({...each})
      });
      await stocks.execute();
      console.log('done');
    } catch (er) {
      console.log(er);
    }

    res.json('ok');
    client.close();

  });
});

app.listen(3000);