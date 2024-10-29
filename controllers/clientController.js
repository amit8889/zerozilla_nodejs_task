const Client = require('../models/Client');

// 1. Update a client
exports.updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNumber, totalBill } = req.body;

    try {
        const client = await Client.findByIdAndUpdate(id, { name, email, phoneNumber, totalBill }, { new: true });
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: 'Error updating client', error: err.message });
    }
};