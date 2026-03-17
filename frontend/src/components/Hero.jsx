/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { assets, homePageData } from "../assets/assets";

const Hero = () => {
  return (
    <main className="flex md:flex-row flex-col justify-between items-center mx-auto mt-16 px-4 md:px-8 lg:px-12 xl:px-16 pb-16 max-w-7xl">
      <motion.div
        animate={{ opacity: 1 }}
        className="w-full md:w-1/2"
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <h1 className="font-bold text-[#152c5b] text-heading text-3xl md:text-4xl lg:text-5xl">
          Tìm kiếm khách sạn hoàn hảo cho kỳ nghỉ của bạn
        </h1>
        <p className="mt-4 max-w-md text-[#4b5563] text-paragraph">
          Khám phá hàng ngàn khách sạn và phòng nghỉ chất lượng cao với mức giá
          hợp lý. Đặt phòng dễ dàng, an toàn và nhanh chóng.
        </p>
        <motion.button
          className="bg-[#3d5cfc] mt-6 px-8 py-3 rounded-md font-medium text-white"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileHover={{ scale: 1.2 }}
        >
          Xem thêm
        </motion.button>

        <div className="flex flex-wrap gap-8 mt-12">
          {homePageData.map((item) => (
            <motion.div
              animate={{ y: [0, -20, 0] }}
              className="flex flex-col items-center"
              key={`${item.title}-${item.value}`}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <img
                alt={item.title}
                className="mb-2 w-10 h-10 object-contain"
                src={item.icon}
              />
              <span className="font-bold text-[#152c5b] text-xl">
                {item.value}
              </span>
              <span className="text-[#4b5563] text-sm">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        className="flex justify-center mt-12 md:mt-0 w-full md:w-1/2"
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <motion.img
          alt="Hotel Hero"
          animate={{
            scale: [1, 1.2, 1],
            x: [-10, 10, -10],
          }}
          className="shadow-xl rounded-lg w-full max-w-lg h-auto object-cover"
          src={assets.hero_img}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>
    </main>
  );
};

export default Hero;
