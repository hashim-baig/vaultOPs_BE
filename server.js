const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logger = require('./config/logger');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const auth = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error('MongoDB error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/protected/test', auth, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}` });
});


app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
