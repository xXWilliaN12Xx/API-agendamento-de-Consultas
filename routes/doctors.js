const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Criar um novo médico
router.post('/', async (req, res) => {
  const { name, specialty, availableHours } = req.body;

  try {
    const doctor = new Doctor({ name, specialty, availableHours }); 
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obter todos os médicos
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obter um médico por ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Médico não encontrado' });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar um médico
router.put('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ message: 'Médico não encontrado' });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Excluir um médico
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Médico não encontrado' });
    res.status(200).json({ message: 'Médico excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
