# Express API Server

This is an Express-based Node.js API server that handles user authentication, product management, category and subcategory operations, and address management. The server includes user registration, login, account validation, and token-based authentication.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features

- **User Authentication:** Registration, login, and logout functionalities.
- **Account Activation:** Email-based account validation.
- **Token Management:** Access and refresh tokens for secure sessions.
- **Middleware:** Role-based access control (e.g., admin routes).
- **Error Handling:** Centralized error handling middleware.
- **CRUD Operations:** Support for managing users, products, categories, subcategories, and addresses.

---

# API Endpoints & Postman API Testing

This document outlines the available API endpoints and their respective use cases. It also provides instructions for testing these endpoints using Postman.

---

## API Endpoints

### User Routes

| Method | Endpoint                  | Description                                   | Authentication |
|--------|---------------------------|-----------------------------------------------|----------------|
| POST   | `/api/v1/user/register`   | Register a new user                          | No             |
| POST   | `/api/v1/user/login`      | Log in a user and generate tokens            | No             |
| POST   | `/api/v1/user/logout`     | Log out a user                               | Yes            |
| GET    | `/api/v1/user/activeuser/:id` | Activate a user account via email link      | No             |
| POST   | `/api/v1/user/alluser`    | View all registered users (Admin only)       | Yes            |

---

## Postman API Testing

### User Routes

#### 1. **Register User**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/v1/user/register`
   - **Headers:**
     - Content-Type: `application/json`
   - **Body (JSON):**
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Expected Response:**
     - Status: `201 Created`
     - Body:
       ```json
       {
         "data": {
           "_id": "user_id",
           "name": "John Doe",
           "email": "john@example.com"
         },
         "success": true,
         "error": false
       }
       ```

#### 2. **Login User**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/v1/user/login`
   - **Headers:**
     - Content-Type: `application/json`
   - **Body (JSON):**
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "message": "Login in successful",
         "success": true,
         "error": false,
         "accessToken": "Bearer token_here",
         "refreshToken": "Bearer token_here"
       }
       ```

#### 3. **Activate User**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/v1/user/activeuser/:id`
     - Replace `:id` with the user ID received after registration.
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "message": "active successful",
         "success": true,
         "error": false
       }
       ```

#### 4. **Logout User**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/v1/user/logout`
   - **Headers:**
     - Content-Type: `application/json`
     - Cookies: `accessToken` and `refreshToken` from login.
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "message": "Logout successful",
         "success": true,
         "error": false
       }
       ```

#### 5. **View All Users (Admin Only)**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/v1/user/alluser`
   - **Headers:**
     - Content-Type: `application/json`
     - Authorization: `Bearer admin_token_here`
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "totaluser": 10,
         "user": [
           { "_id": "user1", "name": "User One", "email": "user1@example.com" },
           { "_id": "user2", "name": "User Two", "email": "user2@example.com" }
         ],
         "success": true,
         "error": false
       }
       ```

---

# Product API Endpoints & Postman API Testing

This section outlines the available **Product API** endpoints for managing products in the application, along with instructions for testing using Postman.

---

## Product API Endpoints

| Method | Endpoint             | Description                                    | Authentication |
|--------|-----------------------|------------------------------------------------|----------------|
| GET    | `/api/v1/product`     | Get all products                               | No             |
| GET    | `/api/v1/product/:id` | Get a single product by its ID                 | No             |
| POST   | `/api/v1/product`     | Create a new product                           | Admin, Login   |
| DELETE | `/api/v1/product/:id` | Delete a product by its ID                     | Admin, Login   |

---

## Postman API Testing

### 1. **Get All Products**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/v1/product`
   - **Headers:** _None_
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "product": [
           {
             "_id": "product_id",
             "name": "Product Name",
             "categoryId": "category_id",
             "sub_categoryId": "sub_category_id",
             "unit": "kg",
             "stock": 50,
             "price": 100,
             "discount": 10,
             "description": "Product description here",
             "image": ["image1.jpg", "image2.jpg"]
           }
         ],
         "success": true,
         "error": false
       }
       ```

---

### 2. **Get a Single Product**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/v1/product/:id`
     - Replace `:id` with the product's unique ID.
   - **Headers:** _None_
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "product": {
           "_id": "product_id",
           "name": "Product Name",
           "categoryId": "category_id",
           "sub_categoryId": "sub_category_id",
           "unit": "kg",
           "stock": 50,
           "price": 100,
           "discount": 10,
           "description": "Product description here",
           "image": ["image1.jpg", "image2.jpg"]
         },
         "success": true,
         "error": false
       }
       ```

---

### 3. **Create a Product**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/v1/product`
   - **Headers:**
     - Content-Type: `multipart/form-data`
     - Authorization: `Bearer admin_token_here`
   - **Body (Form-Data):**
     - `name` (String): e.g., `Apple`
     - `categoryId` (String): Category ID
     - `sub_categoryId` (String): Subcategory ID
     - `unit` (String): e.g., `kg`
     - `stock` (Number): e.g., `100`
     - `price` (Number): e.g., `150`
     - `discount` (Number, Optional): e.g., `10`
     - `description` (String, Optional): e.g., `Fresh apples`
     - `more_details` (JSON, Optional): e.g., `{"color": "red"}`
     - `publish` (Boolean): e.g., `true`
     - `files` (File): Upload product images.
   - **Expected Response:**
     - Status: `201 Created`
     - Body:
       ```json
       {
         "savedProduct": {
           "_id": "product_id",
           "name": "Apple",
           "categoryId": "category_id",
           "sub_categoryId": "sub_category_id",
           "unit": "kg",
           "stock": 100,
           "price": 150,
           "discount": 10,
           "description": "Fresh apples",
           "image": ["apple1.jpg", "apple2.jpg"]
         },
         "success": true,
         "error": false
       }
       ```

