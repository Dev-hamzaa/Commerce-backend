import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('Commerce-Backend v=>1.0 ');
});


app.listen(port, () => {
    console.log('Server is running on port 3000');
});

