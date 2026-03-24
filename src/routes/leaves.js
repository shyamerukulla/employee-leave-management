const express = require('express');
const router  = express.Router();
const store   = require('../data/store');

router.get('/', (req, res) => {
  res.json({
    success: true,
    count:   store.leaves.length,
    data:    store.leaves
  });
});

router.get('/employee/:empId', (req, res) => {
  const empLeaves = store.leaves.filter(
    l => l.employeeId === req.params.empId
  );

  res.json({
    success: true,
    count:   empLeaves.length,
    data:    empLeaves
  });
});

router.post('/', (req, res) => {
  const employeeId = req.body.employeeId;
  const days       = req.body.days;
  const reason     = req.body.reason;

  if (!employeeId || !days || !reason) {
    return res.status(400).json({
      success: false,
      message: 'Please provide employeeId, days and reason'
    });
  }

  const employee = store.employees.find(e => e.id === employeeId);

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found'
    });
  }

  if (employee.leaveBalance < days) {
    return res.status(400).json({
      success: false,
      message: 'Not enough leave balance. Available: ' + employee.leaveBalance + ' days'
    });
  }

  const newLeave = {
    id:           String(store.leaves.length + 1),
    employeeId:   employeeId,
    employeeName: employee.name,
    days:         Number(days),
    reason:       reason,
    status:       'pending',
    appliedOn:    new Date().toISOString()
  };

  store.leaves.push(newLeave);

  res.status(201).json({
    success: true,
    message: 'Leave application submitted successfully',
    data:    newLeave
  });
});

router.put('/:id/approve', (req, res) => {
  const leave = store.leaves.find(l => l.id === req.params.id);

  if (!leave) {
    return res.status(404).json({
      success: false,
      message: 'Leave request not found'
    });
  }

  if (leave.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Leave is already ' + leave.status
    });
  }

  const employee = store.employees.find(e => e.id === leave.employeeId);
  employee.leaveBalance = employee.leaveBalance - leave.days;

  leave.status = 'approved';

  res.json({
    success: true,
    message: 'Leave approved successfully',
    data:    leave
  });
});

router.put('/:id/reject', (req, res) => {
  const leave = store.leaves.find(l => l.id === req.params.id);

  if (!leave) {
    return res.status(404).json({
      success: false,
      message: 'Leave request not found'
    });
  }

  if (leave.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Leave is already ' + leave.status
    });
  }

  leave.status = 'rejected';

  res.json({
    success: true,
    message: 'Leave rejected',
    data:    leave
  });
});

module.exports = router;
