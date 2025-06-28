const EVENTS = [
  {
    name: "Community Garden Cleanup",
    place: "Central Park",
    localization: [-73.968285, 40.785091],
    time: new Date("2024-02-15T10:00:00Z"),
    date: new Date("2024-02-15"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [],
  },
  {
    name: "Food Drive for Local Shelter",
    place: "Community Center",
    localization: [-73.985428, 40.748817],
    time: new Date("2024-02-20T14:00:00Z"),
    date: new Date("2024-02-20"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [],
  },
  {
    name: "River Cleanup Initiative",
    place: "Hudson River Waterfront",
    localization: [-74.002882, 40.756054],
    time: new Date("2024-02-25T09:00:00Z"),
    date: new Date("2024-02-25"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [],
  },
  {
    name: "Senior Citizens Support Program",
    place: "Senior Living Center",
    localization: [-73.989308, 40.742054],
    time: new Date("2024-03-01T11:00:00Z"),
    date: new Date("2024-03-01"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [],
  },
  {
    name: "Tree Planting Campaign",
    place: "Prospect Park",
    localization: [-73.969086, 40.660204],
    time: new Date("2024-03-05T08:00:00Z"),
    date: new Date("2024-03-05"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [],
  },
  {
    name: "Homeless Shelter Volunteer Day",
    place: "Downtown Shelter",
    localization: [-74.002882, 40.714606],
    time: new Date("2024-03-10T16:00:00Z"),
    date: new Date("2024-03-10"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [],
  },
  {
    name: "Beach Cleanup Day",
    place: "Coney Island Beach",
    localization: [-73.986951, 40.574053],
    time: new Date("2024-03-15T07:00:00Z"),
    date: new Date("2024-03-15"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [],
  },
  {
    name: "Youth Mentorship Program",
    place: "Boys and Girls Club",
    localization: [-73.944158, 40.678178],
    time: new Date("2024-03-20T13:00:00Z"),
    date: new Date("2024-03-20"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [],
  },
  {
    name: "Urban Composting Workshop",
    place: "Brooklyn Community Garden",
    localization: [-73.944158, 40.678178],
    time: new Date("2024-03-25T10:30:00Z"),
    date: new Date("2024-03-25"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "ECOLOGICAL",
    userIds: [],
  },
  {
    name: "Community Kitchen Volunteer Day",
    place: "St. Mary's Church",
    localization: [-73.98713, 40.721319],
    time: new Date("2024-03-30T12:00:00Z"),
    date: new Date("2024-03-30"),
    imageUrl: "https://picsum.photos/64/64",
    eventType: "SOCIAL",
    userIds: [],
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
