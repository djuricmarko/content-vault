import 'server-only';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const db = drizzle(process.env.POSTGRES_URL!, { schema });

export { db };
