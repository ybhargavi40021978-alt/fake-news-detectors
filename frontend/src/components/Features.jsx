import {
  FaRobot,
  FaChartBar,
  FaHistory,
  FaShieldAlt
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaRobot />,
      title: "AI Detection"
    },
    {
      icon: <FaChartBar />,
      title: "Analytics"
    },
    {
      icon: <FaHistory />,
      title: "History"
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Login"
    }
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="grid md:grid-cols-4 gap-6 px-10">

        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white hover:scale-105 transition"
          >
            <div className="text-4xl mb-4">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold">
              {item.title}
            </h3>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Features;