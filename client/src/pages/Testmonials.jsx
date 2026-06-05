<<<<<<< HEAD
import { FaStar } from "react-icons/fa";

function Testimonials() {

  const reviews = [

    {
      name: "Arjun Nair",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "This LMS helped me improve my coding skills and land my first internship.",
    },

    {
      name: "Hiba Fathima",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "The UI is amazing and the courses are very practical and beginner friendly.",
    },

    {
      name: "Rahul Krishna",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      review:
        "One of the best online learning platforms I have used so far.",
    }

  ];

  return (

    <div className="bg-gray-100 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h1 className="text-4xl font-bold">
            Student Testimonials
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            What our students say about us
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((item, index) => (

            <div
              key={index}
              className="
              bg-white
              rounded-2xl
              p-8
              shadow-md
              hover:shadow-2xl
              transition
              "
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                  w-16
                  h-16
                  rounded-full
                  object-cover
                  "
                />

                <div>

                  <h2 className="font-bold text-lg">
                    {item.name}
                  </h2>

                  <div className="flex gap-1 text-yellow-500 mt-1">

                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />

                  </div>

                </div>

              </div>

              <p className="text-gray-500 leading-7 mt-6">
                {item.review}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

=======
import { FaStar } from "react-icons/fa";

function Testimonials() {

  const reviews = [

    {
      name: "Arjun Nair",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "This LMS helped me improve my coding skills and land my first internship.",
    },

    {
      name: "Hiba Fathima",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "The UI is amazing and the courses are very practical and beginner friendly.",
    },

    {
      name: "Rahul Krishna",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      review:
        "One of the best online learning platforms I have used so far.",
    }

  ];

  return (

    <div className="bg-gray-100 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h1 className="text-4xl font-bold">
            Student Testimonials
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            What our students say about us
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((item, index) => (

            <div
              key={index}
              className="
              bg-white
              rounded-2xl
              p-8
              shadow-md
              hover:shadow-2xl
              transition
              "
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                  w-16
                  h-16
                  rounded-full
                  object-cover
                  "
                />

                <div>

                  <h2 className="font-bold text-lg">
                    {item.name}
                  </h2>

                  <div className="flex gap-1 text-yellow-500 mt-1">

                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />

                  </div>

                </div>

              </div>

              <p className="text-gray-500 leading-7 mt-6">
                {item.review}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
export default Testimonials;