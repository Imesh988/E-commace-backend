const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const userRouter = require('./router/userRouter');
const roleRouter = require('./router/roleRouter');

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/role', roleRouter);