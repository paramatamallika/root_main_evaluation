# Vehicle Model

## Table Name
vehicles

## Description
Stores vehicles created by owners. Vehicles can be assigned to drivers and used for trips.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|-------------|
| id | uuid | Primary Key |
| name | text | NOT NULL |
| registration_number | text | UNIQUE, NOT NULL |
| allowed_passengers | integer | NOT NULL |
| isavailable | boolean | Default: true |
| driver_id | uuid | Foreign Key → users(id), nullable |
| rate_per_km | numeric | NOT NULL |
| owner_id | uuid | Foreign Key → users(id) |
| created_at | timestamp | Default: now() |

## Relationships
- One **Owner** → Many **Vehicles**
- One **Driver** → One **Vehicle**
- One **Vehicle** → Many **Trips**
