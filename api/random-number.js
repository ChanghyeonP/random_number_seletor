const { getNextNumber, insertNumber, getAllNumbers, assignNumberToIp, getNumberByIp } = require('./database');

module.exports = async (req, res) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }

        const { gender, uuid } = req.body;

        if (!gender || (gender !== 'man' && gender !== 'woman')) {
            return res.status(400).send('Invalid gender');
        }

        if (!uuid) {
            return res.status(400).send('UUID is required');
        }

        const existingAssignment = await getNumberByIp(uuid);
        if (existingAssignment) {
            return res.json({ number: existingAssignment.number });
        }

        const usedNumbers = await getAllNumbers(gender);
        if (usedNumbers.length >= 35) {
            return res.status(400).send('No numbers left');
        }

        const number = await getNextNumber(gender);
        await insertNumber(gender, number);
        await assignNumberToIp(uuid, gender, number);
        res.json({ number });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send(error.message);
    }
};
