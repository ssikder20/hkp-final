# Backend for HKP Final Project
## Libraries Used
* express
* jsonwebtoken
* mongoose
* bcrypt

## Routes

### `/users/login` POST
#### Request
```json
{
  "username": "zebra",
  "password": "pizza"
}
```
#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplYnJhIiwiaWF0IjoxNjAzMzIzMzg4LCJleHAiOjE2MDM0MDk3ODh9.q42BzUhyN3iiQqLCA4NU9OUNILkmcCjcn4rVm80DDcg"
}
```

### `/users/register` POST
#### Request
```json
{
  "username": "zebra",
  "password": "pizza",
  "isAdmin": false
}
```
#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplYnJhIiwiaWF0IjoxNjAzMzIzMzg4LCJleHAiOjE2MDM0MDk3ODh9.q42BzUhyN3iiQqLCA4NU9OUNILkmcCjcn4rVm80DDcg"
}
```
`"isAdmin"` field in request determines whether or not user is an admin

### `/isAdmin` POST
#### Request
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplYnJhIiwiaWF0IjoxNjAzMzIzMzg4LCJleHAiOjE2MDM0MDk3ODh9.q42BzUhyN3iiQqLCA4NU9OUNILkmcCjcn4rVm80DDcg"
}
```
#### Response
```json
{
  "message": false
}
```
If user has admin privileges, this route will return a status code of 200 and `{ "message": true }` otherwise status code of 400 and above response

### `/items/list` POST
#### Request
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplYnJhIiwiaWF0IjoxNjAzMzIzMzg4LCJleHAiOjE2MDM0MDk3ODh9.q42BzUhyN3iiQqLCA4NU9OUNILkmcCjcn4rVm80DDcg"
}
```
#### Response
```json
{
  "items": [
    {
      "_id": "5f8c9eb435070d079eb50edc",
      "name": "apple",
      "description": "apple",
      "quantity": 0,
      "image": "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
      "__v": 0
    },
    {
      "_id": "5f8c9ebc35070d079eb50edd",
      "name": "orange",
      "description": "apple",
      "quantity": 0,
      "image": "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
      "__v": 0
    }
  ]
}
```
Returns a JSON-encoded array of item objects (Note: more than 2 items exist in database, this is just a reference)

### `/items/create` POST
#### Request
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplYnJhIiwiaWF0IjoxNjAzMzIzMzg4LCJleHAiOjE2MDM0MDk3ODh9.q42BzUhyN3iiQqLCA4NU9OUNILkmcCjcn4rVm80DDcg",
  "items": [
    {
      "name": "dapple",
      "description": "apple",
      "quantity": 0,
      "image": "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg"
    },
    {
      "name": "porange",
      "description": "apple",
      "quantity": 0,
      "image": "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg"
    }
  ]
}
```
Note: This route requires a token of a user with admin privileges
#### Response
```json
{
  "message": "Items created."
}
```

### `/cart` POST
#### Request
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplYnJhIiwiaWF0IjoxNjAzMzIzMzg4LCJleHAiOjE2MDM0MDk3ODh9.q42BzUhyN3iiQqLCA4NU9OUNILkmcCjcn4rVm80DDcg"
}
```
#### Response
```json
{
  "items": [
    {
      "_id": "5f9117b8175d3a19357a5189",
      "username": "zebra",
      "name": "bapple",
      "description": "apple",
      "quantity": 1,
      "__v": 0
    },
    {
      "_id": "5f9117b8175d3a19357a518a",
      "username": "zebra",
      "name": "orange",
      "description": "apple",
      "quantity": 1,
      "__v": 0
    }
  ]
}
```

### `/cart/create` POST
#### Request
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplYnJhIiwiaWF0IjoxNjAzMzIzMzg4LCJleHAiOjE2MDM0MDk3ODh9.q42BzUhyN3iiQqLCA4NU9OUNILkmcCjcn4rVm80DDcg",
  "items": [
    {
      "name": "bapple",
      "description": "apple",
      "quantity": 1,
      "image": "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg"
    },
    {
      "name": "orange",
      "description": "apple",
      "quantity": 1,
      "image": "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg"
    }
  ]
}
```
#### Response
```json
{
  "message": "Cart created / modified."
}
```

### `/checkout` POST
#### Request
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplYnJhIiwiaWF0IjoxNjAzMzIzMzg4LCJleHAiOjE2MDM0MDk3ODh9.q42BzUhyN3iiQqLCA4NU9OUNILkmcCjcn4rVm80DDcg",
  "items": [
    {
      "name": "bapple",
      "description": "apple",
      "quantity": 1,
      "image": "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg"
    },
    {
      "name": "orange",
      "description": "apple",
      "quantity": 1,
      "image": "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg"
    }
  ]
}
```
#### Response
```json
{
  "message": "Purchase complete"
}
```
