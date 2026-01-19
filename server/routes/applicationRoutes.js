const express = require('express');
const Application = require('../models/Application');

const router = express.Router();

//Get All Data
router.get('/', async (req, res) => {
    const applications = await Application.find();
    res.json(applications);
})

//Create Data
router.post('/', async (req, res) => {
    const app = await Application.create(req.body);
    res.json(app);
})

//Update Data
router.put('/:id', async (req, res) => {
    const updated = await Application.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(updated);
})

//Delete Data
router.delete('/:id', async (req, res) => {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
})

module.exports = router;