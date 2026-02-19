import './index.css'
import RegistrationForm from "./pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './pages/Login';
import StudentDetail from './pages/Home';
import StudentRegistrationForm from './pages/AddStudent';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 👇 Yeh routes sidebar ke bina honge */}
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* 👇 Yeh sab sidebar ke sath chalenge */}
        <Route element={<Layout />}>
          <Route path="/StudentDetails" element={<StudentDetail />} />
          <Route path="/addstudent" element={<StudentRegistrationForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App