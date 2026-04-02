import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegistrationForm from "./pages/Register";
import LoginForm from "./pages/Login";
import StudentDetail from "./pages/StudentData";
import StudentRegistrationForm from "./pages/AddStudent";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import FeesTracker from "./pages/FeesTracker";
import ForgotPassword from "./pages/ForgotPass";
import EditStudent from "./pages/EditStudent";
import ResetPassword from "./pages/ResetPassword";
import GenerateFeesVoucher from "./pages/Geneartefees";
import { AuthProvider } from "./Store/useAuth";
import { StudentProvider } from "./Store/StudentData";


import ProtectedRoute from "./components/Protectiveroute";
import PublicRoute from "./Routes/publicRoutes";

function App() {
  return (
        <BrowserRouter>
    <AuthProvider>
      <StudentProvider>
          <Routes>

            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegistrationForm />
                </PublicRoute>
              }
            />
           <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
 

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/studentdetails" element={<StudentDetail />} />
              <Route path="/addstudent" element={<StudentRegistrationForm />} />
              <Route path="/feestracker" element={<FeesTracker />} />
              <Route path="/feesvocher" element={<GenerateFeesVoucher />} />
              <Route path="/edit-student/:id" element={<EditStudent />} />
              
            </Route>

          </Routes>
      </StudentProvider>
    </AuthProvider>
        </BrowserRouter>
  );
}

export default App;