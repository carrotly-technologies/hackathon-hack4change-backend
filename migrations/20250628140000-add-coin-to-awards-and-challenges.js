module.exports = {
  async up(db) {
    // Add random coin values to awards collection (10-100 coins)
    const awards = await db.collection('awards').find({}).toArray();
    for (const award of awards) {
      const randomCoins = Math.floor(Math.random() * 91) + 10; // 10-100
      await db.collection('awards').updateOne(
        { _id: award._id },
        { $set: { coin: randomCoins } }
      );
    }

    // Add random coin values to challenges collection (20-200 coins)
    const challenges = await db.collection('challenges').find({}).toArray();
    for (const challenge of challenges) {
      const randomCoins = Math.floor(Math.random() * 181) + 20; // 20-200
      await db.collection('challenges').updateOne(
        { _id: challenge._id },
        { $set: { coin: randomCoins } }
      );
    }

    // Add coin field to users collection with default 0
    await db.collection('users').updateMany(
      { coin: { $exists: false } },
      { $set: { coin: 0 } }
    );
  },

  async down(db) {
    // Remove coin field from awards collection
    await db.collection('awards').updateMany(
      {},
      { $unset: { coin: "" } }
    );

    // Remove coin field from challenges collection
    await db.collection('challenges').updateMany(
      {},
      { $unset: { coin: "" } }
    );

    // Remove coin field from users collection
    await db.collection('users').updateMany(
      {},
      { $unset: { coin: "" } }
    );
  }
}; 