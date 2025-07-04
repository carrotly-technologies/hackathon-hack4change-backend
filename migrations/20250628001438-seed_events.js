const { ObjectId } = require('mongodb');

// Generate ObjectIds for users to link to events
const userIds = [
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId(),
  new ObjectId()
];

const EVENTS = [
  {
    name: "Community Garden Cleanup",
    place: "Central Park",
    localization: [-73.968285, 40.785091],
    time: new Date("2025-06-15T10:00:00Z"),
    date: new Date("2025-06-15"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [userIds[0].toString(), userIds[1].toString(), userIds[2].toString()],
  },
  {
    name: "Food Drive for Local Shelter",
    place: "Community Center",
    localization: [-73.985428, 40.748817],
    time: new Date("2025-06-20T14:00:00Z"),
    date: new Date("2025-06-20"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [userIds[1].toString(), userIds[3].toString()],
  },
  {
    name: "River Cleanup Initiative",
    place: "Hudson River Waterfront",
    localization: [-74.002882, 40.756054],
    time: new Date("2025-06-25T09:00:00Z"),
    date: new Date("2025-06-25"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [userIds[0].toString(), userIds[2].toString(), userIds[4].toString()],
  },
  {
    name: "Senior Citizens Support Program",
    place: "Senior Living Center",
    localization: [-73.989308, 40.742054],
    time: new Date("2025-06-01T11:00:00Z"),
    date: new Date("2025-06-01"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [userIds[3].toString(), userIds[4].toString()],
  },
  {
    name: "Tree Planting Campaign",
    place: "Prospect Park",
    localization: [-73.969086, 40.660204],
    time: new Date("2025-06-05T08:00:00Z"),
    date: new Date("2025-06-05"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [userIds[0].toString(), userIds[1].toString(), userIds[3].toString(), userIds[4].toString()],
  },
  {
    name: "Homeless Shelter Volunteer Day",
    place: "Downtown Shelter",
    localization: [-74.002882, 40.714606],
    time: new Date("2025-06-10T16:00:00Z"),
    date: new Date("2025-06-10"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [userIds[1].toString(), userIds[2].toString()],
  },
  {
    name: "Beach Cleanup Day",
    place: "Coney Island Beach",
    localization: [-73.986951, 40.574053],
    time: new Date("2025-06-15T07:00:00Z"),
    date: new Date("2025-06-15"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [userIds[2].toString(), userIds[4].toString()],
  },
  {
    name: "Youth Mentorship Program",
    place: "Boys and Girls Club",
    localization: [-73.944158, 40.678178],
    time: new Date("2025-06-20T13:00:00Z"),
    date: new Date("2025-06-20"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [userIds[0].toString(), userIds[3].toString()],
  },
  {
    name: "Urban Composting Workshop",
    place: "Brooklyn Community Garden",
    localization: [-73.944158, 40.678178],
    time: new Date("2025-06-25T10:30:00Z"),
    date: new Date("2025-06-25"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [userIds[1].toString(), userIds[2].toString(), userIds[3].toString()],
  },
  {
    name: "Community Kitchen Volunteer Day",
    place: "St. Mary's Church",
    localization: [-73.98713, 40.721319],
    time: new Date("2025-06-30T12:00:00Z"),
    date: new Date("2025-06-30"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [userIds[0].toString(), userIds[4].toString()],
  },
];

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const formattedEvents = EVENTS.map((event) => ({
      ...event,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await db.collection("events").insertMany(formattedEvents);
    await db.collection("events").createIndex({ localization: "2dsphere" });
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection("events").deleteMany({});
    await db.collection("events").dropIndex({ localization: "2dsphere" });
  },
};
