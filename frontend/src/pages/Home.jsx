import Hero from "../components/Hero";
import HotelSearchForm from "../components/HotelSearchForm";
import MostPicked from "../components/MostPicked";

const Home = () => {
  return (
    <div className="home-page py-24">
      <Hero />
      <HotelSearchForm />
      <MostPicked />
    </div>
  );
};

export default Home;
