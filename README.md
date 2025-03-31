🌦️ Weather-Integrated Todo App
A smart task manager that shows weather conditions for outdoor activities

App Preview
![Screenshot 2025-04-01 024139](https://github.com/user-attachments/assets/4d6ee881-dd9b-4bb8-a7e5-6a4b8dbba634)


📌 Table of Contents
Features

Tech Stack

Setup Guide

Running Locally

Deployment

Troubleshooting

Folder Structure

✨ Features
1. Smart Todo Management
Add tasks with priorities (🔥 High / ⚡ Medium / 📌 Low)

Edit, delete, or mark tasks as complete

Persistent storage using localStorage

Todo List

2. Weather Integration
Automatically detects outdoor tasks (e.g., "Walk in the park")

Fetches real-time weather data (temperature, humidity, conditions)

Shows weather alerts for location-based tasks

Weather Integration

3. User Authentication
Login/Signup flow (mock implementation)

Protected routes for authenticated users


🛠️ Tech Stack
Category	Technology
Frontend	React 18 + Vite
State Management	Redux Toolkit
Styling	Tailwind CSS
API	OpenWeatherMap
Deployment	Netlify






🐛 Troubleshooting
Issue	Solution
Weather API not working	Verify API key + wait 2 hours for activation
Invalid MIME type error	
Build fails on Netlify	Clear build cache + check case sensitivity
📂 Folder Structure
bash
Copy
src/
├── components/          # UI Components
│   ├── TodoForm.jsx     # Task input form
│   └── TodoItem.jsx     # Single todo card
├── slices/              # Redux state
│   └── weatherSlice.js  # Weather API logic
├── contexts/            # React contexts
├── App.jsx              # Root component
└── main.jsx             # Entry point
📜 License


📸 Screenshot Guide

![Screenshot 2025-04-01 024139](https://github.com/user-attachments/assets/e4a1ece0-ec1e-409d-b92c-219a8884f1c0)

Main Interface: 
![Screenshot 2025-04-01 024744](https://github.com/user-attachments/assets/e9f219b5-fd43-439a-8b5f-9e3f8db30337)

Weather Popup:![Screenshot 2025-04-01 024139](https://github.com/user-attachments/assets/e4a1ece0-ec1e-409d-b92c-219a8884f1c0)
Mobile View: 

For more details, check the live demo (https://graceful-griffin-a49ce7.netlify.app/).
