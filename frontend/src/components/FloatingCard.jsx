import { motion } from "framer-motion";

function FloatingCard() {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity
      }}
      className="bg-slate-800 p-8 rounded-2xl shadow-xl text-white w-80"
    >

      <h2 className="text-2xl font-bold mb-6">
        AI Analysis
      </h2>

      <p className="text-gray-400">
        News Status
      </p>

      <div className="bg-green-500 text-black p-3 rounded-lg mt-2 font-semibold">
        REAL NEWS
      </div>

      <p className="text-gray-400 mt-5">
        Confidence
      </p>

      <div className="bg-blue-500 p-3 rounded-lg mt-2 font-semibold">
        96%
      </div>

    </motion.div>
  );
}

export default FloatingCard;