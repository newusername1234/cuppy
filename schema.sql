

create table cups (
    id serial primary key,
    userID integer references users(id),
    dateOrdered date, 
    cost text,
    brewMethod text,
    coffeeSize text,
    condiments text,
    name text, 
    didLike text, 
    flavor text, 
    aroma text, 
    acidity text, 
    sweetness text, 
    mouthfeel text, 
    comments text,
    score integer,
    shopID integer references shops(id),
    retailCoffeeID integer references retailCoffee(id)
);

create table shops (
    id serial primary key,
    name text,
    location text, 
    phoneNumber varchar(20),
    hours text,
    website text,
    shopOwnerID integer references users(id)
);

create table retailCoffee (
    id serial primary key,
    name text, 
    roastDate date,
    roastProfile text,
    roasterID integer references roasters(id),
    greenCoffeeID integer references greencoffee(id)
);

create table roasters (
    id serial primary key,
    name text,
    location text, 
    phoneNumber varchar(20),
    website text
);

create table greencoffee (
    id serial primary key,
    countryOfOrigin text,
    regionOfOrigin text,
    farm text, 
    farmer text, 
    elevation integer, 
    varietal text,
    processingStyle text
);

create table users (
    id serial primary key,
    username text unique not null,
    firstName text, 
    lastName text, 
    email text, 
    phoneNumber varchar(20),
    hash text
);

create table roasters_shops (
    roasterID integer references roasters(id),
    shopID integer references shops(id)
);

create table usersLikes (
    userID integer references users(id),
    shopID integer references shops(id),
    roasterID integer references roasters(id),
    retailCoffeeID integer references retailCoffee(id)
);