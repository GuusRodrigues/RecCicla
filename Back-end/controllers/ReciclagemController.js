const Reciclagem = require('../models/ReciclagemModel');
const User = require('../models/userModel');

exports.getReciclagem = async (req, res) => {
  try {
    const reciclagens = await Reciclagem.find().populate('user');
    res.json(reciclagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReciclagemById = async (req, res) => {
  try {
    const reciclagem = await Reciclagem.findById(req.params.id).populate('user');
    if (!reciclagem) {
      return res.status(404).json({ message: 'Centro de reciclagem não encontrado' });
    }
    res.json(reciclagem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReciclagem = async (req, res) => {
  try {
    const reciclagem = new Reciclagem(req.body);
    await reciclagem.save();
    res.status(201).json(reciclagem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateReciclagem = async (req, res) => {
  try {
    const reciclagem = await Reciclagem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reciclagem) {
      return res.status(404).json({ message: 'Centro de reciclagem não encontrado' });
    }
    res.json(reciclagem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReciclagem = async (req, res) => {
  try {
    await Reciclagem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Centro de reciclagem deletado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReciclagemByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verifique se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Encontre todas as centros de reciclagem associadas a esse usuário
    const reciclagens = await Reciclagem.find({ user: userId });

    res.status(200).json(reciclagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
