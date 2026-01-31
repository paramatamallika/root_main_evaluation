# Trip Model

## Table Name
trips

## Description
Stores trip information created by customers using available vehicles.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|-------------|
| id | uuid | Primary Key |
| customer_id | uuid | Foreign Key → users(id) |
| vehicle_id | uuid | Foreign Key → vehicles(id) |
| start_date | date | NOT NULL |
| end_date | date | NOT NULL |
| location | text | NOT NULL |
| distance_km | numeric | NOT NULL |
| passengers | integer | NOT NULL |
| tripcost | numeric | Calculated on trip end |
| iscompleted | boolean | Default: false |
| created_at | timestamp | Default: now() |

## Relationships
- One **Customer** → Many **Trips**
- One **Vehicle** → Many **Trips**
