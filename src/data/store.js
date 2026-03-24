const store = {

  departments: [
    { id: '1', name: 'Engineering',     manager: 'Amit Shah'   },
    { id: '2', name: 'Human Resources', manager: 'Priya Nair'  },
    { id: '3', name: 'Finance',         manager: 'Rohit Verma' }
  ],

  employees: [
    { id: '1', name: 'Rahul Sharma', departmentId: '1', leaveBalance: 18 },
    { id: '2', name: 'Sneha Patil',  departmentId: '2', leaveBalance: 15 },
    { id: '3', name: 'Karan Mehta',  departmentId: '1', leaveBalance: 20 }
  ],

  leaves: []

};

module.exports = store;
