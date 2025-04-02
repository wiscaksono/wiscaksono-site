import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(DATABASE_URL, { prepare: false });

export const db = drizzle(client, { schema });
