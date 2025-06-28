const { ObjectId } = require('mongodb');

// Sample links for different types of events
const EVENT_LINKS = {
  "Community Garden Cleanup": "https://www.nycgovparks.org/parks/central-park",
  "Food Drive for Local Shelter": "https://www.foodbanknyc.org/volunteer",
  "River Cleanup Initiative": "https://www.riverkeeper.org/volunteer",
  "Senior Citizens Support Program": "https://www.nyc.gov/aging",
  "Tree Planting Campaign": "https://www.milliontreesnyc.org",
  "Homeless Shelter Volunteer Day": "https://www.coalitionforthehomeless.org/volunteer",
  "Beach Cleanup Day": "https://www.nycgovparks.org/parks/coney-island-beach",
  "Youth Mentorship Program": "https://www.bgca.org/volunteer",
  "Urban Composting Workshop": "https://www.nyc.gov/composting",
  "Community Kitchen Volunteer Day": "https://www.stmarysnyc.org/volunteer"
};

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const events = await db.collection("events").find({}).toArray();
    
    for (const event of events) {
      const link = EVENT_LINKS[event.name] || null;
      
      await db.collection("events").updateOne(
        { _id: event._id },
        { 
          $set: { 
            link: link,
            updatedAt: new Date()
          } 
        }
      );
    }
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection("events").updateMany(
      {},
      { 
        $unset: { link: "" },
        $set: { updatedAt: new Date() }
      }
    );
  },
}; 