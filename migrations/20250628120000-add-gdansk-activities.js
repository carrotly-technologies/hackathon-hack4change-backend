const { ObjectId } = require('mongodb');

// Gdańsk, Poland coordinates boundaries
const GDANSK_BOUNDS = {
  minLat: 54.25,
  maxLat: 54.45,
  minLon: 18.45,
  maxLon: 18.75
};

// Generate random coordinates within Gdańsk
function getRandomGdanskCoordinate() {
  const lat = (Math.random() * (GDANSK_BOUNDS.maxLat - GDANSK_BOUNDS.minLat) + GDANSK_BOUNDS.minLat).toFixed(6);
  const lon = (Math.random() * (GDANSK_BOUNDS.maxLon - GDANSK_BOUNDS.minLon) + GDANSK_BOUNDS.minLon).toFixed(6);
  return { lat, lon };
}

// Generate a path with multiple points
function generatePath(pointCount = 10) {
  const path = [];
  for (let i = 0; i < pointCount; i++) {
    path.push(getRandomGdanskCoordinate());
  }
  return path;
}

// Generate trash locations
function generateTrashLocations(count = 15) {
  const trashLocations = [];
  for (let i = 0; i < count; i++) {
    trashLocations.push(getRandomGdanskCoordinate());
  }
  return trashLocations;
}

// Generate ObjectIds for users
const userIds = [
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId()
];

// Activity types
const ACTIVITY_TYPES = ['trekking', 'walking', 'running', 'biking', 'other'];

// Generate many activities
const ACTIVITIES = [];

// Generate 50 activities with varying characteristics
for (let i = 1; i <= 50; i++) {
  const isActive = Math.random() > 0.8; // 20% chance of being active
  const startTime = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random time in last 30 days
  const endTime = isActive ? null : new Date(startTime.getTime() + Math.random() * 4 * 60 * 60 * 1000); // 0-4 hours duration
  const durationTime = isActive ? 0 : Math.floor((endTime - startTime) / 1000 / 60); // Duration in minutes
  const distance = Math.random() * 15 + 0.5; // 0.5-15.5 km
  const trashCount = Math.floor(Math.random() * 25) + 5; // 5-30 pieces of trash
  const points = trashCount * 10 + Math.floor(distance * 100); // Points based on trash and distance
  const activityType = ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];
  
  const path = generatePath(Math.floor(Math.random() * 15) + 5); // 5-20 path points
  const trashLocations = generateTrashLocations(trashCount); // Trash locations matching trash count

  ACTIVITIES.push({
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    isActive,
    startTime: isActive ? startTime : startTime,
    endTime: isActive ? null : endTime,
    durationTime,
    distance: Math.round(distance * 100) / 100,
    trashCount,
    points,
    activityType,
    description: `Activity ${i} - ${activityType} in Gdańsk with ${trashCount} pieces of trash collected`,
    name: `Gdańsk ${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Activity ${i}`,
    imageUrls: [`https://picsum.photos/400/300?random=${i}`],
    path,
    trashLocations,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Insert new activities
    await db.collection("activities").insertMany(ACTIVITIES);
    
    // Update existing events to Gdańsk coordinates
    const gdanskEventCoordinates = [
      { lat: "54.3520", lon: "18.6466" }, // Gdańsk Old Town
      { lat: "54.3610", lon: "18.6490" }, // Gdańsk Main Town
      { lat: "54.3470", lon: "18.6450" }, // Gdańsk Lower Town
      { lat: "54.3560", lon: "18.6580" }, // Gdańsk Wrzeszcz
      { lat: "54.3420", lon: "18.6320" }, // Gdańsk Oliwa
      { lat: "54.3680", lon: "18.6400" }, // Gdańsk Przymorze
      { lat: "54.3350", lon: "18.6500" }, // Gdańsk Sopot area
      { lat: "54.3500", lon: "18.6700" }, // Gdańsk Zaspa
      { lat: "54.3600", lon: "18.6300" }, // Gdańsk Nowy Port
      { lat: "54.3400", lon: "18.6600" }  // Gdańsk Stogi
    ];

    // Update events with Gdańsk coordinates
    const events = await db.collection("events").find({}).toArray();
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const gdanskCoord = gdanskEventCoordinates[i % gdanskEventCoordinates.length];
      
      await db.collection("events").updateOne(
        { _id: event._id },
        { 
          $set: { 
            localization: [parseFloat(gdanskCoord.lon), parseFloat(gdanskCoord.lat)],
            updatedAt: new Date()
          } 
        }
      );
    }

    // Update existing activities (if any) to Gdańsk coordinates
    const existingActivities = await db.collection("activities").find({}).toArray();
    for (const activity of existingActivities) {
      if (activity.path && activity.path.length > 0) {
        const newPath = activity.path.map(() => getRandomGdanskCoordinate());
        const newTrashLocations = activity.trashLocations ? 
          activity.trashLocations.map(() => getRandomGdanskCoordinate()) : [];
        
        await db.collection("activities").updateOne(
          { _id: activity._id },
          { 
            $set: { 
              path: newPath,
              trashLocations: newTrashLocations,
              updatedAt: new Date()
            } 
          }
        );
      }
    }

    console.log(`Added ${ACTIVITIES.length} new activities with Gdańsk coordinates`);
    console.log(`Updated existing events and activities to Gdańsk coordinates`);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // Remove the activities we added (by description pattern)
    await db.collection("activities").deleteMany({
      description: { $regex: /Activity \d+ - .* in Gdańsk/ }
    });

    // Note: We don't revert the coordinate changes as we don't have the original coordinates
    console.log("Removed Gdańsk activities");
  },
}; 