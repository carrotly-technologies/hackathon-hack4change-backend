const { ObjectId } = require('mongodb');

// Generate ObjectIds for relations
const userIds = [
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId()
];

const awardIds = [
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

const challengeIds = [
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

const activityIds = [
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

const exampleIds = [
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId()
];

const USERS = [
  {
    _id: userIds[0],
    email: "john.doe@example.com",
    firstname: "John",
    lastname: "Doe",
    avatarUrl: "https://picsum.photos/64/64",
    awardIds: [awardIds[0], awardIds[2], awardIds[4]],
    challengeIds: [challengeIds[0], challengeIds[3], challengeIds[7]]
  },
  {
    _id: userIds[1],
    email: "jane.smith@example.com",
    firstname: "Jane",
    lastname: "Smith",
    avatarUrl: "https://picsum.photos/64/64",
    awardIds: [awardIds[1], awardIds[3], awardIds[5]],
    challengeIds: [challengeIds[1], challengeIds[4], challengeIds[8]]
  },
  {
    _id: userIds[2],
    email: "mike.johnson@example.com",
    firstname: "Mike",
    lastname: "Johnson",
    avatarUrl: "https://picsum.photos/64/64",
    awardIds: [awardIds[2], awardIds[6], awardIds[8]],
    challengeIds: [challengeIds[2], challengeIds[5], challengeIds[9]]
  },
  {
    _id: userIds[3],
    email: "sarah.wilson@example.com",
    firstname: "Sarah",
    lastname: "Wilson",
    avatarUrl: "https://picsum.photos/64/64",
    awardIds: [awardIds[3], awardIds[7], awardIds[9]],
    challengeIds: [challengeIds[0], challengeIds[6]]
  },
  {
    _id: userIds[4],
    email: "david.brown@example.com",
    firstname: "David",
    lastname: "Brown",
    avatarUrl: "https://picsum.photos/64/64",
    awardIds: [awardIds[0], awardIds[4], awardIds[8]],
    challengeIds: [challengeIds[1], challengeIds[7], challengeIds[9]]
  }
];

const AWARDS = [
  {
    _id: awardIds[0],
    title: "Green Starter",
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: awardIds[1],
    title: "Trash Hero",
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: awardIds[2],
    title: "Public Transport Pro",
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: awardIds[3],
    title: "Eco Streak",
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: awardIds[4],
    title: "Tree Hugger",
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: awardIds[5],
    title: "Car-Free Champion",
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: awardIds[6],
    title: "Recycling Rookie",
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: awardIds[7],
    title: "Planet Protector",
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: awardIds[8],
    title: "Solar Powered",
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: awardIds[9],
    title: "Eco Influencer",
    iconUrl: "https://picsum.photos/64/64"
  }
];

const CHALLENGES = [
  {
    _id: challengeIds[0],
    topic: "Trash Collector",
    description: "Collect and properly dispose of 10 pieces of litter.",
    points: 50,
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: challengeIds[1],
    topic: "Car-Free Day",
    description: "Use only public transport, bike or walk for a full day.",
    points: 40,
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: challengeIds[2],
    topic: "Recycling Mission",
    description: "Recycle 5 different types of materials today.",
    points: 30,
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: challengeIds[3],
    topic: "Green Commute Week",
    description: "Use sustainable transport for 5 days in a row.",
    points: 100,
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: challengeIds[4],
    topic: "Tree Planting",
    description: "Plant a tree or participate in a tree planting event.",
    points: 120,
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: challengeIds[5],
    topic: "Eco Rivalry",
    description: "Beat your friend in total eco-points this week.",
    points: 60,
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: challengeIds[6],
    topic: "Zero-Waste Day",
    description: "Produce no waste in a single day. No plastic, no trash!",
    points: 80,
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: challengeIds[7],
    topic: "Local Food Lover",
    description: "Eat only locally produced food for a day.",
    points: 40,
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: challengeIds[8],
    topic: "Community Clean-Up",
    description: "Join or organize a clean-up event in your neighborhood.",
    points: 90,
    iconUrl: "https://picsum.photos/64/64"
  },
  {
    _id: challengeIds[9],
    topic: "Eco Streak Master",
    description: "Complete a challenge every day for 7 days straight.",
    points: 150,
    iconUrl: "https://picsum.photos/64/64"
  }
];

const ACTIVITIES = [
  {
    _id: activityIds[0],
    userId: userIds[0],
    durationTime: 3600, // 1 hour in seconds
    distance: 5.2, // km
    trashCount: 12,
    points: 85,
    activityType: "trekking",
    description: "Morning trek through the local park, collected various types of litter",
    name: "Park Cleanup Trek",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7130", lon: "-74.0062" },
      { lat: "40.7132", lon: "-74.0064" }
    ],
    trashLocations: [
      { lat: "40.7130", lon: "-74.0062" },
      { lat: "40.7131", lon: "-74.0063" },
      { lat: "40.7132", lon: "-74.0064" }
    ]
  },
  {
    _id: activityIds[1],
    userId: userIds[1],
    durationTime: 1800, // 30 minutes
    distance: 2.1,
    trashCount: 5,
    points: 45,
    activityType: "walking",
    description: "Quick walk around the neighborhood, found some plastic bottles",
    name: "Neighborhood Walk",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7135", lon: "-74.0065" }
    ],
    trashLocations: [
      { lat: "40.7130", lon: "-74.0062" },
      { lat: "40.7135", lon: "-74.0065" }
    ]
  },
  {
    _id: activityIds[2],
    userId: userIds[2],
    durationTime: 2700, // 45 minutes
    distance: 8.5,
    trashCount: 0,
    points: 65,
    activityType: "biking",
    description: "Bike ride to work, zero emissions transport",
    name: "Eco Commute",
    imageUrls: [
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7150", lon: "-74.0080" },
      { lat: "40.7180", lon: "-74.0100" }
    ],
    trashLocations: []
  },
  {
    _id: activityIds[3],
    userId: userIds[3],
    durationTime: 1200, // 20 minutes
    distance: 3.2,
    trashCount: 8,
    points: 55,
    activityType: "running",
    description: "Morning run with trash collection",
    name: "Trash Run",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7140", lon: "-74.0070" }
    ],
    trashLocations: [
      { lat: "40.7130", lon: "-74.0062" },
      { lat: "40.7135", lon: "-74.0065" },
      { lat: "40.7140", lon: "-74.0070" }
    ]
  },
  {
    _id: activityIds[4],
    userId: userIds[4],
    durationTime: 5400, // 1.5 hours
    distance: 12.3,
    trashCount: 15,
    points: 120,
    activityType: "trekking",
    description: "Long trek through the forest, major cleanup operation",
    name: "Forest Cleanup",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7200", lon: "-74.0150" },
      { lat: "40.7250", lon: "-74.0200" }
    ],
    trashLocations: [
      { lat: "40.7150", lon: "-74.0080" },
      { lat: "40.7180", lon: "-74.0120" },
      { lat: "40.7200", lon: "-74.0150" },
      { lat: "40.7220", lon: "-74.0170" },
      { lat: "40.7250", lon: "-74.0200" }
    ]
  },
  {
    _id: activityIds[5],
    userId: userIds[0],
    durationTime: 900, // 15 minutes
    distance: 1.8,
    trashCount: 3,
    points: 35,
    activityType: "walking",
    description: "Short walk to the store, picked up some litter",
    name: "Store Walk",
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
    _id: activityIds[6],
    userId: userIds[1],
    durationTime: 3600, // 1 hour
    distance: 15.7,
    trashCount: 0,
    points: 75,
    activityType: "biking",
    description: "Long bike ride for exercise and transport",
    name: "Weekend Bike Ride",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7200", lon: "-74.0200" },
      { lat: "40.7300", lon: "-74.0300" }
    ],
    trashLocations: []
  },
  {
    _id: activityIds[7],
    userId: userIds[2],
    durationTime: 2400, // 40 minutes
    distance: 6.8,
    trashCount: 10,
    points: 70,
    activityType: "running",
    description: "Evening run with trash collection",
    name: "Evening Cleanup Run",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7160", lon: "-74.0090" }
    ],
    trashLocations: [
      { lat: "40.7130", lon: "-74.0062" },
      { lat: "40.7140", lon: "-74.0070" },
      { lat: "40.7150", lon: "-74.0080" },
      { lat: "40.7160", lon: "-74.0090" }
    ]
  },
  {
    _id: activityIds[8],
    userId: userIds[3],
    durationTime: 1800, // 30 minutes
    distance: 4.2,
    trashCount: 7,
    points: 50,
    activityType: "walking",
    description: "Dog walk with trash collection",
    name: "Dog Walk Cleanup",
    imageUrls: [
      "https://picsum.photos/64/64"
    ],
    path: [
      { lat: "40.7128", lon: "-74.0060" },
      { lat: "40.7145", lon: "-74.0075" }
    ],
    trashLocations: [
      { lat: "40.7130", lon: "-74.0062" },
      { lat: "40.7135", lon: "-74.0065" },
      { lat: "40.7140", lon: "-74.0070" },
      { lat: "40.7145", lon: "-74.0075" }
    ]
  },
  {
    _id: activityIds[9],
    userId: userIds[4],
    durationTime: 7200, // 2 hours
    distance: 18.5,
    trashCount: 20,
    points: 140,
    activityType: "trekking",
    description: "Major cleanup trek through the city park",
    name: "City Park Cleanup",
    imageUrls: [
      "https://picsum.photos/64/64",
      "https://picsum.photos/64/64",
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
    trashLocations: [
      { lat: "40.7150", lon: "-74.0080" },
      { lat: "40.7180", lon: "-74.0120" },
      { lat: "40.7200", lon: "-74.0150" },
      { lat: "40.7220", lon: "-74.0170" },
      { lat: "40.7250", lon: "-74.0200" },
      { lat: "40.7270", lon: "-74.0220" },
      { lat: "40.7300", lon: "-74.0250" }
    ]
  }
];

