-- Safely update transactions table (Idempotent)

-- 1. Add columns if they are missing
do $$ 
begin
    if not exists (select 1 from information_schema.columns where table_name = 'transactions' and column_name = 'tier_name') then
        alter table transactions add column tier_name text;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'transactions' and column_name = 'quantity') then
        alter table transactions add column quantity int default 1;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'transactions' and column_name = 'total_price') then
        alter table transactions add column total_price numeric;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'transactions' and column_name = 'status') then
        alter table transactions add column status text;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'transactions' and column_name = 'midtrans_id') then
        alter table transactions add column midtrans_id text;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'transactions' and column_name = 'user_id') then
        alter table transactions add column user_id uuid references auth.users;
    end if;
end $$;

-- 2. Ensure RLS is enabled
alter table transactions enable row level security;

-- 3. Reset Policies (Drop and Re-create)
drop policy if exists "Enable insert for everyone" on transactions;
create policy "Enable insert for everyone" on transactions for insert with check (true);

drop policy if exists "Organizers can view transactions" on transactions;
create policy "Organizers can view transactions" on transactions for select using (
  exists (
    select 1 from events 
    where events.id = transactions.event_id 
    and events.organizer_id = auth.uid()
  )
);

drop policy if exists "Users can view own transactions" on transactions;
create policy "Users can view own transactions" on transactions for select using (
  auth.uid() = user_id
);
