

# what do we need to make? 
- front end
- backend 

## Backend
- models
- Controllers
- DB tables
- server
- views

### Models
- {Each table of the data base}

### Controllers
- Each page of the front end
- Each form for the baackend

### DB Tables
## Cups
    - id
    - name
    - date
    - didlike
    - tasting notes
        - flavor
        - aroma
        - acidity
        - sweetness
        - mouth feel
    - Presentation
        - brew method
        - size
        - condiments
    - (has a) Shop brewed at
    - (has a) retail coffee brewed 
    - cost
    - (has a) user
    - 

## Shops
    - id
    - name
    - location
    - roasters used
    - phone number 
    - hours
    - website
    - business info
    - 

## Retail coffee (roasted coffee in a bag you can buy in a store)
    - id
    - (has a) roaster
    - (has a) green coffee
    - roast date
    - roast profile (light, dark, etc)
    - 

## Roaster
    - id 
    - name
    - location
    - phone number 
    - website
    - business info
    - 

## Green Coffee
    - country of origin
    - region of origin
    - farm 
    - farmer
    - elevation
    - varietal
    - proccessing style
    - 

## User
    - id
    - unique username
    - name
    - email
    - phone
    - password/hash
    - shops liked
    - roasters liked
    - retail coffees 
    - cups reviewed ids
    - 


## 

# what does it need to do?
-api

-add new cup
-add new retailcoffee
-add new roaster
-add new green coffee
-add new shop
-view your likes (all em)
-view coffees you've had
-view greencoffees 
- { view whatever table }
-

shops.html

roasters.html

beans.html

recentreviews.html

change Login to Profile if user logged in.
add logout link to profile page.



