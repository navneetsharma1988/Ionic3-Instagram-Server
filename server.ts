import * as express from 'express';
import * as multer from 'multer'
import * as cors from 'cors'
import * as mongoose from 'mongoose'


export let UPLOAD_PATH = 'uploads';
export let PORT = 3000;

// Multer Settings for file upload
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

export let upload = multer({storage: storage});

// Initialise App
export const app = express();
app.use(cors());

// Load our routes
let routes = require('./routes');

// Setup Database
let uri = 'mongodb://admin:admin@cluster0-shard-00-00-u5qop.mongodb.net:27017,cluster0-shard-00-01-u5qop.mongodb.net:27017,cluster0-shard-00-02-u5qop.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
let promise = mongoose.connect(uri, {
    useMongoClient: true,
    /* other options */
});

promise.then((db) => {
    console.log(db.model());
});

/*mongoose.connect(uri, (err) => {
  if (err) {
      console.log(err);
  } else {
      console.log('Connected to MongoDb');
  }
});*/

// App startup
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});