drop database if exists database_links;

create database database_links CHARSET utf8mb4;

use database_links;


create table users (
    id_user int auto_increment primary key not null unsigned,
    username varchar (30) not null,
    password varchar (60) not null,
    email varchar(255) not null,
    fullname varchar(60) not null
);

create table links (
    id_link int auto_increment primary key not null unsigned,
    title varchar(255),
    url varchar(255),
    description text,
    id_user INT UNSIGNED,
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign_key(id_user) references users(id_user)
);