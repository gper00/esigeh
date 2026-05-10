const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const shelterRoutes = require('./routes/shelterRoutes');
const mapRoutes = require('./routes/mapRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/shelters', shelterRoutes);
app.use('/api/map', mapRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ESIGEH API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
