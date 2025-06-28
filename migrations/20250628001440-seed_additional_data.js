const { ObjectId } = require('mongodb');

// Generate ObjectIds for additional data
const additionalActivityIds = [
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId()
];

const additionalExampleIds = [
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId()
];

const ADDITIONAL_ACTIVITIES = [
  {
    _id: additionalActivityIds[0],
    userId: new ObjectId(), // This will be linked to an existing user
    isActive: true,
    startTime: new Date("2025-06-25T14:00:00Z"),
    endTime: null, // Active activity has no end time yet
    durationTime: 1800, // 30 minutes so far
    distance: 3.5,
    trashCount: 6,
    points: 45,
    activityType: "walking",
    description: "Currently active walking session with trash collection",
    name: "Active Cleanup Walk",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7135", lon: "-74.0065" },
      { lat: "40.7140", lon: "-74.0070" }
    ],
    trashLocations: [
      { lat: "40.7130", lon: "-74.0062" },
      { lat: "40.7135", lon: "-74.0065" },
      { lat: "40.7140", lon: "-74.0070" }
    ]
  },
  {
    _id: additionalActivityIds[1],
    userId: new ObjectId(), // This will be linked to an existing user
    isActive: true,
    startTime: new Date("2025-06-25T16:00:00Z"),
    endTime: null, // Active activity has no end time yet
    durationTime: 900, // 15 minutes so far
    distance: 2.1,
    trashCount: 3,
    points: 25,
    activityType: "running",
    description: "Currently active running session",
    name: "Active Eco Run",
    imageUrls: [
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7135", lon: "-74.0068" }
    ],
    trashLocations: [
      { lat: "40.7130", lon: "-74.0062" },
      { lat: "40.7135", lon: "-74.0068" }
    ]
  },
  {
    _id: additionalActivityIds[2],
    userId: new ObjectId(), // This will be linked to an existing user
    isActive: false,
    startTime: new Date("2025-06-24T12:00:00Z"),
    endTime: new Date("2025-06-24T13:30:00Z"),
    durationTime: 5400, // 1.5 hours
    distance: 9.8,
    trashCount: 0,
    points: 85,
    activityType: "biking",
    description: "Long bike ride for transport and exercise",
    name: "Weekend Bike Tour",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7200", lon: "-74.0150" },
      { lat: "40.7250", lon: "-74.0200" },
      { lat: "40.7300", lon: "-74.0250" }
    ],
    trashLocations: []
  },
  {
    _id: additionalActivityIds[3],
    userId: new ObjectId(), // This will be linked to an existing user
    isActive: false,
    startTime: new Date("2025-06-23T10:00:00Z"),
    endTime: new Date("2025-06-23T11:00:00Z"),
    durationTime: 3600, // 1 hour
    distance: 0, // Indoor activity
    trashCount: 0,
    points: 30,
    activityType: "other",
    description: "Indoor eco-friendly workshop and education session",
    name: "Eco Workshop",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64"
    ],
    path: [],
    trashLocations: []
  }
];

const ADDITIONAL_EXAMPLES = [
  {
    _id: additionalExampleIds[0],
    name: "Compost Bin",
    color: "orange"
  },
  {
    _id: additionalExampleIds[1],
    name: "Rainwater Collector",
    color: "purple"
  },
  {
    _id: additionalExampleIds[2],
    name: "Bamboo Products",
    color: "pink"
  },
  {
    _id: additionalExampleIds[3],
    name: "Organic Cotton",
    color: "brown"
  },
  {
    _id: additionalExampleIds[4],
    name: "Carbon Offset",
    color: "black"
  }
];

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Get existing users to link activities to
    const existingUsers = await db.collection('users').find({}).toArray();
    
    if (existingUsers.length > 0) {
      // Update activities with real user IDs
      const updatedActivities = ADDITIONAL_ACTIVITIES.map((activity, index) => ({
        ...activity,
        userId: existingUsers[index % existingUsers.length]._id,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await db.collection('activities').insertMany(updatedActivities);
    }

    // Insert additional examples
    await db.collection('examples').insertMany(ADDITIONAL_EXAMPLES.map(example => ({
      ...example,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection('activities').deleteMany({
      _id: { $in: additionalActivityIds }
    });
    
    await db.collection('examples').deleteMany({
      _id: { $in: additionalExampleIds }
    });
  }
}; 