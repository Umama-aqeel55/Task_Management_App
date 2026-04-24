# TaskFlow — Premium Agentic Task Management App

TaskFlow is a state-of-the-art task management application designed with a premium "Agentic" aesthetic. It features a futuristic dark-mode UI, real-time data synchronization with Firebase, and a seamless drag-and-drop experience for project management.

## ✨ Features

-   **Premium "Deep Space" UI**: Futuristic design with glassmorphism, smooth gradients, and micro-animations.
-   **Real-time Synchronization**: Powered by Firebase Firestore for instant updates across all devices.
-   **Google Authentication**: Secure and fast login using Google Auth.
-   **Interactive Kanban Board**: Fully functional drag-and-drop task management using `@dnd-kit`.
-   **Full CRUD Operations**: Add, Edit, Move, and Delete tasks with real-time persistence.
-   **Responsive Design**: Optimized for mobile, tablet, and desktop views.
-   **Activity & Analytics**: Interactive dashboard with task statistics and project overview.

## 🚀 Tech Stack

-   **Frontend**: React.js (Vite)
-   **Styling**: Tailwind CSS, Lucide React (Icons)
-   **Animations**: Framer Motion
-   **Backend/Database**: Firebase Firestore (Real-time NoSQL)
-   **Authentication**: Firebase Auth (Google Provider)
-   **State Management**: React Context API
-   **Drag & Drop**: @dnd-kit

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Umama-aqeel55/Task_Management_App.git
    cd Task_Management_App
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Firebase:**
    Create a `.env` file in the root directory and add your Firebase credentials:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_DATABASE_URL=your_database_url
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev:client
    ```
    The app will be available at `http://localhost:5000`.

## 🌐 Deployment (Vercel)

The project is pre-configured for Vercel deployment.
1.  Connect your GitHub repository to Vercel.
2.  Add the environment variables from your `.env` file to the Vercel Project Settings.
3.  Vercel will automatically build and deploy the project using the provided `vercel.json` configuration.

## 📄 License

This project is licensed under the MIT License.

---
Built with ❤️ by [Umama Aqeel](https://github.com/Umama-aqeel55)
