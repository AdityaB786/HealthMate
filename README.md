# HealthMate - MERN Stack Project

**HealthMate** is a web application designed to assist users with managing their health. It allows users to view available doctors, schedule appointments, manage notifications, and interact with a chatbot powered by OpenAI's GPT-3 to answer health-related questions. 

This application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrates with OpenAI's API to provide real-time assistance to users.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Home Page**: Overview of the application with quick access to important features.
- **Doctors**: Browse a list of available doctors and view their details, specialties, and availability.
- **Appointments**: Schedule appointments with doctors and view upcoming and past appointments.
- **Notifications**: Receive notifications about upcoming appointments and health-related updates.
- **Apply for Doctor**: Allows medical professionals to apply to join the platform and offer consultations.
- **Contact Us**: A form where users can reach out for support or inquiries.
- **Profile Management**: Users can update their personal information, view health records, and manage account settings.
- **ChatGPT Integration**: A chatbot powered by OpenAI's GPT-3 that answers user queries related to health, fitness, and general wellness.

---

## Technologies Used

- **Frontend**: React.js, Axios, React Router, CSS/SCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: OpenAI API (ChatGPT)
- **Deployment**: onrender

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS version)
- **MongoDB** (locally or use MongoDB Atlas for cloud-based database)
- **Git** (for version control)
- **OpenAI API key** for ChatGPT functionality

### Installation Steps

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/healthmate.git
cd healthmate
```

2. **Install dependencies for the backend**:

```bash
cd backend
npm install
```

3. **Install dependencies for the frontend**:

```bash
cd ../frontend
npm install
```

4. **Set up environment variables**:

Create a `.env` file in both the **backend** and **frontend** folders and add the following:

**Backend:**
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

**Frontend:**
```env
REACT_APP_API_URL=http://localhost:8000
```

5. **Run the project locally**:

- Start the backend server:

```bash
cd backend
node ./server
```

- Start the frontend development server:

```bash
cd frontend
npm start
```

The app should now be running on `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

---

## Project Structure

```
/healthmate
  /backend
    /models
    /routes
    /controllers
    /services
    server.js
    .env
  /frontend
    /src
      /components
      /pages
      /context
      /services
      App.js
      index.js
    .env
  README.md
```

- `/backend`: Contains the Express.js server, MongoDB models, API routes, and logic for ChatGPT integration.
- `/frontend`: Contains the React.js app, components, pages, and state management.
- `server.js`: Entry point for the Node.js server.

---

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login to an existing account and get a JWT token.

### Doctors

- **GET /api/doctors**: Get a list of all doctors available on the platform.
- **GET /api/doctors/:id**: Get details about a specific doctor (specialty, availability, etc.).

### Appointments

- **POST /api/appointments**: Schedule a new appointment with a doctor.
- **GET /api/appointments**: View a list of the logged-in user's upcoming and past appointments.

### Notifications

- **GET /api/notifications**: View all notifications for the logged-in user (appointment reminders, health tips, etc.).

### ChatGPT Integration

- **POST /api/chatgpt/query**: Send a health-related query to the ChatGPT API and receive a response.
    - **Body**:
    ```json
    {
      "query": "What is the best way to lose weight?"
    }
    ```
    - **Response**:
    ```json
    {
      "answer": "Losing weight involves a combination of healthy eating, regular physical activity, and consistent sleep patterns. Start with manageable goals..."
    }
    ```

### Apply for Doctor

- **POST /api/doctors/apply**: Submit an application to become a doctor on the platform (requires relevant medical credentials).

### Contact Us

- **POST /api/contact**: Submit a query or feedback to the support team.

### User Profile

- **GET /api/user**: Get the logged-in user's profile information.
- **PUT /api/user**: Update the logged-in user's profile information (e.g., name, contact info).

---

