create table if not exists users (
	id UUID primary key not null,
	first_name VARCHAR(50) not null,
	last_name VARCHAR(50) not null,
	email VARCHAR(100) not null unique,
	password VARCHAR(100) not null
);

do $$
begin
    if not exists (select 1 from pg_type where typname = 'transaction_type') then
        create type transaction_type as enum ('EARNING', 'EXPENSE', 'INVESTMENT');
    end if;
end $$;

create table if not exists transactions (
    id UUID primary key not null,
    user_id UUID not null,
    name varchar(100) not null,
    date date not null,
    amount numeric(10, 2) not null,
    type transaction_type not null,

    FOREIGN KEY (user_id)  references users(id) on delete cascade
);