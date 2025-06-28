module.exports = {
  async up(db) {
    const challenges = await db.collection('challenges').find({}).toArray();
    
    for (const challenge of challenges) {
      // Randomly assign either 'own' or 'company' type
      const randomType = Math.random() < 0.5 ? 'own' : 'company';
      
      await db.collection('challenges').updateOne(
        { _id: challenge._id },
        { $set: { type: randomType } }
      );
    }
    
    console.log(`Updated ${challenges.length} challenges with random type values`);
  },

  async down(db) {
    // Remove the type field from all challenges
    await db.collection('challenges').updateMany(
      {},
      { $unset: { type: "" } }
    );
    
    console.log('Removed type field from all challenges');
  }
}; 