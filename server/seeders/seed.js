const mongoose = require('mongoose');
const Application = require('../models/Application');
require('dotenv').config();

const sampleData = [
    {
        company: 'Google',
        position: 'Software Engineer',
        status: 'Interview',
        appliedDate: '2025-01-10',
        notes: 'Phone screen scheduled for next week'
    },
    {
        company: 'Microsoft',
        position: 'Frontend Developer',
        status: 'Applied',
        appliedDate: '2025-01-15',
        notes: 'Applied through LinkedIn'
    },
    {
        company: 'Amazon',
        position: 'Full Stack Developer',
        status: 'Rejected',
        appliedDate: '2025-01-05',
        notes: 'Not moving forward at this time'
    },
    {
        company: 'Meta',
        position: 'Backend Engineer',
        status: 'Offer',
        appliedDate: '2024-12-20',
        notes: 'Received offer! Salary: $150k'
    },
    {
        company: 'Netflix',
        position: 'DevOps Engineer',
        status: 'Applied',
        appliedDate: '2025-01-18',
        notes: 'Referral from former colleague'
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected!');
        
        // Clear existing data
        await Application.deleteMany({});
        console.log('Cleared existing data');
        
        // Insert sample data
        await Application.insertMany(sampleData);
        console.log('Sample data inserted!');
        
        mongoose.connection.close();
    })
    .catch(err => {
        console.log('Error:', err);
        process.exit(1);
    });