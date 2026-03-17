import { assets, cities } from "../assets/assets";

const HotelSearchForm = () => {
  return (
    <div className="mx-auto mt-2 px-6 py-4 max-w-4xl">
      <form className="flex md:flex-row flex-col max-md:items-start gap-4 bg-[#e1f1ff] max-md:mx-auto px-6 py-4 rounded-2xl text-gray-800">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img
              alt="Địa điểm"
              className="w-4 h-4"
              src={assets.location_icon}
            />
            <label className="font-medium text-sm" htmlFor="destinationInput">
              Địa điểm
            </label>
          </div>
          <input
            className="mt-1.5 px-3 py-1.5 border border-gray-200 rounded outline-none w-full text-sm"
            id="destinationInput"
            list="destinations"
            placeholder="Nhập địa điểm..."
            required
            type="text"
          />
          <datalist id="destinations">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img alt="Lịch" className="w-4 h-4" src={assets.calendar_icon} />
            <label className="font-medium text-sm" htmlFor="checkIn">
              Nhận phòng
            </label>
          </div>
          <input
            className="mt-1.5 px-3 py-1.5 border border-gray-200 rounded outline-none w-full text-sm"
            id="checkIn"
            type="date"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img alt="Lịch" className="w-4 h-4" src={assets.calendar_icon} />
            <label className="font-medium text-sm" htmlFor="checkOut">
              Trả phòng
            </label>
          </div>
          <input
            className="mt-1.5 px-3 py-1.5 border border-gray-200 rounded outline-none w-full text-sm"
            id="checkOut"
            type="date"
          />
        </div>

        <div className="flex md:flex-col max-md:items-center max-md:gap-2">
          <div className="flex items-center gap-2">
            <img alt="Người" className="w-4 h-4" src={assets.users_icon} />
            <label className="font-medium text-sm" htmlFor="guests">
              Số người
            </label>
          </div>
          <input
            className="mt-1.5 px-3 py-1.5 border border-gray-200 rounded outline-none w-16 text-sm"
            id="guests"
            max={4}
            min={1}
            placeholder="1"
            type="number"
          />
        </div>

        <button
          className="flex justify-center items-center gap-1 bg-[#3d5cfc] my-auto px-4 py-3 max-md:py-1 rounded-md max-md:w-full text-white cursor-pointer"
          type="submit"
        >
          <span>Tìm kiếm</span>
        </button>
      </form>
    </div>
  );
};

export default HotelSearchForm;
