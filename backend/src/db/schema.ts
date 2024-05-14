import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  birthdate: text("birthdate").notNull(),
  address: text("address").notNull(),
  password: text("password").notNull(),
  email: text("email").unique().notNull(),
  role: text("role").default("user"),
  createdAt: text("createdAt").default(new Date().toLocaleDateString("en-GB"))
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect
