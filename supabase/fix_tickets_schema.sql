-- Add midtrans_id to tickets table to track payment status directly
alter table tickets add column if not exists midtrans_id text;

-- Ensure RLS allows update if needed (usually handled by service role in webhook, but good to check)
-- Existing policies:
-- create policy "Users can buy tickets" on tickets for insert with check (auth.uid() = user_id);
-- This is fine for authenticated users.
