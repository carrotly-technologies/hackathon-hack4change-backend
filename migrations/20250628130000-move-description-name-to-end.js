module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Update the schema to make description and name optional for active activities
    // For completed activities, we'll keep the existing values
    // For active activities, we'll set them to null/empty to indicate they need to be filled at end
    
    const activeActivities = await db.collection("activities").find({ isActive: true }).toArray();
    
    for (const activity of activeActivities) {
      await db.collection("activities").updateOne(
        { _id: activity._id },
        { 
          $set: { 
            description: null,
            name: null,
            updatedAt: new Date()
          } 
        }
      );
    }

    console.log(`Updated ${activeActivities.length} active activities to have null description and name`);
    console.log("Description and name will now be required when activity ends");
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // Restore description and name for active activities
    // We'll generate default values since we can't restore the original ones
    
    const activeActivities = await db.collection("activities").find({ 
      isActive: true,
      $or: [
        { description: null },
        { name: null }
      ]
    }).toArray();
    
    for (const activity of activeActivities) {
      const defaultName = `Gdańsk ${activity.activityType.charAt(0).toUpperCase() + activity.activityType.slice(1)} Activity`;
      const defaultDescription = `Active ${activity.activityType} activity in Gdańsk`;
      
      await db.collection("activities").updateOne(
        { _id: activity._id },
        { 
          $set: { 
            description: defaultDescription,
            name: defaultName,
            updatedAt: new Date()
          } 
        }
      );
    }

    console.log(`Restored description and name for ${activeActivities.length} active activities`);
  },
}; 