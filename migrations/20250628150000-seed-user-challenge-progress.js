const { ObjectId } = require('mongodb');

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Get existing users and challenges from the database
    const users = await db.collection('users').find({}).toArray();
    const challenges = await db.collection('challenges').find({}).toArray();

    if (users.length === 0 || challenges.length === 0) {
      console.log('No users or challenges found. Skipping user challenge progress seeding.');
      return;
    }

    const userChallengeProgress = [
      // User 1 - Multiple challenges in progress
      {
        userId: users[0]._id,
        challengeId: challenges[0]._id,
        progress: 25,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-20T10:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[0]._id,
        challengeId: challenges[1]._id,
        progress: 60,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-21T11:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[0]._id,
        challengeId: challenges[2]._id,
        progress: 100,
        status: "COMPLETED",
        startedAt: new Date("2025-06-22T12:00:00Z"),
        completedAt: new Date("2025-06-23T12:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // User 2 - Mix of progress and completed
      {
        userId: users[1]._id,
        challengeId: challenges[0]._id,
        progress: 100,
        status: "COMPLETED",
        startedAt: new Date("2025-06-19T09:00:00Z"),
        completedAt: new Date("2025-06-20T09:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[1]._id,
        challengeId: challenges[3]._id,
        progress: 80,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-21T14:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[1]._id,
        challengeId: challenges[4]._id,
        progress: 45,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-22T16:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // User 3 - Mostly completed challenges
      {
        userId: users[2]._id,
        challengeId: challenges[1]._id,
        progress: 100,
        status: "COMPLETED",
        startedAt: new Date("2025-06-18T08:00:00Z"),
        completedAt: new Date("2025-06-19T08:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[2]._id,
        challengeId: challenges[2]._id,
        progress: 100,
        status: "COMPLETED",
        startedAt: new Date("2025-06-20T10:00:00Z"),
        completedAt: new Date("2025-06-21T10:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[2]._id,
        challengeId: challenges[5]._id,
        progress: 30,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-23T13:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // User 4 - Just started challenges
      {
        userId: users[3]._id,
        challengeId: challenges[0]._id,
        progress: 10,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-24T09:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[3]._id,
        challengeId: challenges[6]._id,
        progress: 5,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-24T15:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // User 5 - Advanced progress on multiple challenges
      {
        userId: users[4]._id,
        challengeId: challenges[3]._id,
        progress: 100,
        status: "COMPLETED",
        startedAt: new Date("2025-06-17T07:00:00Z"),
        completedAt: new Date("2025-06-18T07:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[4]._id,
        challengeId: challenges[4]._id,
        progress: 100,
        status: "COMPLETED",
        startedAt: new Date("2025-06-19T11:00:00Z"),
        completedAt: new Date("2025-06-20T11:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[4]._id,
        challengeId: challenges[7]._id,
        progress: 75,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-21T13:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[4]._id,
        challengeId: challenges[8]._id,
        progress: 90,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-22T17:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Additional mixed progress entries for variety
      {
        userId: users[0]._id,
        challengeId: challenges[5]._id,
        progress: 50,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-23T08:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[1]._id,
        challengeId: challenges[6]._id,
        progress: 100,
        status: "COMPLETED",
        startedAt: new Date("2025-06-20T12:00:00Z"),
        completedAt: new Date("2025-06-21T12:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[2]._id,
        challengeId: challenges[7]._id,
        progress: 20,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-24T10:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[3]._id,
        challengeId: challenges[8]._id,
        progress: 100,
        status: "COMPLETED",
        startedAt: new Date("2025-06-18T14:00:00Z"),
        completedAt: new Date("2025-06-19T14:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[4]._id,
        challengeId: challenges[9]._id,
        progress: 35,
        status: "IN_PROGRESS",
        startedAt: new Date("2025-06-23T16:00:00Z"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await db.collection('userchallengeprogresses').insertMany(userChallengeProgress);
    console.log(`Seeded ${userChallengeProgress.length} user challenge progress entries`);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection('userchallengeprogresses').deleteMany({});
    console.log('Removed all user challenge progress entries');
  }
}; 