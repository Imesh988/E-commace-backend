const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const categoryRouter = require('./router/categoryRouter');
const productRouter = require('./router/productRouter');
const productDiscountRouter = require('./router/productDiscountRouter')
const productImageRouter = require('./router/productImageRouter');


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} `);
});

app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));

app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/product-image', productImageRouter);
app.use('/api/v1/product-discount', productDiscountRouter);