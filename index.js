require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});
