# Mini Order Management System

A full-stack Order Management System built using the MERN stack with JWT authentication, role-based access control, product management, shopping cart, order management, Razorpay Test Mode payment integration, Docker, and AWS ECS/Fargate deployment.

## Live Application

http://order-management-alb-634576318.ap-southeast-2.elb.amazonaws.com

## Technology Stack

### Frontend
- React.js
- React Router
- Axios
- Context API
- Vite
- Nginx

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Payment
- Razorpay Test Mode

### DevOps / Deployment
- Docker
- Docker Compose
- Amazon ECR
- Amazon ECS
- AWS Fargate
- Application Load Balancer

## Features

### Authentication & Authorization
- User registration
- User login
- JWT authentication
- HTTP-only authentication cookie
- Logout
- Protected routes
- Role-Based Access Control
- Admin and Customer roles

### Admin
- Admin dashboard
- Add products
- Edit products
- Delete products
- View products
- View all orders
- Update order status

### Customer
- Browse products
- Search products
- Filter products by category
- View product details
- Add products to cart
- Increase/decrease cart quantity
- Remove products from cart
- View cart total
- Checkout
- Razorpay Test Mode payment
- View own orders
- Customer dashboard

### Order Management

Supported order statuses:

- Pending
- Confirmed
- Processing
- Shipped
- Delivered
- Cancelled

## Project Structure

```text
mini_order_management/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
