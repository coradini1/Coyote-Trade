import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  birthdate: text("birthdate").notNull(),
  address: text("address").notNull(),
  password: text("password").notNull(),
  balance: integer("balance").default(0).notNull(),
  email: text("email").unique().notNull(),
  role: text("role").default("user").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const ordersTable = sqliteTable("orders", {
  user_id: integer("user_id").references(() => usersTable.id),
  asset_id: integer("asset_id").references(() => assetsTable.id),
  id: integer("id").primaryKey(),
  quantity: integer("quantity").notNull(),
  type: text("type").notNull(),
  amount: integer("amount").notNull(),
  settle_date: text("settle_date").notNull(),
  status: text("status").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const assetsTable = sqliteTable("assets", {
  id: integer("id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.id),
  asset_name: text("asset_name").notNull(),
  asset_symbol: text("asset_symbol").notNull(),
  avg_price: integer("avg_price").notNull(),
  quantity: integer("quantity").notNull(),
});

export const transfersTable = sqliteTable("transfers", {
  id: integer("id").primaryKey(),
  type: text("type").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull(),
  from: integer("from").references(() => usersTable.id),
  to: integer("to").references(() => usersTable.id),
});

export const alertsTable = sqliteTable("alerts", {
  id: integer("id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.id),
  asset_id: integer("asset_id").references(() => assetsTable.id),
  target_price: integer("target_price").notNull(),
  lower_threshold: integer("lower_threshold").notNull(),
  asset_symbol: text("asset_symbol").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertAlert = typeof alertsTable.$inferInsert;
export type SelectAlert = typeof alertsTable.$inferSelect;

export type InsertTransfer = typeof transfersTable.$inferInsert;
export type SelectTransfer = typeof transfersTable.$inferSelect;

export type InsertOrder = typeof ordersTable.$inferInsert;
export type SelectOrder = typeof ordersTable.$inferSelect;

export type InsertAsset = typeof assetsTable.$inferInsert;
export type SelectAsset = typeof assetsTable.$inferSelect;
