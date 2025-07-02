const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Backend Running'));

app.use('/properties', require('./routes/property.routes.js'));
app.use('/landlords', require('./routes/landlord.routes.js'));
app.use('/units', require('./routes/unit.routes.js'));
app.use('/tenants', require('./routes/tenant.routes.js'));
app.use('/leases', require('./routes/lease.routes.js'));

app.listen(3001, () => console.log('Server running on http://localhost:3001'));