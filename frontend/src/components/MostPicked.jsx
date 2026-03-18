/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { formatCurrencyVND } from "../utils/currency";

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
            <span className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Chưa có khách sạn nào</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {hotels.map((item, index) => (
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                className="bg-white shadow shadow-black/10 border border-gray-200 rounded-lg w-80 transition hover:-translate-y-1 duration-300"
                key={item.id}
                transition={{
                  delay: index * 0.2,
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <img
                  alt={item.name}
                  className="rounded-md w-full max-h-40 object-cover"
                  src={item.image}
                />
                <p className="mx-3 mt-4 font-semibold text-gray-900 text-base">
                  {item.name}
                </p>
                <p className="mx-3 mt-2 mb-3 text-zinc-400 text-sm line-clamp-2">
                  {item.address}
                </p>
                <div className="flex justify-between items-center mx-3 mb-4">
                  <span className="font-semibold text-indigo-600">
                    {formatCurrencyVND(item.price)}
                  </span>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium text-white text-sm transition cursor-pointer"
                    type="button"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MostPicked;
