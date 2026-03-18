import { Upload } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { iconMap } from "../../utils/amenityIcons";

const RegisterHotel = () => {
  const { axios, fetchOwnerHotels } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    amenities: [],
    hotelAddress: "",
    hotelName: "",
    image: null,
    price: "",
    rating: "",
  });

  const [_file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setData((prev) => ({ ...prev, image: selectedFile }));
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const toggleAmenity = (amenity) => {
    setData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("hotelName", data.hotelName);
      formData.append("hotelAddress", data.hotelAddress);
      formData.append("rating", data.rating);
      formData.append("price", data.price);
      formData.append(
        "amenities",
        data.amenities.map((item) => item.trim()).join(","),
      );
      if (data.image) {
        formData.append("image", data.image);
      }

      const { data: response } = await axios.post(
        "/api/hotel/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.success) {
        toast.success(response.message || "Đăng ký khách sạn thành công!");
        await fetchOwnerHotels();
        navigate("/owner/hotels");
      } else {
        toast.error(response.message || "Đăng ký khách sạn thất bại");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký khách sạn",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form className="md:p-10 p-4 space-y-5 max-w-lg" onSubmit={handleSubmit}>
        <div>
          <p className="text-base font-medium">Ảnh khách sạn</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <label className="cursor-pointer" htmlFor="hotel-image">
              <input
                accept="image/*"
                hidden
                id="hotel-image"
                onChange={handleImageChange}
                type="file"
              />
              {preview ? (
                <img
                  alt="Xem trước ảnh khách sạn"
                  className="w-24 h-24 object-cover rounded-full shadow-lg"
                  src={preview}
                />
              ) : (
                <img
                  alt="Khu vực tải ảnh lên"
                  className="max-w-24 cursor-pointer"
                  height={100}
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                  width={100}
                />
              )}
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="hotel-name">
            Tên khách sạn
          </label>
          <input
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            id="hotel-name"
            name="hotelName"
            onChange={handleChange}
            placeholder="Nhập tên khách sạn"
            required
            type="text"
            value={data.hotelName}
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="hotel-address">
            Địa chỉ khách sạn
          </label>
          <textarea
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            id="hotel-address"
            name="hotelAddress"
            onChange={handleChange}
            placeholder="Nhập địa chỉ khách sạn"
            required
            rows={3}
            value={data.hotelAddress}
          />
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="rating">
              Đánh giá (sao)
            </label>
            <input
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              id="rating"
              max="5"
              min="1"
              name="rating"
              onChange={handleChange}
              placeholder="1-5"
              required
              type="number"
              value={data.rating}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="price">
              Giá mỗi đêm
            </label>
            <input
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              id="price"
              name="price"
              onChange={handleChange}
              placeholder="0"
              required
              type="number"
              value={data.price}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-md">
          <p className="text-base font-medium">Tiện nghi</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(iconMap).map((amenity) => {
              const IconComponent = iconMap[amenity];
              return (
                <label
                  className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer border transition-colors ${
                    data.amenities.includes(amenity)
                      ? "bg-[#3d5cfc] text-white border-[#3d5cfc]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#3d5cfc]"
                  }`}
                  key={amenity}
                >
                  <input
                    checked={data.amenities.includes(amenity)}
                    className="hidden"
                    onChange={() => toggleAmenity(amenity)}
                    type="checkbox"
                  />
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm">{amenity}</span>
                </label>
              );
            })}
          </div>
        </div>

        <button
          className="px-8 py-2.5 bg-[#3d5cfc] hover:bg-[#2f4df0] active:bg-[#2843d6] text-white font-medium rounded flex items-center gap-2 w-fit focus:outline-none focus:ring-2 focus:ring-[#3d5cfc]/40 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload aria-hidden="true" className="w-4 h-4" />
          )}
          Đăng ký khách sạn
        </button>
      </form>
    </div>
  );
};

export default RegisterHotel;
