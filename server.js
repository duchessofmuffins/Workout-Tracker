const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/workout';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`)
});