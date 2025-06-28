const EVENTS = [
  {
    "name": "Community Garden Cleanup",
    "localization": {
      "name": "Central Park",
      "coordinates": {
        "latitude": 40.785091,
        "longitude": -73.968285
      }
    },
    "time": new Date("2024-02-15T10:00:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "ECOLOGICAL",
    "userIds": []
  },
  {
    "name": "Food Drive for Local Shelter",
    "localization": {
      "name": "Community Center",
      "coordinates": {
        "latitude": 40.748817,
        "longitude": -73.985428
      }
    },
    "time": new Date("2024-02-20T14:00:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "SOCIAL",
    "userIds": []
  },
  {
    "name": "River Cleanup Initiative",
    "localization": {
      "name": "Hudson River Waterfront",
      "coordinates": {
        "latitude": 40.756054,
        "longitude": -74.002882
      }
    },
    "time": new Date("2024-02-25T09:00:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "ECOLOGICAL",
    "userIds": []
  },
  {
    "name": "Senior Citizens Support Program",
    "localization": {
      "name": "Senior Living Center",
      "coordinates": {
        "latitude": 40.742054,
        "longitude": -73.989308
      }
    },
    "time": new Date("2024-03-01T11:00:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "SOCIAL",
    "userIds": []
  },
  {
    "name": "Tree Planting Campaign",
    "localization": {
      "name": "Prospect Park",
      "coordinates": {
        "latitude": 40.660204,
        "longitude": -73.969086
      }
    },
    "time": new Date("2024-03-05T08:00:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "ECOLOGICAL",
    "userIds": []
  },
  {
    "name": "Homeless Shelter Volunteer Day",
    "localization": {
      "name": "Downtown Shelter",
      "coordinates": {
        "latitude": 40.714606,
        "longitude": -74.002882
      }
    },
    "time": new Date("2024-03-10T16:00:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "SOCIAL",
    "userIds": []
  },
  {
    "name": "Beach Cleanup Day",
    "localization": {
      "name": "Coney Island Beach",
      "coordinates": {
        "latitude": 40.574053,
        "longitude": -73.986951
      }
    },
    "time": new Date("2024-03-15T07:00:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "ECOLOGICAL",
    "userIds": []
  },
  {
    "name": "Youth Mentorship Program",
    "localization": {
      "name": "Boys and Girls Club",
      "coordinates": {
        "latitude": 40.678178,
        "longitude": -73.944158
      }
    },
    "time": new Date("2024-03-20T13:00:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "SOCIAL",
    "userIds": []
  },
  {
    "name": "Urban Composting Workshop",
    "localization": {
      "name": "Brooklyn Community Garden",
      "coordinates": {
        "latitude": 40.678178,
        "longitude": -73.944158
      }
    },
    "time": new Date("2024-03-25T10:30:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "ECOLOGICAL",
    "userIds": []
  },
  {
    "name": "Community Kitchen Volunteer Day",
    "localization": {
      "name": "St. Mary's Church",
      "coordinates": {
        "latitude": 40.721319,
        "longitude": -73.987130
      }
    },
    "time": new Date("2024-03-30T12:00:00Z"),
    "imageUrl": "https://picsum.photos/64/64",
    "eventType": "SOCIAL",
    "userIds": []
  }
];

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.collection('events').insertMany(EVENTS.map(event => ({ ...event, createdAt: new Date(), updatedAt: new Date() })));
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection('events').deleteMany({});
  }
};
