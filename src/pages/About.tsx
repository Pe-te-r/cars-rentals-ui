import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

const teamMembers = [
    {
      name: "Peter Phantom",
      image: "https://avatars.githubusercontent.com/u/106557118?v=4",
      level: "Founder"
    },
    {
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      level: "Co-Founder"
    },
    {
      name: "Michael Johnson",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      level: "Director"
    }
  ];
  
  // JSX component to render the founders
  const TeamCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {teamMembers.map((member, index) => (
        <div key={index} className="bg-yellow-900 shadow-md rounded-lg p-4">
          <img src={member.image} alt={member.name} className="rounded-full h-32 w-32 mx-auto mb-4" />
          <h2 className="text-xl text-white font-bold text-center mb-2">{member.name}</h2>
          <p className="text-white text-center">{member.level}</p>
        </div>
      ))}
    </div>
  );
  
  const About = () => (
    <>
      <Navbar/>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
      <h1 className="text-3xl font-bold mb-4">About Our Car Rental Service</h1>
      <p className="text-gray-500 leading-relaxed mb-4">
        Welcome to our car rental service, where we strive to provide you with the best vehicles
        and customer experience. Whether you're traveling for business or pleasure, we have a wide
        selection of cars to suit your needs.
      </p>
      <p className="text-gray-500 leading-relaxed mb-4">
        Our mission is to make your journey enjoyable and stress-free. With our easy booking process
        and competitive rates, renting a car has never been easier. We prioritize safety, comfort,
        and convenience for all our customers.
      </p>
      <p className="text-gray-500 leading-relaxed mb-4">
        At our car rental service, we believe in transparency and customer satisfaction. Feel free
        to explore our fleet, check out our competitive pricing, and contact us with any questions.
        We're here to ensure you have a memorable experience with us.
      </p>
      <p className="text-gray-500 leading-relaxed mb-4">
        Whether you need a car for a day, a week, or longer, we've got you covered. Experience the
        freedom of the open road with our reliable and well-maintained vehicles.
      </p>
      <TeamCards />
      <p className="text-center text-gray-500 mt-8">
        We are committed to providing excellent service and quality vehicles for your convenience.
      </p>
      <p className="text-gray-500 text-center leading-relaxed mb-4">
        Thank you for choosing us for your car rental needs. We look forward to serving you and
        making your journey exceptional.
      </p>

    {/* Testimonials Section */}
      <div className="testimonials py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h2>
        <div className="flex justify-around">
          //Example Testimonial
          <div className="testimonial text-center">
            <p className="mb-4">"Great service and excellent cars! Highly recommend."</p>
            <p className="font-semibold">- Jane Doe</p>
          </div>
          
          //</div>Repeat for more testimonials
        </div>
    </div>

    <Footer/>
  </>
  );
  
  export default About;
  
