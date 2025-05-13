
# **Bicycle Garden Server**

![Bicycle Store Banner](https://i.postimg.cc/Vv24FZX6/Frame-6.png)

## **Project Overview**
The **Bicycle Garden Server** is a comprehensive backend system designed to manage bicycle store operations. With this server, users can manage bicycle products, process orders, and handle inventory with ease. The server includes features like product management, order processing, stock adjustments, and revenue calculation to track total sales. Built using **Node.js**, **Express.js**, and **MongoDB**, this server provides a robust and scalable solution for bicycle store management.

## **Server Live URL**
[https://bi-cycle-store-server-one.vercel.app](https://bi-cycle-store-server-one.vercel.app)

✅ Live Site: <https://bicycle-store-client-one.vercel.app>


## **Features**
### **Product Management**
- **Add Products**: Create new bicycle products with details like name, price, brand, and inventory quantity.
- **Update Products**: Modify product details, such as updating the price or inventory.
- **Delete Products**: Remove products from the database.
- **View Products**: Retrieve product details, including current inventory status.

### **Order Management**
- **Place Orders**: Customers can place orders for bicycles, specifying quantity and product details.
- **Track Stock Availability**: Automatically check inventory and prevent orders if there’s insufficient stock.
- **Revenue Calculation**: The server calculates total revenue from orders, utilizing MongoDB aggregation pipelines to sum up the sales amount.

### **Stock Management**
- **Inventory Adjustments**: Inventory is automatically updated after each order placement.
- **Out of Stock**: Products are marked as out of stock when their quantity hits zero.

### **Error Handling**
- The server includes comprehensive error handling with appropriate error messages and HTTP status codes for common issues such as:
  - Insufficient stock for orders
  - Failed product creation or deletion
  - Invalid product or order data

## **API Endpoints**

### **Product Management APIs**
1. **Create Product**
   - **URL**: `/api/products`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "name": "Mountain Bike",
       "price": 500,
       "brand": "BikeCo",
       "inventory": 10
     }
     ```
   - **Description**: Adds a new product to the store.
   - **Response**: 
     ```json
     {
       "success": true,
       "message": "Product created successfully",
       "data": { ...product }
     }
     ```

2. **Get All Products**
   - **URL**: `/api/products`
   - **Method**: `GET`
   - **Description**: Retrieves all products in the store.
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Products retrieved successfully",
       "data": [ ...products ]
     }
     ```

3. **Update Product**
   - **URL**: `/api/products/:productId`
   - **Method**: `PUT`
   - **Body**:
     ```json
     {
       "price": 550,
       "inventory": 8
     }
     ```
   - **Description**: Updates the details of an existing product.
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Product updated successfully",
       "data": { ...updatedProduct }
     }
     ```

4. **Delete Product**
   - **URL**: `/api/products/:productId`
   - **Method**: `DELETE`
   - **Description**: Deletes a product from the store.
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Product deleted successfully"
     }
     ```

### **Order Management APIs**
1. **Place Order**
   - **URL**: `/api/orders`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "productId": "60d0fe4f5311236168a109cf",
       "quantity": 2
     }
     ```
   - **Description**: Places a new order for the specified product and quantity.
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Order placed successfully",
       "data": { ...order }
     }
     ```

2. **Get All Orders**
   - **URL**: `/api/orders`
   - **Method**: `GET`
   - **Description**: Retrieves all orders placed by customers.
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Orders retrieved successfully",
       "data": [ ...orders ]
     }
     ```

3. **Update Order Status**
   - **URL**: `/api/orders/:orderId`
   - **Method**: `PUT`
   - **Body**:
     ```json
     {
       "status": "shipped"
     }
     ```
   - **Description**: Updates the status of an existing order (e.g., mark as shipped).
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Order status updated successfully",
       "data": { ...updatedOrder }
     }
     ```

4. **Calculate Revenue**
   - **URL**: `/api/orders/revenue`
   - **Method**: `GET`
   - **Description**: Calculates the total revenue from all orders.
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Total revenue calculated successfully",
       "revenue": 5000
     }
     ```

## **Technology Stack**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ORM)
- **API Routes**: RESTful API for product and order management
- **Aggregation**: MongoDB aggregation for calculating total revenue from orders

## **How to Set Up**

### **Prerequisites**
Before running this project, ensure you have the following installed:
- **Node.js** (Version >= 14.x)
- **MongoDB** (Locally or cloud-based instance like MongoDB Atlas)

### **Installation**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/bicycle-store-server.git
   cd bicycle-store-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB**:
   - If you are using MongoDB locally, ensure that MongoDB is running.
   - For MongoDB Atlas, replace the database connection string in the `.env` file with your MongoDB Atlas connection string.

4. **Run the server**:
   ```bash
   npm start
   ```

5. The server will be running on [http://localhost:5000](http://localhost:5000).
