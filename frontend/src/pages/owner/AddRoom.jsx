import { Upload } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const AddRoom = () => {
  const { axios, fetchOwnerHotels, hotelData } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOwnerHotels();
  }, [fetchOwnerHotels]);

  const [roomData, setRoomData] = useState({
    amenities: [],
    description: "",
    hotel: "",
    images: [null, null, null, null],
    isAvailable: true,
    pricePerNight: "",
    roomType: "",
  });

  const [previews, setPreviews] = useState([null, null, null, null]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const updatedImages = [...roomData.images];
      updatedImages[index] = selectedFile;

      const updatedPreviews = [...previews];
      updatedPreviews[index] = URL.createObjectURL(selectedFile);

      setRoomData((prev) => ({ ...prev, images: updatedImages }));
      setPreviews(updatedPreviews);
    }
  };

  const handleAmenityChange = (e) => {
    const value = e.target.value;
    setRoomData((prev) => ({
      ...prev,
      amenities: value.split(","),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomData.hotel) {
      toast.error("Vui lòng chọn khách sạn!");
      return;
    }

    const formData = new FormData();
    formData.append("hotel", roomData.hotel);
    formData.append("roomType", roomData.roomType);
    formData.append("pricePerNight", roomData.pricePerNight);
    formData.append("description", roomData.description);
    formData.append(
      "amenities",
      JSON.stringify(roomData.amenities.map((item) => item.trim())),
    );
    formData.append("isAvailable", roomData.isAvailable);

    for (let i = 0; i < roomData.images.length; i++) {
      if (roomData.images[i]) {
        formData.append("image", roomData.images[i]);
      }
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/room/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Thêm phòng thành công!");
        navigate("/owner/rooms");
      } else {
        toast.error(data.message || "Thêm phòng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm phòng:", error);
      toast.error(error.response?.data?.message || "Lỗi khi thêm phòng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white py-10">
      <form className="space-y-5 p-4 md:p-10 max-w-4xl" onSubmit={handleSubmit}>
        <div>
          <p className="mb-3 font-medium text-base">
            Hình ảnh phòng (tối đa 4 ảnh)
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            {[0, 1, 2, 3].map((index) => (
              <label
                className="cursor-pointer"
                htmlFor={`room-image-${index}`}
                key={index}
              >
                <input
                  accept="image/*"
                  hidden
                  id={`room-image-${index}`}
                  onChange={(e) => handleImageChange(e, index)}
                  type="file"
                />
                {previews[index] ? (
                  <img
                    alt={`Xem trước ảnh ${index + 1}`}
                    className="shadow-lg rounded-lg w-24 h-24 object-cover"
                    src={previews[index]}
                  />
                ) : (
                  <img
                    alt={`Tải ảnh ${index + 1}`}
                    className="opacity-70 hover:opacity-100 max-w-24 transition-opacity cursor-pointer"
                    height={100}
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    width={100}
                  />
                )}
              </label>
            ))}
          </div>
          <p className="mt-2 text-gray-500 text-xs">
            Nhấn vào hình để tải ảnh lên (tối đa 4 ảnh)
          </p>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="font-medium text-base" htmlFor="hotel">
            Chọn khách sạn
          </label>
          <select
            className="bg-white px-3 py-2 md:py-2.5 border border-gray-500/40 rounded outline-none"
            id="hotel"
            name="hotel"
            onChange={handleChange}
            required
            value={roomData.hotel}
          >
            <option key="placeholder-hotel" value="">
              -- Chọn khách sạn --
            </option>
            {hotelData.map((hotel, index) => (
              <option
                key={
                  (hotel._id ?? hotel.id) ||
                  `${hotel.hotelName ?? hotel.name ?? "hotel"}-${index}`
                }
                value={hotel._id ?? hotel.id ?? ""}
              >
                {hotel.hotelName ?? hotel.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="font-medium text-base" htmlFor="room-type">
            Loại phòng
          </label>
          <input
            className="px-3 py-2 md:py-2.5 border border-gray-500/40 rounded outline-none"
            id="room-type"
            name="roomType"
            onChange={handleChange}
            placeholder="VD: Phòng Deluxe, Phòng Suite, Phòng Đôi..."
            required
            type="text"
            value={roomData.roomType}
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="font-medium text-base" htmlFor="price-per-night">
            Giá mỗi đêm (VNĐ)
          </label>
          <input
            className="px-3 py-2 md:py-2.5 border border-gray-500/40 rounded outline-none"
            id="price-per-night"
            name="pricePerNight"
            onChange={handleChange}
            placeholder="VD: 500000"
            required
            type="number"
            value={roomData.pricePerNight}
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="font-medium text-base" htmlFor="description">
            Mô tả phòng
          </label>
          <textarea
            className="px-3 py-2 md:py-2.5 border border-gray-500/40 rounded outline-none resize-none"
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="Mô tả chi tiết về phòng..."
            required
            rows={4}
            value={roomData.description}
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="font-medium text-base" htmlFor="amenities">
            Tiện nghi
          </label>
          <input
            className="px-3 py-2 md:py-2.5 border border-gray-500/40 rounded outline-none"
            id="amenities"
            name="amenities"
            onChange={handleAmenityChange}
            placeholder="WiFi, Hồ bơi, Bãi đỗ xe, Phòng gym..."
            type="text"
            value={roomData.amenities.join(", ")}
          />
          <p className="mt-1 text-gray-500 text-xs">
            Ngăn cách các tiện nghi bằng dấu phẩy
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            checked={roomData.isAvailable}
            className="w-5 h-5 accent-[#3d5cfc] cursor-pointer"
            id="is-available"
            name="isAvailable"
            onChange={(e) =>
              setRoomData((prev) => ({
                ...prev,
                isAvailable: e.target.checked,
              }))
            }
            type="checkbox"
          />
          <label
            className="font-medium text-base cursor-pointer"
            htmlFor="is-available"
          >
            Còn phòng (sẵn sàng đặt)
          </label>
        </div>

        <button
          className="flex items-center gap-2 bg-[#3d5cfc] hover:bg-[#2f4df0] active:bg-[#2843d6] px-8 py-2.5 rounded focus:outline-none focus:ring-[#3d5cfc]/40 focus:ring-2 w-fit font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
          type="submit"
        >
          <Upload aria-hidden="true" className="w-4 h-4" />
          {loading ? "Đang thêm..." : "Thêm phòng"}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
