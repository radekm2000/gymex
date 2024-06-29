import { pgTable, text } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  phone: text('phone').default('123'),
});
