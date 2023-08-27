# **Online Billing System - Node.js Server**

A Node.js billing server designed to address the various scenarios encountered during billing processes. This server operates on REST principles, delivering a range of features seamlessly via APIs.

Users can effortlessly create accounts and access exhaustive details of products and services, including their current prices. They can also manage their shopping cart, adding or removing items as needed. Additionally, the server offers a comprehensive billing overview, allowing users to view detailed bills which showcase item prices, quantities, and the corresponding taxes. Confirming orders is a breeze with just a simple click.

Administrators are catered to as well; a specialized API has been integrated to permit them a complete review and handling of all placed orders.

On the technical side, this robust server is developed on the Node.js platform, employs the Express.js framework, and utilizes the MongoDB Cloud for database operations. 

## Table of Contents

- [Features](#features-)
- [Deployment](#deployment-)
- [API Endpoints](#api-endpoints-)
- [Future Updates](#future-updates-)

## **Features:-**

### 1. **User Account Management:**
- **Registration & Login**: Users can easily register, ensuring their data's security with password hashing. They can then log in to access their accounts.
  
- **Secure Logout**: Users can securely log out, ensuring no residue of their session remains.

- **JWT Authentication**: Leveraging JSON Web Tokens (JWT), we've ensured secure and efficient authentication. The tokens are stored as cookies, guaranteeing protected routes and sessions.

### 2. **Administrative Privileges:**
- **Exclusive Access**: We've incorporated a distinct role for administrators, granting them exclusive rights to oversee and manage the platform's core functionalities.
  
- **Product & Service Management**: Administrators have the liberty to introduce new products and services, enhancing the platform's offerings.

- **Order Oversight**: Administrators have a dedicated dashboard allowing them to review and monitor all customer orders.

### 3. **Shopping Experience:**
- **Dynamic Cart**: Users can actively add products and services to their shopping carts, ensuring they have all they need in one place.
  
- **Cart Flexibility**: The system empowers users with full control over their cart. They can update item quantities, remove specific products or services, or even opt to clear the cart entirely.

- **Checkout & Order Confirmation**: With a straightforward checkout process, users can review their total bill (inclusive of tax breakdowns) and securely confirm their orders.

### 4. **Tax Calculation Utility:**
- **Dedicated Tax-Calculator**: We've segregated the tax computation logic into a distinct module. This ensures taxes are applied individually based on the pricing of products and services, guaranteeing accuracy and clarity.


## **Deployment:-**

1. Create a `.env` file in the root directory itself and then paste this in the `.env` file:

2. Once that's done, you will just have to start the server and it will connect to the MongoDB Cloud Database.

3. Now start the server: `npm start`

4. Access the application at `http://localhost:8001`

*NOTE: I've added postman collection in the Postman Collection folder. 

## **API Endpoints:-**

### **1. General:**
- `GET /`: Fetch all items (both products and services) curated and added by the Admin.

### **2. User Management:**
- `POST /users/register`: Register a new user. Required fields include `email`, `password`, and a boolean `isAdmin` property. If the user is already registered, the endpoint will return an error.
  
- `POST /users/login`: Authenticate and log in the user. The system will create a JWT token and store it as a cookie for subsequent sessions and logout purposes. For login, use `email` and `password`.
  
- `GET /users/logout`: Securely log out the user by deleting the JWT token's associated cookie.

### **3. Cart Operations:**
- `GET /carts`: Retrieve the active user's shopping cart.
  
- `POST /carts/product/:productID`: Add a specific product to the cart. You need to send the product's `quantity` in the request body.
  
- `POST /carts/service/:serviceID`: Add a specific service to the cart. Like products, send the service's `quantity` in the request body.
  
- `DELETE /carts/product/:productID`: Remove a specific product from the cart.
  
- `DELETE /carts/service/:serviceID`: Remove a specific service from the cart.
  
- `DELETE /carts`: Completely clear out the user's cart.

- `POST /carts/checkout`: Initiate the checkout process, calculating and presenting the total bill.

- `POST /carts/confirmOrder`: Confirm the cart's contents as a formal order. This order is added to a cumulative list, accessible only by the Admin.

### **4. Order Management (Admin Exclusive):**
- `GET /orders`: Fetch a comprehensive list of all orders made by users. Only accessible by administrators.

### **5. Product & Service Management (Admin Exclusive):**
- `POST /products/add`: Add a new product to the product collection in the database. The request should contain the `product name` and its `price`.

- `POST /services/add`: Similarly, add a new service to the service collection in the database. The request should contain the `service name` and its `price`.
