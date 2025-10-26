import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getWeddingDetails = query({
  args: {},
  handler: async (ctx) => {
    const details = await ctx.db.query("weddingDetails").first();
    if (!details) {
      // Return default data if none exists
      return {
        groomName: "Alexander",
        brideName: "Isabella",
        invitationText: "With hearts full of joy and love, we cordially invite you to witness and celebrate the sacred union of our souls. Join us as we embark on this beautiful journey together, surrounded by the warmth and blessings of our beloved family and friends.",
        ceremonies: [
          {
            name: "Wedding Ceremony",
            date: "December 15, 2024",
            time: "4:00 PM",
            location: "Royal Gardens Chapel",
            address: "123 Royal Avenue, Golden City, GC 12345",
            mapLink: "https://maps.google.com/?q=123+Royal+Avenue+Golden+City"
          },
          {
            name: "Reception Dinner",
            date: "December 15, 2024",
            time: "7:00 PM",
            location: "Grand Ballroom",
            address: "456 Palace Street, Golden City, GC 12345",
            mapLink: "https://maps.google.com/?q=456+Palace+Street+Golden+City"
          }
        ]
      };
    }
    return details;
  },
});

export const updateWeddingDetails = mutation({
  args: {
    groomName: v.string(),
    brideName: v.string(),
    invitationText: v.string(),
    ceremonies: v.array(v.object({
      name: v.string(),
      date: v.string(),
      time: v.string(),
      location: v.string(),
      address: v.string(),
      mapLink: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("weddingDetails").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("weddingDetails", args);
    }
  },
});
