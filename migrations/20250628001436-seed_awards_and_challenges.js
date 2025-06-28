const AWARDS = [
  {
    "title": "Green Starter",
    "iconUrl": "https://picsum.photos/64/64",
  },
  {
    "title": "Trash Hero",
    "iconUrl": "https://picsum.photos/64/64",
  },
  {
    "title": "Public Transport Pro",
    "iconUrl": "https://picsum.photos/64/64",
  },
  {
    "title": "Eco Streak",
    "iconUrl": "https://picsum.photos/64/64",
  },
  {
    "title": "Tree Hugger",
    "iconUrl": "https://picsum.photos/64/64",
  },
  {
    "title": "Car-Free Champion",
    "iconUrl": "https://picsum.photos/64/64",
  },
  {
    "title": "Recycling Rookie",
    "iconUrl": "https://picsum.photos/64/64",
  },
  {
    "title": "Planet Protector",
    "iconUrl": "https://picsum.photos/64/64",
  },
  {
    "title": "Solar Powered",
    "iconUrl": "https://picsum.photos/64/64",
  },
  {
    "title": "Eco Influencer",
    "iconUrl": "https://picsum.photos/64/64",
  }
];
  
const CHALLENGES = [
  {
    "topic": "Trash Collector",
    "description": "Collect and properly dispose of 10 pieces of litter.",
    "points": 50,
    "iconUrl": "https://picsum.photos/64/64"
  },
  {
    "topic": "Car-Free Day",
    "description": "Use only public transport, bike or walk for a full day.",
    "points": 40,
    "iconUrl": "https://picsum.photos/64/64"
  },
  {
    "topic": "Recycling Mission",
    "description": "Recycle 5 different types of materials today.",
    "points": 30,
    "iconUrl": "https://picsum.photos/64/64"
  },
  {
    "topic": "Green Commute Week",
    "description": "Use sustainable transport for 5 days in a row.",
    "points": 100,
    "iconUrl": "https://picsum.photos/64/64"
  },
  {
    "topic": "Tree Planting",
    "description": "Plant a tree or participate in a tree planting event.",
    "points": 120,
    "iconUrl": "https://picsum.photos/64/64"
  },
  {
    "topic": "Eco Rivalry",
    "description": "Beat your friend in total eco-points this week.",
    "points": 60,
    "iconUrl": "https://picsum.photos/64/64"
  },
  {
    "topic": "Zero-Waste Day",
    "description": "Produce no waste in a single day. No plastic, no trash!",
    "points": 80,
    "iconUrl": "https://picsum.photos/64/64"
  },
  {
    "topic": "Local Food Lover",
    "description": "Eat only locally produced food for a day.",
    "points": 40,
    "iconUrl": "https://picsum.photos/64/64"
  },
  {
    "topic": "Community Clean-Up",
    "description": "Join or organize a clean-up event in your neighborhood.",
    "points": 90,
    "iconUrl": "https://picsum.photos/64/64"
  },
  {
    "topic": "Eco Streak Master",
    "description": "Complete a challenge every day for 7 days straight.",
    "points": 150,
    "iconUrl": "https://picsum.photos/64/64"
  }
];

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.collection('awards').insertMany(AWARDS.map(award => ({ ...award, createdAt: new Date(), updatedAt: new Date() })));
    await db.collection('challenges').insertMany(CHALLENGES.map(challenge => ({ ...challenge, createdAt: new Date(), updatedAt: new Date() })));
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection('awards').deleteMany({});
    await db.collection('challenges').deleteMany({});
  }
};
