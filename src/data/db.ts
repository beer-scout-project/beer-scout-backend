import postgres from 'postgres';

// Load environment variables from .env in non-production environments
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
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

let sqlPromise: Promise<ReturnType<typeof postgres>>;

export async function getSql() {
  if (!sqlPromise) {
    sqlPromise = createSqlConnection();
  }
  return sqlPromise;
}

//temp
