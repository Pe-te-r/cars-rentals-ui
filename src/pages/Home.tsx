

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Drive Your Dream Car Today</h1>
        <p className="text-lg mb-8">Affordable, Convenient, and Reliable Car Rentals</p>
        <div>
          <button className="btn btn-primary mr-4">Browse Cars</button>
          <button className="btn btn-secondary">Book Now</button>
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

      {/* Testimonials Section */}
      {/* <div className="testimonials py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h2>
        <div className="flex justify-around">
          //Example Testimonial
          <div className="testimonial text-center">
            <p className="mb-4">"Great service and excellent cars! Highly recommend."</p>
            <p className="font-semibold">- Jane Doe</p>
          </div>
          
          //</div>Repeat for more testimonials
        </div> */}
        

      
    </div>
  );
};

export default Home;
