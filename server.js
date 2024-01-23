import express from 'express';
import startApply from './controller.careerjet.js';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/careerjet', startApply);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});