insert into roasters (name, location, phoneNumber, website)
VALUES
('Not roasted cofee', 'everywhere','555-555-5555', 'none'),
('Kula coffee roasters', 'ATV', '404-111-9876', 'kulacoffee.com');

insert into greenCoffee (name, countryOfOrigin, regionOfOrigin, farm, farmer, elevation, varietal, processingStyle)
VALUES
('Not actually coffee','No Country', 'No Region', 'No Farm', 'No Farmer', 0, 'no varietal', 'no process'), 
('Finca La Gaju','Rwanda', 'Coko-Gaju', 'finca la Gaju' ,'Farmer Joe', 1800, 'bourbon', 'washed');

insert into users (username, firstName, lastName, email, phoneNumber, hash, apikey, apicalls, apitimestamp)
VALUES
('austin', 'Austin', 'Dryden', 'austinisnorobot@gmail.com', '813-545-74347', '$2a$10$v7raUPPEt0dXSsPI3dDQiuZnKPHA6uHnMISJ7FjQqqJeYUJVznZpq', '292100f9-76cb-4a63-be7b-2ea67e901c09', 0 , '0'),
('pat', 'Patrick', 'Easterly', 'pattypatpat@gmail.com', '123-333-4567', '$2a$10$87T/mbwvdWDWvlSKCnFgeegGmCX2KS08fsvtZiBHMYH2ukg.fFe.G', '92ab93d4-2c52-4aab-92c3-dcf91be88646', 0 , '0'),
('wes', 'Wes', 'Ayer', 'wesayer@gmail.com', '222-324-4532', '$2a$10$btl.cHk65GYxdmBRBcgs9u2T89yDOZoNau4rlUAGxWIwYTKZE6.0q', 'bf4feef2-17f8-404a-ad5c-65a602b4685b', 0 , '0');

insert into shops (name, location, phoneNumber, hours, website, shopOwnerID)
VALUES
('At Home!', '', '', '', '',1),
('kula coffee', 'ATV', '404-543-5742', '6am - 7pm', 'kulacoffee.com', 1),
('taproom coffee', 'kirkwood', '678-111-2345','7am - 10pm', 'taproomcoffee.com', 1);

insert into beanCoffee (name, roastProfile, roasterID, greenCoffeeID)
VALUES
('not actually coffee', 'not roasted', 1,1),
('Rwanda coko-gaju', 'light', 2, 2);

insert into cups (userID, name, dateOrdered, roastDate, cost, brewMethod, coffeeSize, condiments, didLike, flavor, aroma, acidity, sweetness, mouthfeel, comments, score, shopID, beanCoffeeID)
VALUES
(1, 'chai', '2020-01-02', '2020-01-07', '4.5', '', '12oz', 'Almond Milk, Splenda', 'y', 'spicy', 'farts', 'lemon', 'honey', 'milky', 'its a chai, it was fine', 5, 1, 1),
(1, 'brewed coffee', '2019-12-15', '2020-01-07', '2.5', 'Chemex', '12oz', 'none', 'y', 'cocoa', 'cherry', 'blood orange', 'brown sugar', 'silky', 'a little underwhelming. too acidic', 3,1,2);

insert into roasters_shops (roasterID, shopID)
VALUES
(1, 1);

insert into usersLikes(userID, shopID, roasterID, beanCoffeeID)
VALUES
(1, NULL, NULL, 1),
(1,1, NULL, NULL);