import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import HotelCard from "./HotelCard";

const MostPicked = () => {
  const { axios } = useContext(AppContext);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHotels = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/api/hotel/getall");
        if (data.success) {
          const hotelsData = data.hotels.map((hotel) => ({
            address: hotel.hotelAddress,
            id: hotel._id,
            image: hotel.image || "",
            name: hotel.hotelName,
            price: hotel.price,
            rating: hotel.rating,
          }));
          setHotels(hotelsData);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadHotels();
  }, [axios]);

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 text-center">
          <h1 className="font-semibold text-[#152c5b] text-heading text-3xl">
            Khách sạn được yêu thích nhất
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[#4b5563] text-paragraph text-sm">
            Khám phá những khách sạn được yêu thích nhất với đánh giá cao từ
            khách hàng
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="border-4 border-indigo-600 border-t-transparent rounded-full w-8 h-8 animate-spin" />
          </div>
        ) : hotels.length === 0 ? (
          <div className="py-12 text-gray-500 text-center">
            <p>Chưa có khách sạn nào</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {hotels.map((item, index) => (
              <HotelCard animated delay={index} hotel={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MostPicked;
