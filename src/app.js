const express          = require('express');
const app              = express();

const departmentRoutes = require('./routes/departments');
const employeeRoutes   = require('./routes/employees');
const leaveRoutes      = require('./routes/leaves');

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status:  'healthy',
    app:     'Employee Leave Management System',
    version: '1.0.0',
    time:    new Date().toISOString()
  });
});

app.use('/departments', departmentRoutes);
app.use('/employees',   employeeRoutes);
app.use('/leaves',      leaveRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route ' + req.method + ' ' + req.url + ' not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Employee Leave Management System running on port ' + PORT);
});

module.exports = app;
