import 'server-only';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const db = drizzle(neon(process.env.POSTGRES_URL as string));

export { db };
