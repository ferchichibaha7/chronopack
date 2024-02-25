#### Endpoint
```http
POST api/auth/signup
```
#### Request
```javascript
{
  "name" : string,
  "password" : string
}
```
#### Response
```javascript
{
  "message": "User Registered"
}
```
 
-------------------------------
#### Endpoint
```http
POST api/auth/login
```
#### Request
```javascript
{
  "name" : string,
  "password" : string
}
```
#### Response
```javascript
{
   "token": string
}
```
 
-------------------------------
#### Endpoint
```http
GET api/auth/current
```
#### Header
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `authorization` | `string` | **Required**. Your API key |
#### Response
```javascript
{
    "message": "User retrieved",
    "result": "current user"
}
```
 
-------------------------------
