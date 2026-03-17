import Hero from "../components/Hero";
import HotelSearchForm from "../components/HotelSearchForm";
import MostPicked from "../components/MostPicked";
import Newsletter from "../components/Newsletter";
import PopularRooms from "../components/PopularRooms";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="home-page py-24">
      <Hero />
      <HotelSearchForm />
      <MostPicked />
      <PopularRooms />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
