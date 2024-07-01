const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const { clearDatabase } = require('./database');
const randomNumberRoute = require('./random-number');

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// API routes
app.use('/api/random-number', randomNumberRoute);

// Schedule daily database clear at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        await clearDatabase();
        console.log('Database cleared at midnight');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});