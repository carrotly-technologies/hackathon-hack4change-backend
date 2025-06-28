module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Get all collection names
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    console.log('Removing collections:', collectionNames);
    
    // Drop all collections except system collections
    for (const collectionName of collectionNames) {
      // Skip system collections
      if (!collectionName.startsWith('system.')) {
        try {
          await db.collection(collectionName).drop();
          console.log(`Dropped collection: ${collectionName}`);
        } catch (error) {
          console.log(`Failed to drop collection ${collectionName}:`, error.message);
        }
      }
    }
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // This migration cannot be rolled back as it permanently deletes data
    console.log('Warning: This migration cannot be rolled back as it permanently deletes collections');
  }
};
