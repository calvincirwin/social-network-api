## **Social Network API**

### **Description**

This is a backend API for a social networking application. It allows users to:

- Create, read, update, and delete users
- Post, update, and delete thoughts
- Add and remove reactions to thoughts
- Manage friends (add/remove friends)

Built using:

- Node.js
- Express.js
- MongoDB & Mongoose ODM
* * *

### **Installation**

1. **Clone the repository**
    
        bash
    
    CopyEdit
    
    git clone https://github.com/calvincirwin/social-network-api.git
    cd social-network-api
    

2. **Install dependencies**
    
        bash
    
    CopyEdit
    
    npm install
    

3. **Start the server**
    
        bash
    
    CopyEdit
    
    npm run dev
    

The API will run on `http://localhost:3001`.

* * *

### **API Routes**

#### **Users**

| Method | Endpoint | Description | 
| ---- | ---- | ----  |
| GET | `/api/users` | Get all users | 
| GET | `/api/users/:userId` | Get a single user by ID | 
| POST | `/api/users` | Create a new user | 
| PUT | `/api/users/:userId` | Update user details | 
| DELETE | `/api/users/:userId` | Delete a user | 
| POST | `/api/users/:userId/friends/:friendId` | Add a friend | 
| DELETE | `/api/users/:userId/friends/:friendId` | Remove a friend | 

#### **Thoughts**

| Method | Endpoint | Description | 
| ---- | ---- | ----  |
| GET | `/api/thoughts` | Get all thoughts | 
| GET | `/api/thoughts/:thoughtId` | Get a single thought | 
| POST | `/api/thoughts` | Create a new thought | 
| PUT | `/api/thoughts/:thoughtId` | Update a thought | 
| DELETE | `/api/thoughts/:thoughtId` | Delete a thought | 

#### **Reactions**

| Method | Endpoint | Description | 
| ---- | ---- | ----  |
| POST | `/api/thoughts/:thoughtId/reactions` | Add a reaction | 
| DELETE | `/api/thoughts/:thoughtId/reactions/:reactionId` | Remove a reaction | 

* * *

### **Technologies Used**

- Node.js - Backend runtime
- Express.js - Web framework for routing
- MongoDB - NoSQL database
- Mongoose - ODM for MongoDB
- Nodemon - Auto-restart during development
* * *

### **License**

This project is licensed under the MIT License.

* * *

### **Questions?**

If you have any questions, feel free to reach out:

- **GitHub**: [calvincirwin](https://github.com/calvincirwin)
- **Email**: calvincirwin@gmail.com