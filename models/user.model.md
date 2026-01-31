# User Model

## Table Name
users

## Description
Stores all application users. Each user can have only one role.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|-------------|
| id | uuid | Primary Key, auto-generated |
| name | text | NOT NULL |
| email | text | UNIQUE, NOT NULL |
| password | text | NOT NULL (stored as plain text for evaluation) |
| role | text | CHECK (customer, owner, driver) |
| created_at | timestamp | Default: now() |

## Relationships
- One **Owner** can own many vehicles
- One **Customer** can create many trips
- One **Driver** can be assigned to a vehicle
