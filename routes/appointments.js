const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Criar uma nova consulta
router.post('/', async (req, res) => {
  const { doctor, patientName, date, description } = req.body;

  try {
    // Verifica se o médico existe
    const existingDoctor = await Doctor.findById(doctor);
    if (!existingDoctor) return res.status(404).json({ message: 'Médico não encontrado' });

    const appointment = new Appointment({ doctor, patientName, date, description });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obter todas as consultas
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctor', 'name specialization');
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obter uma consulta por ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('doctor', 'name specialization');
    if (!appointment) return res.status(404).json({ message: 'Consulta não encontrada' });
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar uma consulta
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ message: 'Consulta não encontrada' });
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Excluir uma consulta
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Consulta não encontrada' });
    res.status(200).json({ message: 'Consulta excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
