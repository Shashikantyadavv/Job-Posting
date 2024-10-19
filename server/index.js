const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const Company = require('./models/Company');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.get('/api/company/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
