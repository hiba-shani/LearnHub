import { useEffect, useState } from "react";
import axios from "axios";

function AdminRevenue() {

  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  const fetchRevenue = async () => {

    try {

      const res = await axios.get(
        `${API}/api/admin/revenue`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchRevenue();

  }, []);

  if (!data) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Revenue Management
      </h1>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-green-600 text-white p-6 rounded-2xl">

          <h2>Total Revenue</h2>

          <p className="text-3xl font-bold">
            ₹{data.totalRevenue}
          </p>

        </div>

        <div className="bg-blue-600 text-white p-6 rounded-2xl">

          <h2>Total Enrollments</h2>

          <p className="text-3xl font-bold">
            {data.totalEnrollments}
          </p>

        </div>

        <div className="bg-purple-600 text-white p-6 rounded-2xl">

          <h2>Total Courses</h2>

          <p className="text-3xl font-bold">
            {data.totalCourses}
          </p>

        </div>

      </div>

      {/* Revenue Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">
                Course
              </th>

              <th className="p-4 text-left">
                Instructor
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Students
              </th>

              <th className="p-4 text-left">
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {data.revenueData.map((item) => (

              <tr
                key={item.courseId}
                className="border-t"
              >

                <td className="p-4">
                  {item.title}
                </td>

                <td className="p-4">
                  {item.instructor}
                </td>

                <td className="p-4">
                  ₹{item.price}
                </td>

                <td className="p-4">
                  {item.students}
                </td>

                <td className="p-4 font-bold text-green-600">
                  ₹{item.revenue}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminRevenue;