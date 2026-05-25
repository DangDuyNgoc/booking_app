const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

const metrics = [
  { label: "Completed orders", value: "0" },
  { label: "Online drivers", value: "0" },
  { label: "Pending payouts", value: "0" },
  { label: "Revenue today", value: "0 VND" }
];

export default function DashboardPage() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-600">API: {apiUrl}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <article className="rounded-lg border border-slate-200 bg-white p-4" key={metric.label}>
            <p className="text-sm text-slate-500">{metric.label}</p>
            <strong className="mt-2 block text-2xl">{metric.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
