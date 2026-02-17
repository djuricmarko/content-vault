import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  name: text('name').notNull(),
  icon: text('icon').notNull().default('folder'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().unique(),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
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

const categoriesRelations = relations(categories, ({ many }) => ({
  entries: many(entries),
}));

const profilesRelations = relations(profiles, () => ({}));

const entriesRelations = relations(entries, ({ one, many }) => ({
  category: one(categories, {
    fields: [entries.categoryId],
    references: [categories.id],
  }),
  collaborators: many(collaborators),
}));

const collaboratorsRelations = relations(collaborators, ({ one }) => ({
  entry: one(entries, {
    fields: [collaborators.entryId],
    references: [entries.id],
  }),
}));

type Category = typeof categories.$inferSelect;
type NewCategory = typeof categories.$inferInsert;

type Profile = typeof profiles.$inferSelect;
type NewProfile = typeof profiles.$inferInsert;

type Entry = typeof entries.$inferSelect;
type NewEntry = typeof entries.$inferInsert;

type Collaborator = typeof collaborators.$inferSelect;
type NewCollaborator = typeof collaborators.$inferInsert;

export { categories, profiles, entries, collaborators, categoriesRelations, profilesRelations, entriesRelations, collaboratorsRelations };
export type { Category, NewCategory, Profile, NewProfile, Entry, NewEntry, Collaborator, NewCollaborator };
