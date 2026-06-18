import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const profile = mysqlTable("profile", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    bio: varchar("bio", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
