"use client";

const testimonials = [
  {
    name: "School Administrator",
    school: "Kampala Secondary School",
    quote:
      "EduBook has simplified fee collection and reporting for our bursar's office.",
  },
  {
    name: "Finance Officer",
    school: "Green Valley Academy",
    quote:
      "Parents appreciate the quick Mobile Money payments and instant receipts.",
  },
  {
    name: "Head Teacher",
    school: "Bright Future School",
    quote:
      "Our administrative workload has reduced significantly since adopting EduBook.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-100 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Trusted by Schools
          </h2>

          <p className="mt-4 text-slate-600">
            Hear what education professionals say about EduBook.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.name + item.school}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >

              <p className="italic text-slate-600">
                "{item.quote}"
              </p>

              <div className="mt-8">

                <h4 className="font-bold">
                  {item.name}
                </h4>

                <p className="text-sm text-slate-500">
                  {item.school}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}