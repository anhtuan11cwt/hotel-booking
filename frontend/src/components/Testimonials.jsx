/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const testimonials = [
  {
    content:
      "Tôi đã sử dụng dịch vụ đặt phòng khách sạn này gần hai năm, chủ yếu cho các chuyến công tác và nó đã cực kỳ thân thiện với người dùng, giúp công việc của tôi dễ dàng hơn rất nhiều.",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Donald Jackman",
    role: "Content Creator",
  },
  {
    content:
      "Tôi đã sử dụng trang web này gần một năm, chủ yếu cho các chuyến du lịch và nó đã tuyệt vời một cách không thể tin được, giúp công việc của tôi dễ dàng hơn.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Richard Nelson",
    role: "Influencer",
  },
  {
    content:
      "Tôi đã sử dụng trang web tuyệt vời này gần hai năm, chủ yếu cho các chuyến công tác và nó đã cực kỳ thân thiện với người dùng, giúp công việc của tôi dễ dàng hơn.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    name: "James Washington",
    role: "Marketing Manager",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 text-center">
          <h1 className="font-semibold text-[#152c5b] text-heading text-3xl">
            Đánh giá khách hàng
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[#4b5563] text-paragraph text-sm">
            Những phản hồi từ khách hàng đã trải nghiệm dịch vụ của chúng tôi
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              animate={{
                y: [0, -30, 0],
              }}
              className="bg-white shadow-[0px_4px_15px_0px] shadow-black/5 pb-6 border border-gray-200 rounded-lg w-80 text-sm"
              key={testimonial.name}
              transition={{
                duration: index === 0 ? 1 : index === 1 ? 2 : 3,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 0,
              }}
            >
              <div className="relative flex flex-col items-center px-5 py-4">
                <img
                  alt={testimonial.name}
                  className="-top-14 absolute rounded-full w-24 h-24 object-cover"
                  src={testimonial.image}
                />
                <div className="pt-8 text-center">
                  <h1 className="font-medium text-gray-800 text-lg">
                    {testimonial.name}
                  </h1>
                  <p className="text-gray-800/80">{testimonial.role}</p>
                </div>
              </div>
              <p className="px-6 text-gray-500 text-center">
                {testimonial.content}
              </p>
              <div className="flex justify-center pt-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      fill="none"
                      height="18"
                      key={star}
                      role="img"
                      viewBox="0 0 22 20"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Đánh giá</title>
                      <path
                        d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                        fill="#FF532E"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
