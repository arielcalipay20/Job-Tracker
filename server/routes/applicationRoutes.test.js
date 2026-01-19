const request = require('supertest');
const express = require('express');
const Application = require('../models/Application');
const applicationRoutes = require('./applicationRoutes');

// Mock the database model
jest.mock('../models/Application');

const app = express();
app.use(express.json());
app.use('/api/applications', applicationRoutes);

describe('Application Routes Unit Tests', () => {
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('GET / should return all applications', async () => {
    //Set up fake data
    const mockApps = [
      { _id: '1', company: 'Google', position: 'Engineer' },
      { _id: '2', company: 'Meta', position: 'Developer' }
    ];
    Application.find.mockResolvedValue(mockApps);

    //Make request
    const response = await request(app).get('/api/applications');

    //Check results
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockApps);
    expect(Application.find).toHaveBeenCalledTimes(1);
  });

  test('POST / should create a new application', async () => {
    const newApp = {
      company: 'Amazon',
      position: 'SDE',
      status: 'Applied',
      appliedDate: '2025-01-19'
    };
    
    Application.create.mockResolvedValue({ _id: '3', ...newApp });

    const response = await request(app)
      .post('/api/applications')
      .send(newApp);

    expect(response.status).toBe(200);
    expect(response.body.company).toBe('Amazon');
    expect(Application.create).toHaveBeenCalledWith(newApp);
  });

  test('DELETE /:id should delete an application', async () => {
    Application.findByIdAndDelete.mockResolvedValue({ _id: '1' });

    const response = await request(app)
      .delete('/api/applications/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Deleted');
    expect(Application.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});