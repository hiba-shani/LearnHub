import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourses from "./pages/MyCourses";

// Layouts
import AdminLayout from "./components/AdminLayout";
import InstructorLayout from "./components/InstructorLayout";

// Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminInstructors from "./pages/AdminInstructors";
import AdminCourses from "./pages/AdminCourses";
import AdminRevenue from "./pages/AdminRevenue";
import InstructorDashboard from "./pages/InstructorDashboard";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import Lessons from "./pages/Lessons";
import CreateLesson from "./pages/AddLesson";
import EditLesson from "./pages/EditLesson";
import Contact from "./pages/Contact";
import WhyChooseUs from "./pages/WhyChooseUs";
import Testimonials from "./pages/Testmonials";
import CTASection from "./pages/CTASections";
import Certificate from "./pages/Certificate";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isInstructorPage = location.pathname.startsWith("/instructor");

  return (
    <>
      {!isAdminPage && !isInstructorPage && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Hero /><Courses limit={4} /><WhyChooseUs /><Testimonials /><CTASection /></>} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="instructors" element={<AdminInstructors />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="revenue" element={<AdminRevenue />} />
        </Route>

        {/* Instructor Protected Routes */}
        <Route path="/instructor" element={<ProtectedRoute><InstructorLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<InstructorDashboard />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="edit-course/:id" element={<EditCourse />} />
          <Route path="add-lesson/:id" element={<CreateLesson />} />
          <Route path="edit-lesson/:lessonId" element={<EditLesson />} />
        
        </Route>

        {/* Other Protected Routes (User) */}
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/lessons/:id" element={<ProtectedRoute><Lessons /></ProtectedRoute>} />
        <Route path="/certificate/:id" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />
      </Routes>

      {!isAdminPage && !isInstructorPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;