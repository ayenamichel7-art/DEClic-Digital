-- Migration: Initial Schema for Declic Digital
-- Description: Creates the tickets table and basic RLS policies.

-- Create tickets table
create table if not exists tickets (
  id text primary key,
  feda_id text unique,
  product text not null,
  amount numeric not null,
  email text,
  name text,
  phone text,
  timestamp timestamp with time zone default now()
);

-- Enable RLS
alter table tickets enable row level security;

-- Create policies
-- Only service_role can access (no public policies needed)

-- Note: The service_role key used by the backend will bypass RLS.
