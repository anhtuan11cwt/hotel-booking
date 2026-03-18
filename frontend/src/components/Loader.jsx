import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loader = () => {
  const { nextUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(nextUrl ? `/${nextUrl}` : "/my-bookings");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate, nextUrl]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-6">
        <div className="h-24 w-24 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Đang xử lý thanh toán...
          </h2>
          <p className="text-gray-500">
            Vui lòng đợi trong giây lát. Bạn sẽ được chuyển hướng tự động.
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" />
          <span className="animate-pulse">Chuyển hướng sau 8 giây...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
