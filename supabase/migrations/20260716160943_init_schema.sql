create table appointments (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  email text not null,
  service text not null,
  appointment_date date not null,
  appointment_time text not null,
  message text,
  status text default 'Pending',
  is_returning boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table contact_queries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS) and enable completely public inserts but restricted reads
alter table appointments enable row level security;
alter table contact_queries enable row level security;

-- Public can insert appointments
create policy "Allow public to insert appointments" 
on appointments for insert 
to public 
with check (true);

-- Authenticated users (admin) can do all
create policy "Allow authenticated users full access to appointments" 
on appointments for all 
to authenticated 
using (true) 
with check (true);

-- Public can insert contact queries
create policy "Allow public to insert contact queries" 
on contact_queries for insert 
to public 
with check (true);

-- Authenticated users (admin) can do all
create policy "Allow authenticated users full access to contact queries" 
on contact_queries for all 
to authenticated 
using (true) 
with check (true);
