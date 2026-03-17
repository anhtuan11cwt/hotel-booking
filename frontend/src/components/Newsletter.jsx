const Newsletter = () => {
  return (
    <section className="px-4 py-12 bg-white">
      <div className="flex md:flex-row flex-col border border-gray-500/30 rounded-lg items-start md:items-center justify-between gap-5 text-sm max-w-5xl mx-auto bg-white p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-semibold text-gray-700">
            Đăng ký nhận tin tức
          </h1>
          <p className="text-gray-500 mt-2">
            Nhận thông tin mới nhất về các khuyến mãi và cập nhật từ chúng tôi.
            Đừng bỏ lỡ những ưu đãi hấp dẫn dành cho bạn.
          </p>
          <div className="flex items-center gap-4 mt-10">
            <input
              className="py-2 px-3 w-full outline-none focus:border-indigo-500/60 transition max-w-64 border border-gray-500/30 rounded-md"
              placeholder="Nhập email của bạn"
              type="text"
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-700 transition-all px-6 py-2 rounded text-white font-medium"
              type="button"
            >
              Đăng ký
            </button>
          </div>
        </div>
        <div className="space-y-4 md:max-w-48">
          <div className="flex items-center gap-3">
            <div className="bg-gray-500/10 w-max p-2.5 rounded">
              <svg
                fill="none"
                height="22"
                role="img"
                viewBox="0 0 22 22"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Bài viết hàng tuần</title>
                <path
                  d="M12.834 20.167H9.167c-3.457 0-5.186 0-6.26-1.074s-1.074-2.802-1.074-6.26V11c0-3.457 0-5.185 1.074-6.26 1.074-1.073 2.803-1.073 6.26-1.073h3.667c3.456 0 5.185 0 6.259 1.074s1.074 2.802 1.074 6.26v1.833c0 3.457 0 5.185-1.074 6.259-.599.599-1.401.864-2.593.981M6.417 3.667V2.292m9.167 1.375V2.292m4.125 5.958H9.854m-8.02 0h3.552"
                  stroke="#6B7280"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-800">
              Bài viết hàng tuần
            </h3>
          </div>
          <p className="text-gray-500">
            Nhận những bài viết mới nhất về du lịch và các ưu đãi đặc biệt mỗi
            tuần.
          </p>
        </div>
        <div className="space-y-4 md:max-w-48">
          <div className="flex items-center gap-3">
            <div className="bg-gray-500/10 w-max p-2.5 rounded">
              <svg
                fill="none"
                height="22"
                role="img"
                viewBox="0 0 22 22"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Không spam</title>
                <path
                  d="M12.834 3.208v6.875-5.958a1.375 1.375 0 1 1 2.75 0v5.958-3.208a1.375 1.375 0 1 1 2.75 0v7.791a5.5 5.5 0 0 1-5.5 5.5H11.8a5.5 5.5 0 0 1-3.76-1.486l-4.546-4.261a1.594 1.594 0 1 1 2.218-2.291l1.623 1.623V5.958a1.375 1.375 0 1 1 2.75 0v4.125-6.875a1.375 1.375 0 1 1 2.75 0"
                  stroke="#6B7280"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-800">Không spam</h3>
          </div>
          <p className="text-gray-500">
            Chúng tôi cam kết không gửi tin nhắn rác. Chỉ những nội dung thực sự
            hữu ích.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
