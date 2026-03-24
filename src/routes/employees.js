const express = require('express');
const router  = express.Router();
const store   = require('../data/store');

router.get('/', (req, res) => {
  res.json({
    success: true,
    count:   store.employees.length,
    data:    store.employees
  });
});

router.get('/:id', (req, res) => {
  const employee = store.employees.find(e => e.id === req.params.id);

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found'
    });
  }

  res.json({
    success: true,
    data:    employee
  });
});

router.post('/', (req, res) => {
  const name         = req.body.name;
  const departmentId = req.body.departmentId;

  if (!name || !departmentId) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both name and departmentId'
    });
  }

  const department = store.departments.find(d => d.id === departmentId);

  if (!department) {
    return res.status(404).json({
      success: false,
      message: 'Department not found — please use a valid departmentId'
    });
  }

  const newEmployee = {
    id:           String(store.employees.length + 1),
    name:         name,
    departmentId: departmentId,
    leaveBalance: 20
  };

  store.employees.push(newEmployee);

  res.status(201).json({
    success: true,
    message: 'Employee created successfully',
    data:    newEmployee
  });
});

router.delete('/:id', (req, res) => {
  const index = store.employees.findIndex(e => e.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found'
    });
  }

  store.employees.splice(index, 1);

  res.json({
    success: true,
    message: 'Employee deleted successfully'
  });
});

module.exports = router;
