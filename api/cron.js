const { clearDatabase } = require('./database');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await clearDatabase();
        res.status(200).json({ message: 'Database cleared' });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Error clearing database', error });
    }
};