const EXAMPLES = [
  {
    _id: exampleIds[0],
    name: "Eco-Friendly Product",
    color: "green"
  },
  {
    _id: exampleIds[1],
    name: "Recycled Material",
    color: "blue"
  },
  {
    _id: exampleIds[2],
    name: "Solar Panel",
    color: "yellow"
  },
  {
    _id: exampleIds[3],
    name: "Electric Vehicle",
    color: "red"
  },
  {
    _id: exampleIds[4],
    name: "Wind Turbine",
    color: "white"
  }
];

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Insert all collections with proper timestamps
    await db.collection('users').insertMany(USERS.map(user => ({ 
      ...user, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    })));
    
    await db.collection('awards').insertMany(AWARDS.map(award => ({ 
      ...award, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    })));
    
    await db.collection('challenges').insertMany(CHALLENGES.map(challenge => ({ 
      ...challenge, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    })));
    
    await db.collection('activities').insertMany(ACTIVITIES.map(activity => ({ 
      ...activity, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    })));
    
    await db.collection('examples').insertMany(EXAMPLES.map(example => ({ 
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
    await db.collection('users').deleteMany({});
    await db.collection('awards').deleteMany({});
    await db.collection('challenges').deleteMany({});
    await db.collection('activities').deleteMany({});
    await db.collection('examples').deleteMany({});
  }
};
