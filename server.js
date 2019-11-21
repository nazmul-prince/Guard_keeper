const express = require('express');
const v1Routes = require('./v1/root');
const connectDB = require('./config/db');

connectDB();

const app = express();

// Init middleware
app.use(express.json({ extended: false }));


const PORT = process.env.PORT || 5000;

app.use('/api/v1', v1Routes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));