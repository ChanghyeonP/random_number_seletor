const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const { insertNumber, getAllNumbers, assignNumberToIp, getNumberByIp, clearDatabase } = require('../database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const getRandomNumber = (usedNumbers) => {
    let number;
    do {
        number = Math.floor(Math.random() * 35) + 1;
    } while (usedNumbers.includes(number));
    return number;
};

app.post('/api/random-number', async (req, res) => {
    const { gender } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!gender || (gender !== 'man' && gender !== 'woman')) {
        return res.status(400).send('Invalid gender');
    }

    try {
        // Check if the IP already has an assigned number
        const existingAssignment = await getNumberByIp(ip);
        if (existingAssignment) {
            return res.json({ number: existingAssignment.number });
        }

        const usedNumbers = await getAllNumbers(gender);
        if (usedNumbers.length >= 35) {
            return res.status(400).send('No numbers left');
        }

        const number = getRandomNumber(usedNumbers);
        await insertNumber(gender, number);
        await assignNumberToIp(ip, gender, number);
        res.json({ number });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 매일 자정에 데이터베이스 초기화 (12:00 AM)
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
