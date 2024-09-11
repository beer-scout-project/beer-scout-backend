import postgres from 'postgres';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

// Function to fetch certificates from S3
async function getCerts() {
  const s3 = new S3Client({ region: process.env.AWS_REGION });

  try {
    const data = await s3.send(
      new GetObjectCommand({
        Bucket: 'gameontap-server-cert',
        Key: 'certkey.pem',
      })
    );

    const chunks = [];
    //@ts-ignore
    for await (const chunk of data.Body) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks).toString();
  } catch (error) {
    console.error('Error retrieving the certificate from S3:', error);
    throw error;
  }
}

// Function to create a connection to PostgreSQL using certs
async function createSqlConnection() {
  try {
    const certs = await getCerts();

    return postgres({
      host: process.env.BEER_SCOUT_DB_HOST, // DB host for beer scout
      port: Number(process.env.BEER_SCOUT_DB_PORT), // DB port for beer scout
      database: process.env.BEER_SCOUT_DB_NAME, // DB name for beer scout
      user: process.env.BEER_SCOUT_DB_USER, // DB user for beer scout
      password: process.env.BEER_SCOUT_DB_PASSWORD, // DB password for beer scout
      ssl: {
        ca: certs,
      },
    });
  } catch (error) {
    console.error('Error creating SQL connection:', error);
    throw new Error('Failed to create SQL connection');
  }
}

let sqlPromise: Promise<postgres.Sql>;

export async function getSql() {
  if (!sqlPromise) {
    sqlPromise = createSqlConnection();
  }
  return sqlPromise;
}
