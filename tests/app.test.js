const request = require('supertest');
const app     = require('../src/app');

describe('Health Check', () => {
  test('GET /health should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});

describe('Departments API', () => {
  test('GET /departments should return list of departments', async () => {
    const res = await request(app).get('/departments');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('POST /departments should create a new department', async () => {
    const res = await request(app)
      .post('/departments')
      .send({ name: 'Marketing', manager: 'Sara Khan' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Marketing');
  });

  test('POST /departments should fail without manager', async () => {
    const res = await request(app)
      .post('/departments')
      .send({ name: 'Marketing' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('Employees API', () => {
  test('GET /employees should return list of employees', async () => {
    const res = await request(app).get('/employees');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('GET /employees/1 should return one employee', async () => {
    const res = await request(app).get('/employees/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Rahul Sharma');
  });

  test('POST /employees should create a new employee', async () => {
    const res = await request(app)
      .post('/employees')
      .send({ name: 'Dev Anand', departmentId: '1' });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe('Dev Anand');
    expect(res.body.data.leaveBalance).toBe(20);
  });

  test('POST /employees should fail with invalid department', async () => {
    const res = await request(app)
      .post('/employees')
      .send({ name: 'Dev Anand', departmentId: '999' });
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('Leave Management API', () => {
  test('POST /leaves should submit a leave application', async () => {
    const res = await request(app)
      .post('/leaves')
      .send({ employeeId: '1', days: 3, reason: 'Medical leave' });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.status).toBe('pending');
    expect(res.body.data.employeeName).toBe('Rahul Sharma');
  });

  test('POST /leaves should fail without reason', async () => {
    const res = await request(app)
      .post('/leaves')
      .send({ employeeId: '1', days: 3 });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('GET /leaves should return all leave requests', async () => {
    const res = await request(app).get('/leaves');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('PUT /leaves/1/approve should approve a leave', async () => {
    const res = await request(app).put('/leaves/1/approve');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.status).toBe('approved');
  });
});

describe('Unknown Routes', () => {
  test('GET /random should return 404', async () => {
    const res = await request(app).get('/random');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
