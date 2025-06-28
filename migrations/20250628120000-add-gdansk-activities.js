const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Remove all previous activities
    await db.collection('activities').deleteMany({});

    // Read coordinates.json for trash points
    const coordinatesPath = path.join(__dirname, '..', 'coordinates.json');
    const coordinatesRaw = fs.readFileSync(coordinatesPath, 'utf-8');
    const coordinates = JSON.parse(coordinatesRaw);

    // Distribute coordinates into multiple activities (e.g., 50 per activity)
    const chunkSize = 50;
    const users = await db.collection('users').find({}).toArray();
    const now = new Date();
    const activities = [];
    for (let i = 0; i < coordinates.length; i += chunkSize) {
      const chunk = coordinates.slice(i, i + chunkSize);
      const userId = users.length > 0 ? users[i % users.length]._id : new ObjectId();
      
      // Generate path from a subset of trash points (5-10 points)
      const pathSize = Math.min(Math.floor(Math.random() * 6) + 5, chunk.length);
      const shuffledChunk = [...chunk].sort(() => Math.random() - 0.5);
      const pathPoints = shuffledChunk.slice(0, pathSize);
      
      activities.push({
        userId,
        isActive: false,
        startTime: now,
        endTime: now,
        durationTime: 0,
        distance: 0,
        trashCount: chunk.length,
        points: chunk.length * 10,
        activityType: 'walking',
        description: `Trash points import batch ${Math.floor(i / chunkSize) + 1}`,
        name: `Trash Points Import ${Math.floor(i / chunkSize) + 1}`,
        imageUrls: [],
        path: pathPoints.map(({ lat, lon }) => ({ lat: lat.toString(), lon: lon.toString() })),
        trashLocations: chunk.map(({ lat, lon }) => ({ lat: lat.toString(), lon: lon.toString() })),
        createdAt: now,
        updatedAt: now
      });
    }
    await db.collection('activities').insertMany(activities);
    console.log(`Inserted ${activities.length} activities with trash points from coordinates.json`);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // Remove the imported activities
    await db.collection('activities').deleteMany({ name: { $regex: /^Trash Points Import/ } });
    console.log('Removed Trash Points Import activities');
  },
}; 