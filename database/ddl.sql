-- Create a database for our demo.
-- CREATE DATABASE webstore;

-- Setup the database schema.
CREATE TABLE admin (
    id BIGSERIAL,
    fullname TEXT,
    gender TEXT,
    phone TEXT,
    age INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);