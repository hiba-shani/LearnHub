import { BrowserRouter, Route, Routes } from "react-router-dom";
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


function App() {
  return (
   <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={
        <>
      <Hero/>
      <Courses limit={4}/>
      <WhyChooseUs/>
      <Testimonials/>
      <CTASection/>
      </>
      }
      />
      <Route path="/courses" element={<Courses/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/course/:id" element={<CourseDetails/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
        <Route path="/verify-otp" element={<VerifyOtp/>}/>
         <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/my-courses" element={<MyCourses/>}/>
      <Route path="/create-course" element={<CreateCourse/>}/>
      <Route path="/edit-course/:id" element={<EditCourse/>}/>
        <Route path="/lessons/:id" element={<Lessons/>}/>
        <Route path="/add-lesson/:id" element={<CreateLesson/>}/>
        <Route path="/edit-lesson/:lessonId" element={<EditLesson/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
           <Route path="/instructor-dashboard" element={<InstructorDashboard/>}/>
           <Route path="/certificate/:id" element={<Certificate/>}/>
           <Route path="/admin/users" element={<AdminUsers/>}/>


      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
