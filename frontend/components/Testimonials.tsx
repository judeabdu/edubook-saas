export default function Testimonials() {
  const reviews = [
    { quote: "Migrating our secondary school network to EduBook slashed financial clearing processing times down from weeks to an instant dashboard monitor state.", author: "Nsubuga David", role: "Financial Director" },
    { quote: "The automated billing text notifications completely eliminated the awkward phone calls required to collect balance statements near examination periods.", author: "Nalule Sarah", role: "Headmistress, Kampala Campus" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Trusted by Local Registrars & Heads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-left">
              <p className="text-gray-600 italic text-sm leading-relaxed">"{rev.quote}"</p>
              <div className="mt-4">
                <h4 className="font-bold text-gray-900 text-base">{rev.author}</h4>
                <p className="text-xs text-blue-600 font-medium">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}