---

### 4. **Delete a Product**
   - **Method:** `DELETE`
   - **URL:** `http://localhost:5000/api/v1/product/:id`
     - Replace `:id` with the product's unique ID.
   - **Headers:**
     - Authorization: `Bearer admin_token_here`
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "message": "delete successful",
         "success": true,
         "error": false
       }
       ```

---


# Category API Endpoints & Postman API Testing

This section documents the **Category API** for managing categories in the application, including the routes, methods, and Postman testing instructions.

---

## Category API Endpoints

| Method | Endpoint             | Description                          | Authentication |
|--------|-----------------------|--------------------------------------|----------------|
| GET    | `/api/v1/category`    | Retrieve all categories              | No             |
| GET    | `/api/v1/category/:id`| Retrieve a single category by its ID | No             |
| POST   | `/api/v1/category`    | Create a new category                | Admin, Login   |
| DELETE | `/api/v1/category/:id`| Delete a category by its ID          | Admin, Login   |

---

## Postman API Testing

### 1. **Get All Categories**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/v1/category`
   - **Headers:** _None_
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "category": [
           {
             "_id": "category_id",
             "name": "Category Name",
             "image": "image.jpg"
           }
         ],
         "success": true,
         "error": false
       }
       ```

---

### 2. **Get a Single Category**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/v1/category/:id`
     - Replace `:id` with the category's unique ID.
   - **Headers:** _None_
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "category": {
           "_id": "category_id",
           "name": "Category Name",
           "image": "image.jpg"
         },
         "success": true,
         "error": false
       }
       ```

---

### 3. **Create a Category**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/v1/category`
   - **Headers:**
     - Content-Type: `multipart/form-data`
     - Authorization: `Bearer admin_token_here`
   - **Body (Form-Data):**
     - `name` (String): e.g., `Electronics`
     - `files` (File): Upload an image for the category.
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "category": {
           "_id": "category_id",
           "name": "Electronics",
           "image": "electronics.jpg"
         },
         "success": true,
         "error": false
       }
       ```

---

### 4. **Delete a Category**
   - **Method:** `DELETE`
   - **URL:** `http://localhost:5000/api/v1/category/:id`
     - Replace `:id` with the category's unique ID.
   - **Headers:**
     - Authorization: `Bearer admin_token_here`
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "message": "Category delete Successful",
         "success": true,
         "error": false
       }
       ```

---


# SubCategory API Endpoints & Postman API Testing

This documentation provides details about the **SubCategory API**, including available routes, their purposes, and how to test them using Postman.

---

## SubCategory API Endpoints

| Method | Endpoint                | Description                               | Authentication |
|--------|--------------------------|-------------------------------------------|----------------|
| GET    | `/api/v1/subcategory`    | Retrieve all subcategories                | No             |
| GET    | `/api/v1/subcategory/:id`| Retrieve a single subcategory by its ID   | No             |
| POST   | `/api/v1/subcategory`    | Create a new subcategory                  | Admin, Login   |
| DELETE | `/api/v1/subcategory/:id`| Delete a subcategory by its ID            | Admin, Login   |

---

## Postman API Testing

### 1. **Get All Subcategories**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/v1/subcategory`
   - **Headers:** _None_
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "subcategory": [
           {
             "_id": "subcategory_id",
             "name": "SubCategory Name",
             "image": "image.jpg",
             "categoryId": {
               "id": "category_id",
             }
           }
         ],
         "success": true,
         "error": false
       }
       ```

---

### 2. **Get a Single SubCategory**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/v1/subcategory/:id`
     - Replace `:id` with the subcategory's unique ID.
   - **Headers:** _None_
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "subcategory": {
           "_id": "subcategory_id",
           "name": "SubCategory Name",
           "image": "image.jpg",
           "categoryId": {
             "_id": "category_id",
             "name": "Category Name"
           }
         },
         "success": true,
         "error": false
       }
       ```

---

### 3. **Create a SubCategory**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/v1/subcategory`
   - **Headers:**
     - Content-Type: `multipart/form-data`
     - Authorization: `Bearer admin_token_here`
   - **Body (Form-Data):**
     - `name` (String): e.g., `Smartphones`
     - `files` (File): Upload an image for the subcategory.
     - `categoryId` (String): The ID of the parent category.
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "subcategory": {
           "_id": "subcategory_id",
           "name": "Smartphones",
           "image": "smartphones.jpg",
           "categoryId": "category_id"
         },
         "success": true,
         "error": false
       }
       ```

---

### 4. **Delete a SubCategory**
   - **Method:** `DELETE`
   - **URL:** `http://localhost:5000/api/v1/subcategory/:id`
     - Replace `:id` with the subcategory's unique ID.
   - **Headers:**
     - Authorization: `Bearer admin_token_here`
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "message": "SubCategory delete Successful",
         "success": true,
         "error": false
       }
       ```

---


# Address API Endpoints & Postman API Testing

This documentation provides details about the **Address API**, including available routes, their purposes, and how to test them using Postman.

---

## Address API Endpoints

| Method | Endpoint           | Description                     | Authentication |
|--------|---------------------|---------------------------------|----------------|
| GET    | `/api/v1/address`   | Retrieve all addresses          | User Login     |
| POST   | `/api/v1/address`   | Create a new address            | User Login     |
| DELETE | `/api/v1/address/:id` | Delete an address by its ID     | Admin, Login   |

---

## Postman API Testing

### 1. **Get All Addresses**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/v1/address`
   - **Headers:**
     - Authorization: `Bearer user_token_here`
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "address": [
           {
             "_id": "address_id",
             "address_line": "123 Main St",
             "city": "CityName",
             "state": "StateName",
             "pincode": "123456",
             "country": "CountryName",
             "mobile": "1234567890",
             "author": {
               "_id": "user_id",
               "name": "User Name",
               "email": "user@example.com"
             }
           }
         ],
         "success": true,
         "error": false
       }
       ```

---

### 2. **Create an Address**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/v1/address`
   - **Headers:**
     - Content-Type: `application/json`
     - Authorization: `Bearer user_token_here`
   - **Body (JSON):**
     ```json
     {
       "address_line": "123 Main St",
       "city": "CityName",
       "state": "StateName",
       "pincode": "123456",
       "country": "CountryName",
       "mobile": "1234567890"
     }
     ```
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "result": {
           "_id": "address_id",
           "address_line": "123 Main St",
           "city": "CityName",
           "state": "StateName",
           "pincode": "123456",
           "country": "CountryName",
           "mobile": "1234567890",
           "author": "user_id"
         },
         "success": true,
         "error": false
       }
       ```

---

### 3. **Delete an Address**
   - **Method:** `DELETE`
   - **URL:** `http://localhost:5000/api/v1/address/:id`
     - Replace `:id` with the address's unique ID.
   - **Headers:**
     - Authorization: `Bearer admin_token_here`
   - **Expected Response:**
     - Status: `200 OK`
     - Body:
       ```json
       {
         "message": "Address deleted successfully",
         "success": true,
         "error": false
       }
       ```

---





