import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  age: text('age').notNull(),
});
