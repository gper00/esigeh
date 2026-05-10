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
  const client = new Client({ ...baseConfig, database: process.env.DB_NAME });
  try {
    await client.connect();
    console.log('Connected for additional migration...');

    const parseQgisJs = (filePath, varName) => {
      console.log(`Reading ${filePath}...`);
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
      return JSON.parse(jsonStr);
    };

    const legacyPath = path.join(__dirname, '../../legacy_qgis/layers');

    // 1. Migrate Admin Boundaries
    console.log('Migrating Admin Boundaries...');
    const adminData = parseQgisJs(path.join(legacyPath, 'Batasadministrasi_2.js'), 'json_Batasadministrasi_2');
    for (const feature of adminData.features) {
      const name = feature.properties.NAMOBJ || 'Batas Admin';
      const geom = JSON.stringify(feature.geometry);
      await client.query(
        'INSERT INTO admin_boundaries (name, geom) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326))',
        [name, geom]
      );
    }

    // 2. Migrate Settlements
    console.log('Migrating Settlements...');
    const settlementData = parseQgisJs(path.join(legacyPath, 'Pemukiman_1.js'), 'json_Pemukiman_1');
    for (const feature of settlementData.features) {
      const name = feature.properties.NAMOBJ || 'Pemukiman';
      const geom = JSON.stringify(feature.geometry);
      await client.query(
        'INSERT INTO settlements (name, geom) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326))',
        [name, geom]
      );
    }

    console.log('Additional migration completed!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}
migrate();
