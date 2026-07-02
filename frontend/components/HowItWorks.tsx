"use client";

const steps = [
  {
    number: "01",
    title: "Register School",
    text: "Create your school's secure EduBook workspace.",
  },
  {
    number: "02",
    title: "Add Students",
    text: "Import or register all students in minutes.",
  },
  {
    number: "03",
    title: "Collect Fees",
    text: "Receive secure Mobile Money payments instantly.",
  },
  {
    number: "04",
    title: "Track & Report",
    text: "Monitor payments and generate reports anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            How EduBook Works
          </h2>

          <p className="mt-4 text-slate-600">
            Four simple steps to digitize your institution.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">

          {steps.map((step) => (

            <div
              key={step.number}
              className="rounded-2xl border bg-slate-50 p-8 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                {step.number}
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-3 text-slate-600">
                {step.text}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}