const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const applicationRoutes = require('./routes/applicationRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => {
    res.send("API is running");
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB is connected!'))
    .catch(err => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));