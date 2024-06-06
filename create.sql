drop schema solid cascade;
create schema solid;

create table solid.room (
	room_id uuid primary key,
	type text,
    category text,
	price numeric
);

create table solid.reservation (
	reservation_id uuid primary key,
	room_id uuid,
	email text,
	checkin_date timestamp,
	checkout_date timestamp,
	price numeric,
	status text,
	duration numeric
);

insert into solid.room (room_id, type, category ,price) values ('aa354842-59bf-42e6-be3a-6188dbb5fff8', 'day', 'suit', 100);
insert into solid.room (room_id, type, category, price) values ('d5f5c6cb-bf69-4743-a288-dafed2517e38', 'hour', 'regular', 50);