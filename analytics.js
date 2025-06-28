const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

router.get('/passengers', async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('ehailingDB');
    const users = db.collection('users');

    const results = await users.aggregate([
      {
        $lookup: {
          from: "rides",
          localField: "_id",
          foreignField: "userId",
          as: "rideData"
        }
      },
      { $unwind: "$rideData" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          totalRides: { $sum: 1 },
          totalFare: { $sum: "$rideData.fare" },
          avgDistance: { $avg: "$rideData.distance" }
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          totalRides: 1,
          totalFare: 1,
          avgDistance: { $round: ["$avgDistance", 2] }
        }
      }
    ]).toArray();

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  } finally {
    await client.close();
  }
});

module.exports = router;