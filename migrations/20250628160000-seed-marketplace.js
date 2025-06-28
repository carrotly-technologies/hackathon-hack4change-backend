const { ObjectId } = require('mongodb');

module.exports = {
  async up(db) {
    const marketplaceItems = [
      {
        _id: new ObjectId(),
        name: "Eco-Friendly Water Bottle",
        description: "Reusable stainless steel water bottle to reduce plastic waste",
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Bamboo Toothbrush Set",
        description: "Set of 4 biodegradable bamboo toothbrushes",
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Organic Cotton Tote Bag",
        description: "Reusable shopping bag made from organic cotton",
        price: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Solar Power Bank",
        description: "Portable charger powered by solar energy",
        price: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Seed Bomb Kit",
        description: "Kit with native wildflower seeds to help pollinators",
        price: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "LED Light Bulb Pack",
        description: "Energy-efficient LED bulbs to reduce electricity consumption",
        price: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Compost Bin",
        description: "Small indoor compost bin for kitchen waste",
        price: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Beeswax Food Wraps",
        description: "Eco-friendly alternative to plastic wrap",
        price: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await db.collection('marketplaces').insertMany(marketplaceItems);
  },

  async down(db) {
    await db.collection('marketplaces').deleteMany({});
  }
}; 