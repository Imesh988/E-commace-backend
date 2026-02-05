const express = require('express');
const cors = require('cors');


require('dotenv').config();

const app = express();

const categoryRouter = require('./router/categoryRouter');
const productRouter = require('./router/productRouter');
const productDiscountRouter = require('./router/productDiscountRouter')
const productImageRouter = require('./router/productImageRouter');
const userRouter = require('./router/userRouter');
const roleRouter = require('./router/roleRouter');
const superAdminRouter = require('./router/superAdminRouter');
const sellerRouter = require('./router/sellerRouter');
const supplierRouter = require('./router/supplierRouter');
const grnRouter = require('./router/grnRouter');
const stockRouter = require('./router/stockRouter');
const sellerHasRoleRouter = require('./router/sellerHasRoleRouter');
const authRouter = require('./router/Authroutes');

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
app.use('/api/v1/user', userRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/superAdmin', superAdminRouter);
app.use('/api/v1/seller', sellerRouter);
app.use('/api/v1/supplier', supplierRouter);
app.use('/api/v1/grn', grnRouter);
app.use('/api/v1/stock', stockRouter);
app.use('/api/v1/sellerHasRole', sellerHasRoleRouter);
app.use('/api/v1/auth', authRouter);