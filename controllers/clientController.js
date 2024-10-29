const Client = require('../models/Client');

// 1. Update a client
exports.updateClient = async (req, res) => {
    const {clientId, ...updatedData } = req.body;

    try {
        const client = await Client.findByIdAndUpdate({_id:clientId}, updatedData, { new: true });
        if (!client) return res.status(404).json({ success:false,message: 'Client not found' });
        res.status(201).json({
            success: true,
            message: 'Client updated successfully',
            client
        });
    } catch (err) {
        res.status(500).json({ success:false,message: 'Error updating client', error: err.message });
    }
};