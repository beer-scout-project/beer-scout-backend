import postgres from 'postgres';

// use db connection from .env file for local development
if (process.env.NODE_ENV !== 'production') {
  await import('dotenv/config');
}

// Function to create a PostgreSQL connection using the Railway-provided DATABASE_URL
async function createSqlConnection() {
  try {
    //@ts-ignore
    return postgres(process.env.DATABASE_CONNECT, {
      ssl: {
        rejectUnauthorized: false, // Disable strict SSL to connect to Railway's PostgreSQL
      },
    });
  } catch (error) {
    console.error('Error creating SQL connection:', error);
    throw new Error('Failed to create SQL connection');
  }
}

let sqlPromise: Promise<postgres.Sql<any>>;

export async function getSql() {
  if (!sqlPromise) {
    sqlPromise = createSqlConnection();
  }
  return sqlPromise;
}
