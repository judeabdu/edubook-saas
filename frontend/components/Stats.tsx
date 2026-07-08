export default function Stats() {
  const stats = [
    { id: 1, name: 'Active Institutions', value: '150+' },
    { id: 2, name: 'Fees Processed Safely', value: '$2.4M+' },
    { id: 3, name: 'Parent Satisfaction Rate', value: '99.2%' },
  ];

  return (
    <section className="bg-blue-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <dd className="text-4xl font-extrabold text-white sm:text-5xl">{stat.value}</dd>
              <dt className="mt-2 text-sm font-medium text-blue-100 uppercase tracking-wider">{stat.name}</dt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}