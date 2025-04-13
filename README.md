# Bug & Task Tracker Web App (Next.js)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 🚀 Getting Started

To set up and run the development server:

```bash
npm install      # Install dependencies
npm run dev      # Start development server
```

Or with other package managers:
```bash
yarn install && yarn dev
pnpm install && pnpm dev
bun install && bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🔐 Login Credentials

This app includes mock login functionality. Use the following credentials:

### Developer
- **Username**: `dev`
- **Password**: `dev123`

### Manager
- **Username**: `mgr`
- **Password**: `mgr123`

These credentials are hardcoded for demo purposes and role-based access is applied.

---

## 🧠 Project Overview

A lightweight bug and task tracking web app with the following core features:

### 👥 Role-Based Access
- **Developer** can create, update, and manage their own tasks.
- **Manager** can view all tasks, assign them, and approve/reject bug resolutions.

### 📋 Key Features
- **Authentication** (mock login for simplicity)
- **Task & Bug Management** with:
  - Title, Description
  - Priority, Status, Type (Bug/Task)
  - Tags, Estimated Hours
  - Start & Due Dates
  - Created/Updated Dates
  - Time Tracking
- **Role-based Dashboards**
- **Mobile Responsive UI** with grid layout
- **Form Validation** for required fields
- **Confirmation Toast** after form submission
- **State Management** using `useState` and `useEffect`

---

## 🧱 File Structure
```
app/
│
├── components/
│   ├── CreateTaskForm.js  // Form to create/update tasks/bugs
│   └── LoginForm.js       // Mock login page
│
├── page.js               // Home/dashboard logic
├── styles/               // CSS modules
└── layout.js             // Global layout
```

---

## 🔧 Logic & Functionality Breakdown

### 1. **Login Flow**
- Users login using mock credentials (`dev` / `mgr`).
- Credentials are matched against hardcoded user data.
- On success, role is stored in session/local state and dashboard is rendered accordingly.

### 2. **Task/Bug Form**
- Uses a form with grid layout.
- Validates required fields (`title`, `assignedTo`, `project`).
- On submit:
  - Adds or updates task.
  - Displays confirmation toast.

### 3. **Task Listing**
- Tasks are filtered based on role:
  - Developers see only their tasks.
  - Managers see all tasks.
- Sortable/filterable by status or priority (optional feature).

### 4. **Data Storage**
- Data is stored in local component state (can be extended to localStorage, API, or database).
- Each task includes `createdBy`, `assignedTo`, `tags`, `estimatedHours`, etc.

---

## 📦 Future Improvements
- API integration with backend (MongoDB / Firebase)
- JWT-based authentication
- Drag-and-drop task management (Kanban)
- Activity logs and notifications

---

## 📚 Learn More

To learn more about Next.js, check these resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

---

## 📤 Deploy on Vercel

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com).

Check the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
