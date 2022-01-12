const express = require('express');

const app = express();
const port = 5000;
const connectDb = require('./db/connect');
const cors = require('cors');

require('dotenv').config();


const router = require('./routes/crud');

// app.use((req, res, next) =>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control=Allow-Origin', '*')

//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({})
//     }
//     next();
// });

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/api/v1/crud', router);

const start = async () => {
    await connectDb(process.env.MONGO_CONNECT);
    app.listen(port, (req, res) => {
        console.log('port:',port);
    })
}
start();