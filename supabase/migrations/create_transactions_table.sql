-- 1. Create Table if Not Exists
create table if not exists public.transactions (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  tier_name text,
  quantity int default 1,
  total_price numeric,
  status text not null default 'pending', 
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint transactions_pkey primary key (id)
);

-- 2. Add Missing Columns (Safe Alter)
do $$ 
begin
  if not exists (select 1 from information_schema.columns where table_name='transactions' and column_name='midtrans_id') then
    alter table public.transactions add column midtrans_id text unique;
  end if;

  if not exists (select 1 from information_schema.columns where table_name='transactions' and column_name='snap_token') then
    alter table public.transactions add column snap_token text;
  end if;

  if not exists (select 1 from information_schema.columns where table_name='transactions' and column_name='payment_type') then
    alter table public.transactions add column payment_type text;
  end if;

  if not exists (select 1 from information_schema.columns where table_name='transactions' and column_name='tier_name') then
    alter table public.transactions add column tier_name text;
  end if;
end $$;

-- 3. RLS Policies
alter table public.transactions enable row level security;
-- (Re-run policies to be safe, drop first)
drop policy if exists "Users can view own transactions" on public.transactions;
create policy "Users can view own transactions" on public.transactions
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own transactions" on public.transactions;
create policy "Users can insert own transactions" on public.transactions
  for insert with check (auth.uid() = user_id);

drop policy if exists "Admins can view all transactions" on public.transactions;
create policy "Admins can view all transactions" on public.transactions
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role in ('super_admin', 'organizer')
    )
  );
