drop schema solid cascade;
create schema solid;

create table solid.rooms(
	id uuid primary key,
	type text,
    category text,
	price numeric
);

create table solid.accounts(
	id uuid primary key,
	name text,
	email text,
	password text,
	cpf text
);

create table solid.reservations(
	id uuid primary key,
	room_id uuid,
    account_id uuid,
	checkin_date timestamp,
	checkout_date timestamp,
	price numeric,
	status text,
	duration numeric,

	foreign key (room_id) references solid.rooms(id),
	foreign key (account_id) references solid.accounts(id)
);

insert into solid.rooms (id, type, category ,price) values ('aa354842-59bf-42e6-be3a-6188dbb5fff8', 'day', 'suit', 100);
insert into solid.rooms (id, type, category, price) values ('d5f5c6cb-bf69-4743-a288-dafed2517e38', 'hour', 'regular', 50);