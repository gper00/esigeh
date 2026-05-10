const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const baseConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

async function migrate() {
  const postgresClient = new Client({ ...baseConfig, database: 'postgres' });
  
  try {
    await postgresClient.connect();
    
    // Create database if not exists
    const dbCheck = await postgresClient.query("SELECT 1 FROM pg_database WHERE datname = $1", [process.env.DB_NAME]);
    if (dbCheck.rowCount === 0) {
      console.log(`Creating database ${process.env.DB_NAME}...`);
      await postgresClient.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    }
    await postgresClient.end();

    // Connect to the actual database
    const client = new Client({ ...baseConfig, database: process.env.DB_NAME });
    await client.connect();
    console.log(`Connected to database ${process.env.DB_NAME}`);

    // Create Tables
    const initSql = fs.readFileSync(path.join(__dirname, '../db/init.sql'), 'utf8');
    await client.query(initSql);
    console.log('Tables initialized.');

    // Function to parse QGIS Export JS files
    const parseQgisJs = (filePath, varName) => {
      console.log(`Reading ${filePath}...`);
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
      return JSON.parse(jsonStr);
    };

    const legacyPath = path.join(__dirname, '../../legacy_qgis/layers');

    // 1. Migrate Shelters
    console.log('Migrating Shelters...');
    const sheltersData = parseQgisJs(path.join(legacyPath, 'titikevakuasiupdated_4.js'), 'json_titikevakuasiupdated_4');
    for (const feature of sheltersData.features) {
      const { properties, geometry } = feature;
      const type = properties.Jenis || 'unknown';
      const geom = JSON.stringify(geometry);
      await client.query(
        'INSERT INTO shelters (type, geom) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326))',
        [type, geom]
      );
    }

    // 2. Migrate Roads
    console.log('Migrating Roads (this may take a while)...');
    const roadsData = parseQgisJs(path.join(legacyPath, 'Jalurevakuasi_6.js'), 'json_Jalurevakuasi_6');
    for (const feature of roadsData.features) {
      const { properties, geometry } = feature;
      const name = properties.NAMOBJ || 'Jalur Evakuasi';
      const geom = JSON.stringify(geometry);
      await client.query(
        'INSERT INTO roads (name, geom) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326))',
        [name, geom]
      );
    }

    console.log('Migration completed successfully!');
    await client.end();
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
