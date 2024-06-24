const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
const { insertNumber, getAllNumbers, clearDatabase } = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const getRandomNumber = (usedNumbers) => {
    let number;
    do {
        number = Math.floor(Math.random() * 35) + 1;
    } while (usedNumbers.includes(number));
    return number;
};

app.post('/random-number', async (req, res) => {
    const { gender } = req.body;
    if (!gender || (gender !== 'man' && gender !== 'woman')) {
        return res.status(400).send('Invalid gender');
    }

    try {
        const usedNumbers = await getAllNumbers(gender);
        if (usedNumbers.length >= 35) {
            return res.status(400).send('No numbers left');
        }

        const number = getRandomNumber(usedNumbers);
        await insertNumber(gender, number);
        res.json({ number });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 매일 12시에 데이터베이스 초기화
cron.schedule('0 0 * * *', async () => {
    try {
        await clearDatabase();
        console.log('Database cleared at midnight');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
