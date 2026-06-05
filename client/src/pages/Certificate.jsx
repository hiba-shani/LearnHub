import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Certificate() {

  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      // COURSE
      const courseRes = await axios.get(
        `${API}/api/courses/${id}`
      );

      setCourse(courseRes.data.course);

      // USER
      const userRes = await axios.get(
        `${API}/api/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(userRes.data.user);

    } catch (error) {
      console.log(error);
    }
  };

  const downloadCertificate = () => {
    window.print();
  };

  if (!course || !user) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (

    <div className="certificate-page min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white border-[12px] border-indigo-600 rounded-3xl shadow-2xl p-12 max-w-4xl w-full text-center">

        <h1 className="text-5xl font-bold text-indigo-700 mb-6">
          Certificate
        </h1>

        <p className="text-xl text-gray-500 mb-10">
          Of Completion
        </p>

        <p className="text-xl text-gray-600">
          This certifies that
        </p>

        <h2 className="text-5xl font-bold mt-5 text-gray-800">
          {user.name}
        </h2>

        <p className="mt-10 text-xl text-gray-600">
          has successfully completed
        </p>

        <h3 className="text-4xl font-bold text-indigo-600 mt-5">
          {course.title}
        </h3>

        <p className="mt-8 text-lg text-gray-600">
          Instructor:
          <span className="font-bold"> {course.instructorName}</span>
        </p>

        <p className="mt-4 text-lg text-gray-600">
          Date:
          <span className="font-bold"> {new Date().toLocaleDateString()}</span>
        </p>

        <div className="mt-16">
          <div className="w-52 border-t-2 border-gray-700 mx-auto pt-3">
            <p className="font-semibold">LearnHub</p>
          </div>
        </div>

        <button
          onClick={downloadCertificate}
          className="no-print mt-12 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
        >
          Download Certificate
        </button>

      </div>

      {/* PRINT STYLE */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .certificate-page, .certificate-page * { visibility: visible; }
          .certificate-page {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 30px;
            background: white;
          }
          .no-print { display: none !important; }
        }
      `}</style>

    </div>
  );
}

export default Certificate;