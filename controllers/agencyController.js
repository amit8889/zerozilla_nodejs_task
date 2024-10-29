const Agency = require('../models/Agency');
const Client = require('../models/Client');

// 1. Create an agency and a client
exports.createAgencyAndClient = async (req, res) => {
    const { agencyDetails, clientDetails } = req.body;

    try {
        let  agency = null
        if(agencyDetails?.agencyId){
            agency = await Agency.findOne({_id:agencyDetails.agencyId})
            if(!agency){
                return res.status(404).json({message: 'Agency not found',success:false})
            }
        }else{
            agency = await Agency.create(agencyDetails);
        }
        const client = await Client.create({ ...clientDetails, agencyId: agency._id });
        res.status(201).json({
            message: 'Agency and client created successfully',
            agency,
            client,
            success:true
         });
    } catch (err) {
        res.status(500).json({ message: 'Error creating agency and client', error: err.message,success:false });
    }
};



// 2. Get agency with top clients by total bill
exports.getTopClientByAgency = async (req, res) => {
    try {
        const topClient = await Client.aggregate([
            {
              $sort:{
                  totalBill: -1
                }
            },
            {
              $limit:1
            },
            {
              $project:{
                  agencyId: 1,
                  clientName: "$name",
                  totalBill: 1
                }
            },
            {
              $lookup:{
                  from: "agencies",
                  localField: "agencyId",
                  foreignField: "_id",
                  as: "result"
                }
            },
            {
              $project: {
                agencyId: 1,
                clientName: 1,
                totalBill: 1,
                agencyName: {
                  $arrayElemAt: ["$result.name", 0]
                },
                _id:0
              }
            }
          ]);
        res.json(topClient);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching top client', error: err.message });
    }
};
