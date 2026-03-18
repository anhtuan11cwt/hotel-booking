import { useContext, useEffect } from "react";
import HotelCard from "../components/HotelCard";
import { AppContext } from "../context/AppContext";

const Hotels = () => {
  const { fetchAllHotels, hotelData } = useContext(AppContext);

  useEffect(() => {
    fetchAllHotels();
  }, [fetchAllHotels]);

  return (
    <div className="hotels-page py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 text-center">
          <h1 className="font-semibold text-[#152c5b] text-heading text-3xl">
            Tất cả khách sạn
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[#4b5563] text-paragraph text-sm">
            Khám phá tất cả khách sạn đối tác của chúng tôi
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {hotelData.map((item) => (
            <HotelCard hotel={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
