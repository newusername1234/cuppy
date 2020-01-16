insert into cups (userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID)
VALUES
(2, 'chai', '2020-01-02', '2020-01-07', '4.5', '', '12oz', 'Almond Milk, Splenda', 'y', 'spicy', 'farts', 'lemon', 'honey', 'milky', 'its a chai, it was fine', 5, 1, NULL),
(1, 'brewed coffee', '2019-12-15', '2020-01-07', '2.5', 'Chemex', '12oz', 'none', 'y', 'cocoa', 'cherry', 'blood orange', 'brown sugar', 'silky', 'a little underwhelming. too acidic', 3,1,1);

insert into shops (name, location, phoneNumber, hours, website, shopOwnerID)
VALUES
('kula coffee', 'ATV', '404-543-5742', '6am - 7pm', 'kulacoffee.com', 1),
('taproom coffee', 'kirkwood', '678-111-2345','7am - 10pm', 'taproomcoffee.com', 1);

insert into beanCoffee (name, roastProfile, roasterID, greenCoffeeID)
VALUES
('Rwanda coko-gaju', 'light', 1, 1);

insert into roasters (name, location, phoneNumber, website)
VALUES
('Kula coffee roasters', 'ATV', '404-111-9876', 'kulacoffee.com');

insert into greenCoffee (countryOfOrigin, regionOfOrigin, farm, farmer, elevation, varietal, processingStyle)
VALUES
('Rwanda', 'Coko-Gaju', 'finca la Gaju' ,'Farmer Joe', 1800, 'bourbon', 'washed');

insert into users (username, firstName, lastName, email, phoneNumber, hash)
VALUES
('austin', 'Austin', 'Dryden', 'austinisnorobot@gmail.com', '404-888-9999', 'browns'),
('pat', 'Patrick', 'Easterly', 'pattypatpat@gmail.com', '123-333-4567', 'browns'),
('wes', 'Wes', 'Ayer', 'wesayer@gmail.com', '222-324-4532', 'browns');

insert into roasters_shops (roasterID, shopID)
VALUES
(1, 1);

insert into usersLikes(userID, shopID, roasterID, beanCoffeeID)
VALUES
(1, NULL, NULL, 1),
(1,1, NULL, NULL);