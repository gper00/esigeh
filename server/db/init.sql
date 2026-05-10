-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Drop existing tables for a clean migration
DROP TABLE IF EXISTS roads CASCADE;
DROP TABLE IF EXISTS shelters CASCADE;
DROP TABLE IF EXISTS settlements CASCADE;
DROP TABLE IF EXISTS admin_boundaries CASCADE;

-- Table for Shelters
CREATE TABLE IF NOT EXISTS shelters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(100),
    capacity INTEGER DEFAULT 0,
    geom GEOMETRY(Point, 4326)
);

-- Table for Roads
CREATE TABLE IF NOT EXISTS roads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(100),
    condition VARCHAR(50) DEFAULT 'open',
    geom GEOMETRY(MultiLineString, 4326)
);

-- Table for Settlements
CREATE TABLE IF NOT EXISTS settlements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    geom GEOMETRY(MultiPolygon, 4326)
);

-- Table for Admin Boundaries
CREATE TABLE IF NOT EXISTS admin_boundaries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    geom GEOMETRY(Geometry, 4326)
);

-- Spatial Indexes
CREATE INDEX IF NOT EXISTS shelters_geom_idx ON shelters USING GIST (geom);
CREATE INDEX IF NOT EXISTS roads_geom_idx ON roads USING GIST (geom);
CREATE INDEX IF NOT EXISTS settlements_geom_idx ON settlements USING GIST (geom);
