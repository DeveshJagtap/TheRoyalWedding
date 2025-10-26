import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  weddingDetails: defineTable({
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
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
