const Contact = require('../models/ContactModel');
const User = require('../models/userModel');

// Obter todas as mensagens de contato
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate('user');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter uma mensagem de contato específica pelo ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).populate('user');
    if (!contact) {
      return res.status(404).json({ message: 'Mensagem de contato não encontrada' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar uma nova mensagem de contato
exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar uma mensagem de contato pelo ID
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
      return res.status(404).json({ message: 'Mensagem de contato não encontrada' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar uma mensagem de contato pelo ID
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mensagem de contato deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todas as mensagens de contato de um usuário específico
exports.getContactsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verificar se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Encontre todas as mensagens de contato associadas a esse usuário
    const contacts = await Contact.find({ user: userId });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
