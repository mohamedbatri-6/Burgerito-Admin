interface Order {
  id: string;
  client: string;
  total: number;
  status: "Pending" | "Preparing" | "Out for delivery" | "Delivered";
  time: string;
}

const mockOrders: Order[] = [
  {
    id: "#A102",
    client: "Sarah L.",
    total: 24.9,
    status: "Preparing",
    time: "12:41",
  },
  {
    id: "#A103",
    client: "Hugo M.",
    total: 13.5,
    status: "Out for delivery",
    time: "12:44",
  },
  {
    id: "#A104",
    client: "Lina P.",
    total: 9.9,
    status: "Delivered",
    time: "12:50",
  },
  {
    id: "#A105",
    client: "Alex T.",
    total: 18.5,
    status: "Pending",
    time: "12:55",
  },
];

const statusColors: Record<Order["status"], string> = {
  Pending: "text-yellow-400",
  Preparing: "text-orange-400",
  "Out for delivery": "text-blue-400",
  Delivered: "text-green-400",
};

export default function OrdersPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text-main)" }}>
        Orders
      </h1>

      <p className="text-gray-400 text-sm mt-2">
        Orders fetched from Burgerito (mock data for now)
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-white/10">
          <thead
            className="text-left text-gray-300"
            style={{ backgroundColor: "var(--color-bg-card)" }}
          >
            <tr>
              <th className="p-3 border-b border-white/10">Order ID</th>
              <th className="p-3 border-b border-white/10">Client</th>
              <th className="p-3 border-b border-white/10">Total (€)</th>
              <th className="p-3 border-b border-white/10">Status</th>
              <th className="p-3 border-b border-white/10">Time</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition">
                <td className="p-3 border-b border-white/10 text-gray-100">{order.id}</td>
                <td className="p-3 border-b border-white/10 text-gray-300">{order.client}</td>
                <td className="p-3 border-b border-white/10 text-gray-300">
                  €{order.total.toFixed(2)}
                </td>
                <td
                  className={`p-3 border-b border-white/10 font-semibold ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </td>
                <td className="p-3 border-b border-white/10 text-gray-400">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
