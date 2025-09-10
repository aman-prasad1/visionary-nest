# Visionary Nest

Visionary Nest is a full-stack web application designed to showcase portfolios, enable user authentication, and provide an AI-powered chatbot experience. The project is divided into two main parts: backend (Node.js/Express) and frontend (React/TypeScript).

## Features
- User authentication (login/signup)
- Portfolio creation and browsing
- AI-powered chatbot
- Achievement tracking
- Certificate generation
- Responsive UI with modern design

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Vercel
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Other:** Cloudinary (image uploads), ESLint, PostCSS

## Folder Structure
```
visionary-nest/
├── backend/
│   ├── api/
│   ├── public/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── mock/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── store/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── README.md
└── README.md
```

## Setup Instructions

### Backend
1. Navigate to the backend folder:
	```bash
	cd backend
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Configure environment variables (e.g., MongoDB URI, Cloudinary keys).
4. Start the backend server:
	```bash
	npm run dev
	```

### Frontend
1. Navigate to the frontend folder:
	```bash
	cd frontend
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Start the frontend development server:
	```bash
	npm run dev
	```

## Usage
- Access the frontend at `http://localhost:5173` (default Vite port).
- The backend API runs on the configured port (default: 3000).
- Register/login, create portfolios, interact with the chatbot, and explore features.

## Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

## License
This project is licensed under the MIT License.

---
For more details, see the individual README files in the `backend` and `frontend` folders.