import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Courses from "./components/Courses";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import CourseDetails from "./components/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourses from "./pages/MyCourses";
import About from "./pages/About";
import Footer from "./components/Footer";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import Lessons from "./pages/Lessons";
import CreateLesson from "./pages/AddLesson";
import VerifyOtp from "./pages/VerifyOtp";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import WhyChooseUs from "./pages/WhyChooseUs";
import Testimonials from "./pages/Testmonials";
import CTASection from "./pages/CTASections";
import Certificate from "./pages/Certificate";
import EditLesson from "./pages/EditLesson";
import Contact from "./pages/Contact";
import AdminUsers from "./pages/AdminUsers";
import AdminInstructors from "./pages/AdminInstructors";
import AdminCourses from "./pages/AdminCourses";
import AdminRevenue from "./pages/AdminRevenue";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function Layout() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Courses limit={4} />
              <WhyChooseUs />
              <Testimonials />
              <CTASection />
            </>
          }
        />

        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-course/:id"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lessons/:id"
          element={
            <ProtectedRoute>
              <Lessons />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-lesson/:id"
          element={
            <ProtectedRoute>
              <CreateLesson />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-lesson/:lessonId"
          element={
            <ProtectedRoute>
              <EditLesson />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificate/:id"
          element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/instructors"
          element={
            <ProtectedRoute>
              <AdminInstructors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute>
              <AdminCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/revenue"
          element={
            <ProtectedRoute>
              <AdminRevenue />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminPage && <Footer />}
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