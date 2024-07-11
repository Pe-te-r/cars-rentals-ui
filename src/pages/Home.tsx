import image from '../assets/image6.jpg'
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <>
    <div>
      <Navbar/>
    <div className="hero  bg-cover bg-no-repeat min-h-screen" style={{backgroundImage: `url(${image})`, }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Drive Your Dream Car Today!</h1>
      <p className="mb-5 text-yellow-500">
      <TypeAnimation
      sequence={[
        3000, 
        'Explore our luxury and Economy Vehicles!',
        4000,
        'Reserve your ride Today!',
        3000,
        'Convenient, affordable, and tailored for your needs.',
        5000
      ]}
      wrapper="span"
      speed={60}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
      {/* Explore our wide range of luxury and economy vehicles for rent. Convenient, affordable, and tailored for your needs. */}
      </p>
      <div className='flex gap-3'>
        <button className="btn btn-secondary">Explore more cars </button>
        <button className="btn btn-primary">Reserve Your Ride Today!</button>
      </div>
    </div>
  </div>
</div>

      {/* Featured Vehicles Section */}
      <div className="featured-vehicles py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Vehicles</h2>
        <div className="flex justify-around">
          {/* Example Vehicle Card */}
          <div className="card bg-white shadow-md p-4">
            <img src="https://i.pinimg.com/236x/80/c1/00/80c1009e693609f617bb29bed0707ed5.jpg" alt="Car Image" className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Car Model</h3>
            <p className="text-gray-700">Starting at $45/day</p>
            <button className="btn btn-primary mt-4">View Details</button>
          </div>
          {/* start car */}
          <div className="card bg-white shadow-md p-4">
            <img src="https://i.pinimg.com/236x/80/c1/00/80c1009e693609f617bb29bed0707ed5.jpg" alt="Car Image" className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Car Model</h3>
            <p className="text-gray-700">Starting at $45/day</p>
            <button className="btn btn-primary mt-4">View Details</button>
          </div>
          
          {/* Repeat for more vehicles */}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="flex justify-around">
          <div className="benefit text-center">
            <h3 className="text-xl font-semibold mb-2">Quality Vehicles</h3>
            <p>We offer a wide range of well-maintained cars to choose from.</p>
          </div>
          <div className="benefit text-center">
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p>Get the best rates with no hidden charges.</p>
          </div>
          <div className="benefit text-center">
            <h3 className="text-xl font-semibold mb-2">Convenient Booking</h3>
            <p>Book your car online with ease and convenience.</p>
          </div>
          <div className="benefit text-center">
            <h3 className="text-xl font-semibold mb-2">Excellent Support</h3>
            <p>Our support team is available 24/7 to assist you.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works py-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="steps flex justify-around">
          <div className="step text-center">
            <h3 className="text-xl font-semibold mb-2">Search</h3>
            <p>Find the perfect car for your needs.</p>
          </div>
          <div className="step text-center">
            <h3 className="text-xl font-semibold mb-2">Book</h3>
            <p>Reserve your car online in just a few clicks.</p>
          </div>
          <div className="step text-center">
            <h3 className="text-xl font-semibold mb-2">Drive</h3>
            <p>Pick up your car and enjoy your ride.</p>
          </div>
        </div>
      </div>


      
    </div>
      <Footer/>
    </>
  );
};

export default Home;
