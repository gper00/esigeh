const pool = require('../db/pool');

exports.getAdminBoundaries = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, ST_AsGeoJSON(geom)::json as geometry FROM admin_boundaries");
    res.json({ type: 'FeatureCollection', features: result.rows.map(r => ({ type: 'Feature', id: r.id, properties: { name: r.name }, geometry: r.geometry })) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getSettlements = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, ST_AsGeoJSON(geom)::json as geometry FROM settlements");
    res.json({ type: 'FeatureCollection', features: result.rows.map(r => ({ type: 'Feature', id: r.id, properties: { name: r.name }, geometry: r.geometry })) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
