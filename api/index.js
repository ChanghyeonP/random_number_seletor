const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const { clearDatabase } = require('./database');
const randomNumberRoute = require('./api/random-number'); // random-number.js 파일 경로

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 라우트 설정
app.use('/api/random-number', randomNumberRoute);

// 매일 자정에 데이터베이스 초기화 (12:00 AM UTC)
cron.schedule('0 0 * * *', async () => {
    try {
        await clearDatabase();
        console.log('Database cleared at midnight');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
});

// 서버 포트 설정 (환경 변수 PORT가 있으면 해당 값을 사용하고, 없으면 3000번 포트 사용)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
