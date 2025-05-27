# 🗓️ Appointment Scheduler – MERN Stack App

A full-stack appointment scheduling application with user authentication, calendar integration, conflict detection, and a responsive UI. Built using the MERN stack (MongoDB, Express, React, Node.js).

## 📁 Project Structure

```
appointment-scheduler/
├── backend/       # Node.js + Express + MongoDB + JWT
├── frontend/      # React (Vite) + Tailwind CSS
└── README.md
```

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas)
- npm

### ⚙️ Backend Setup

1. Navigate to the backend folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

### 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/appointments
JWT_SECRET=your_jwt_secret
```

### ▶ Start the Backend Server

```bash
npm run dev
```

Backend runs on: [http://localhost:5000](http://localhost:5000)

### 🎨 Frontend Setup

1. Navigate to the frontend folder and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

### ⚙️ Configure Vite Proxy (Optional)

To forward API requests to the backend, update `vite.config.js`:

```javascript
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};
```

### ▶ Start the Frontend Server

```bash
npm run dev
```

Frontend runs on: [http://localhost:5173](http://localhost:5173)

### 💡 Run Both Frontend & Backend Together (Optional)

#### Step 1: Install concurrently

From the project root:

```bash
npm install concurrently --save-dev
```

#### Step 2: Add Root package.json Scripts

Create or update your root `package.json`:

```json
{
  "name": "appointment-scheduler",
  "version": "1.0.0",
  "scripts": {
    "client": "cd frontend && npm run dev",
    "server": "cd backend && npm run dev",
    "start": "concurrently \"npm run server\" \"npm run client\""
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

#### Step 3: Start Both Servers

```bash
npm start
```

## 📡 API Endpoints

### Authentication

- **POST** `/api/auth/signup` – User registration
- **POST** `/api/auth/login` – User login

### Appointments

- **GET** `/api/appointments` – List user appointments
- **POST** `/api/appointments` – Create new appointment
- **PUT** `/api/appointments/:id` – Update appointment
- **DELETE** `/api/appointments/:id` – Delete appointment

## ✨ Features

- ✅ Secure user registration & login (JWT Auth)
- 🗓 Appointment creation, editing, deletion
- ⚠️ Conflict detection for overlapping slots
- 📆 Calendar UI with optional drag-and-drop
- 🔔 Toast notifications (frontend feedback)
- 📱 Fully responsive UI (Tailwind CSS)

## 🛠 Tech Stack

| Layer      | Technology                      |
|------------|---------------------------------|
| Frontend   | React, Vite, TailwindCSS        |
| Backend    | Node.js, Express.js, Typescript |
| Database   | MongoDB (via Mongoose)         |
| Auth       | JWT, bcrypt                     |
| Tooling    | concurrently, dotenv, nodemon   |

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Made with 💙 by Jyoti Prakash Panigrahi
```

Feel free to modify any sections as needed to better fit your project or personal preferences!
### YOU
i want once full read me 
### BLACKBOX.AI

```markdown
# 🗓️ Appointment Scheduler – MERN Stack App

A full-stack appointment scheduling application with user authentication, calendar integration, conflict detection, and a responsive UI. Built using the MERN stack (MongoDB, Express, React, Node.js).

## 📁 Project Structure

```
appointment-scheduler/
├── backend/       # Node.js + Express + MongoDB + JWT
├── frontend/      # React (Vite) + Tailwind CSS
└── README.md
```

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas)
- npm

### ⚙️ Backend Setup

1. Navigate to the backend folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in the `backend/` directory with the following content:

   ```ini
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/appointments
   JWT_SECRET=your_jwt_secret
   ```

3. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend runs at: [http://localhost:5000](http://localhost:5000)

### 🎨 Frontend Setup

1. Navigate to the frontend folder and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

2. (Optional) Configure Vite proxy for API requests by editing `vite.config.js`:

   ```js
   export default {
     server: {
       proxy: {
         '/api': 'http://localhost:5000',
       },
     },
   };
   ```

3. Start the frontend server:

   ```bash
   npm run dev
   ```

   The frontend runs at: [http://localhost:5173](http://localhost:5173)

### 💡 Running Frontend & Backend Together

1. From the project root, install `concurrently`:

   ```bash
   npm install concurrently --save-dev
   ```

2. Update or create the root `package.json` with these scripts:

   ```json
   {
     "name": "appointment-scheduler",
     "version": "1.0.0",
     "scripts": {
       "client": "cd frontend && npm run dev",
       "server": "cd backend && npm run dev",
       "start": "concurrently \"npm run server\" \"npm run client\""
     },
     "devDependencies": {
       "concurrently": "^8.2.0"
     }
   }
   ```

3. Start both servers together:

   ```bash
   npm start
   ```

## 📡 API Endpoints

### Authentication

- **POST** `/api/auth/signup` – User registration
- **POST** `/api/auth/login` – User login

### Appointments

- **GET** `/api/appointments` – List user appointments
- **POST** `/api/appointments` – Create a new appointment
- **PUT** `/api/appointments/:id` – Update an appointment
- **DELETE** `/api/appointments/:id` – Delete an appointment

## ✨ Features

- Secure user registration & login (JWT Authentication)
- Appointment creation, editing, and deletion
- Conflict detection for overlapping appointment slots
- Calendar UI with optional drag-and-drop support
- Toast notifications for user feedback on frontend
- Fully responsive UI designed with Tailwind CSS

## 🛠 Tech Stack

| Layer    | Technology                     |
| -------- | ----------------------------- |
| Frontend | React, Vite, TailwindCSS       |
| Backend  | Node.js, Express.js, TypeScript|
| Database | MongoDB via Mongoose           |
| Auth     | JWT, bcrypt                   |
| Tools    | concurrently, dotenv, nodemon |

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Made with 💙 by Jyoti Prakash Panigrahi


