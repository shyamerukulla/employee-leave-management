const express = require('express');
const router  = express.Router();
const store   = require('../data/store');

router.get('/', (req, res) => {
  res.json({
    success: true,
    count:   store.departments.length,
    data:    store.departments
  });
});

router.post('/', (req, res) => {
  const name    = req.body.name;
  const manager = req.body.manager;

  if (!name || !manager) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both name and manager'
    });
  }

  const newDepartment = {
    id:      String(store.departments.length + 1),
    name:    name,
    manager: manager
  };

  store.departments.push(newDepartment);

  res.status(201).json({
    success: true,
    message: 'Department created successfully',
    data:    newDepartment
  });
});

router.delete('/:id', (req, res) => {
  const index = store.departments.findIndex(d => d.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Department not found'
    });
  }

  store.departments.splice(index, 1);

  res.json({
    success: true,
    message: 'Department deleted successfully'
  });
});

module.exports = router;
