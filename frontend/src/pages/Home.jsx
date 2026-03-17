import Hero from "../components/Hero";
import HotelSearchForm from "../components/HotelSearchForm";
import MostPicked from "../components/MostPicked";
import PopularRooms from "../components/PopularRooms";

const Home = () => {
  return (
    <div className="home-page py-24">
      <Hero />
      <HotelSearchForm />
      <MostPicked />
      <PopularRooms />
    </div>
  );
};

export default Home;
