
How to use Cuppy coffee API

Cuppy coffee API is built on a database of Roasted Coffee, Coffee Shops, Coffee Roasters, Green Coffee, and User reviews of individual cups of coffee from these producers from coffee seed, to coffee cup.

With this API, users will be able to access some in depth information about producers on every step of the supply chain, in an easily usable format.

To start using Cuppy, all users must sign up, using the links above, to aquire an API Key. Currently, each API key is limited to 360 API calls an hour.

Every /API/ URL will return a JSON array or object, but invalid keys, invalid urls, or keys over the call limit will return {error :"error message"}

Any API call for a nonexistient ID will return {}

All API calls should start with /API/<b>APIKey</b>

Information Queries

This group of calls will return ID and name for every item in the database, to be used to build further queries.

/API/<b>API_KEY</b>/shops

Example Data:
[{"id":1,"name":"At Home!"},{"id":2,"name":"kula coffee"},{"id":3,"name":"taproom coffee"}]

Returns ID and name of all coffee shops in the database, as an array of objects.

/API/<b>API_KEY</b>/bean

Example Data:
[{"id":1,"name":"not actually coffee"},{"id":2,"name":"Rwanda coko-gaju"}]

Returns ID and name of all roasted coffee beans in the database, as an array of objects.

/API/<b>API_KEY</b>/roasters

Example Data:
[{"id":1,"name":"Not roasted cofee"},{"id":2,"name":"Kula coffee roasters"}]

Returns ID and name of all coffee roasters in the database, as an array of objects.

/API/<b>API_KEY</b>/green

Example Data:
[{"id":1,"name":"Not actually coffee"},{"id":2,"name":"Finca La Gaju"}]

Returns ID and name of all green, unroasted coffees in the database, as an array of objects.

Search Queries

This group of calls will return all the information about a particular item in the database.

/API/<b>API_KEY</b>/shops/<b>ID</b>

Example Data:
{"id":2,"name":"kula coffee","location":"ATV","phonenumber":"404-543-5742","hours":"6am - 7pm","website":"kulacoffee.com","featuredRoasters":["Not roasted cofee"],"averageScore":4}

Returns full information about given shop ID.
    - ID
    - name
    - location
    - phone number
    - hours of operation
    - website
    - all roasters used, as an array. (generated from reviewed cups. every cup review includes a shop and a roasted coffee, and thats how this information is generated.)
    - average score of every cup reviewed from this shop. (generated from shopID associated with each cup)

/API/<b>API_KEY</b>/bean/<b>ID</b>

Example Data:
{"id":2,"name":"Rwanda coko-gaju","roastprofile":"light","roaster":"Kula coffee roasters","greenname":"Finca La Gaju","countryoforigin":"Rwanda","regionoforigin":"Coko-Gaju","farm":"finca la Gaju","farmer":"Farmer Joe","elevation":1800,"varietal":"bourbon","processingstyle":"washed","averageScore":3}

Returns full information about given roasted coffee ID.
    - ID
    - name
    - roast profile
    - roaster (pulled from roasterID)
    - green coffee information (pulled from greenID)
        - green coffee name
        - country of origin
        - region of origin
        - farm
        - farmer
        - elevation (in Meters above Sea Level (MASL) as an integer)
        - varietal
        - processing style
    - average score of every cup reviewed from this roasted coffee. (generated from shopID associated with each cup)

/API/<b>API_KEY</b>/roasters/<b>ID</b>

Example Data :
{"id":2,"name":"Kula coffee roasters","location":"ATV","phonenumber":"404-111-9876","website":"kulacoffee.com","atshops":["At Home!", "kula coffee"],"averageScore":3}

Returns full information about given coffee roaster ID.
    - ID
    - name
    - location
    - phone number
    - website
    - shops where this roasters coffee has been reviewed. (generated from reviewed cups. every cup review includes a shop and a roasted coffee, and thats how this information is generated.)
    - average score of every cup reviewed from this roaster. (generated from shopID associated with each cup)

/API/<b>API_KEY</b>/green/<b>ID</b>

Example Data:
{"id":2,"name":"Finca La Gaju","countryoforigin":"Rwanda","regionoforigin":"Coko-Gaju","farm":"finca la Gaju","farmer":"Farmer Joe","elevation":1800,"varietal":"bourbon","processingstyle":"washed"}

Returns full information about given green coffee.
    - ID
    - name
    - country of Origin
    - Region of Origin
    - Farm
    - Farmer
    - elevation (in Meters above Sea Level (MASL) as an integer)
    - varietal
    - processing style

User Specific Queries.

This group of calls will return information about reviewed cups of coffee, but it is limited to only cups reviewed by the user associated with the API Key used to make the call.

/API/<b>API_KEY</b>/cups/
 
example data:
[{"id":1,"name":"chai"},{"id":2,"name":"brewed coffee"}]

Returns ID and name for all cups reviewed by the user associated with the API Key used.

/API/<b>API_KEY</b>/cups/<b>ID</b>

example data:
{"id":2,"name":"brewed coffee","dateordered":"2020-01-15","roastdate":"2020-01-07","cost":"2.5","brewmethod":"Chemex","coffeesize":"12oz","condiments":"cream and sugar","didlike":"y","flavor":"cocoa","aroma":"cherry","acidity":"blood orange","sweetness":"brown sugar","mouthfeel":"silky","comments":"really tasty!!","score":8,"shopname":"Kula Coffee","roastprofile":"light","roaster":"Kula coffee roasters","greenname":"Finca La Gaju","countryoforigin":"Rwanda","regionoforigin":"Coko-Gaju","farm":"finca la Gaju","farmer":"Farmer Joe","elevation":1800,"varietal":"bourbon","processingstyle":"washed","beanname":"Rwanda coko-gaju"}

Returns full information about given cup ID, if cup access is authorized by API Key.
    - ID
    - Name
    - Date ordered
    - Date roasted
    - Cost
    - Brew Method
    - Coffee Size
    - Condiments
    - Did like?
    - Flavor
    - Aroma
    - Acidity
    - Sweetness
    - Mouthfeel
    - User comments
    - User review score
    - Shop name(pulled from ShopID)
    - Roasted coffee information (Pulled from CoffeeBeanID)
        - Bean Name
        - Roast Profile
        - Roaster name (pulled from RoasterID)
        - Green Coffee information (Pulled from GreenID)
            - Green coffee name
            - Country of Origin
            - Region of Origin
            - Farm
            - Farmer
            - elevation (in Meters above Sea Level (MASL) as an integer)
            - varietal
            - processing style