function LiveDemo() {
  return (
    <section className="bg-slate-900 py-20 px-6 text-white">

      <h2 className="text-4xl font-bold text-center mb-8">
        Try Live Demo
      </h2>

      <div className="max-w-3xl mx-auto">

        <textarea
          rows="5"
          placeholder="Paste news article here..."
          className="w-full p-4 rounded-xl text-black"
        />

        <button
          className="mt-4 bg-blue-600 px-8 py-3 rounded-xl"
        >
          Analyze
        </button>

        <div className="mt-6 bg-white/10 p-6 rounded-xl">
          <h3 className="text-2xl font-bold">
            Fake News Probability
          </h3>

          <p className="mt-3 text-red-400">
            82% Fake
          </p>
        </div>

      </div>

    </section>
  );
}

export default LiveDemo;