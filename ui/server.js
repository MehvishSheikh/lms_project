const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');

const app = express();
const port = 5002;
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://SigmaMS:Sigma%40123@cluster0.gsa79xn.mongodb.net/';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully!!!')
});

const customerRouter = require('./routes/customers');

app.use('/customers', customerRouter);

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
})