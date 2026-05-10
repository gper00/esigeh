const pool = require('../db/pool');

exports.getAllShelters = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, type, capacity, 
      ST_AsGeoJSON(geom)::json as geometry 
      FROM shelters
    `);
    
    const features = result.rows.map(row => ({
      type: 'Feature',
      id: row.id,
      properties: {
        name: row.name,
        type: row.type,
        capacity: row.capacity
      },
      geometry: row.geometry
    }));

    res.json({
      type: 'FeatureCollection',
      features: features
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getNearestShelter = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

  try {
    const result = await pool.query(`
      SELECT id, name, type, capacity,
      ST_AsGeoJSON(geom)::json as geometry,
      ST_Distance(geom::geography, ST_SetSRID(ST_Point($1, $2), 4326)::geography) as distance_meters
      FROM shelters
      ORDER BY geom <-> ST_SetSRID(ST_Point($1, $2), 4326)
      LIMIT 1
    `, [parseFloat(lng), parseFloat(lat)]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No shelters found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in getNearestShelter:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
