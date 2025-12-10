import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  name: text('name').notNull(),
  color: text('color').default('#F59E0B'),
  icon: text('icon').default('folder'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

const entries = pgTable('entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

const collaborators = pgTable('collaborators', {
  id: uuid('id').primaryKey().defaultRandom(),
  entryId: uuid('entry_id').notNull().references(() => entries.id, { onDelete: 'cascade' }),
  invitedBy: uuid('invited_by').notNull(),
  collaboratorEmail: text('collaborator_email').notNull(),
  collaboratorId: uuid('collaborator_id'),
  inviteToken: text('invite_token').notNull().unique(),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

type Category = typeof categories.$inferSelect;
type NewCategory = typeof categories.$inferInsert;

type Entry = typeof entries.$inferSelect;
type NewEntry = typeof entries.$inferInsert;

type Collaborator = typeof collaborators.$inferSelect;
type NewCollaborator = typeof collaborators.$inferInsert;

export { categories, entries, collaborators };
export type { Category, NewCategory, Entry, NewEntry, Collaborator, NewCollaborator };
