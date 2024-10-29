const Agency = require('../models/Agency');
const Client = require('../models/Client');

// 1. Create an agency and a client
exports.createAgencyAndClient = async (req, res) => {
    const { name, address1, address2, state, city, phoneNumber, clientData } = req.body;

    try {
        const agency = new Agency({ name, address1, address2, state, city, phoneNumber });
        await agency.save();

        const client = new Client({ ...clientData, agencyId: agency._id });
        await client.save();

        res.status(201).json({ agency, client });
    } catch (err) {
        res.status(500).json({ message: 'Error creating agency and client', error: err.message });
    }
};



// 2. Get agency with top clients by total bill
exports.getTopClientByAgency = async (req, res) => {
    try {
        const topClient = await Client.aggregate([
            { $group: { _id: "$agencyId", maxBill: { $max: "$totalBill" } } },
            { $lookup: { from: "agencies", localField: "_id", foreignField: "_id", as: "agency" } },
            { $unwind: "$agency" },
            { $sort: { maxBill: -1 } },
            { $limit: 1 },
            { $project: { AgencyName: "$agency.name", ClientName: "$name", TotalBill: "$maxBill" } }
        ]);
        res.json(topClient);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching top client', error: err.message });
    }
};
