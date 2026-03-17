import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Hotels = () => {
  const { hotelData } = useContext(AppContext);
  const navigate = useNavigate();

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
            <div
              className="bg-white shadow shadow-black/10 border border-gray-200 rounded-lg w-80 transition hover:-translate-y-1 duration-300"
              key={item.id}
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
                  {item.price}
                </span>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium text-white text-sm transition cursor-pointer"
                  onClick={() => navigate(`/room/${item.id}`)}
                  type="button"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
