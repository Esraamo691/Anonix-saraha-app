export default function MessageStats({
  totalMessages,
  unreadMessages,
  likedMessages,
  thisWeekMessages,
}) {
  const stats = [
    {
      label: "Total",
      value: totalMessages,
    },
    {
      label: "Unread",
      value: unreadMessages,
    },
    {
      label: "Liked",
      value: likedMessages,
    },
    {
      label: "This Week",
      value: thisWeekMessages,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <p className="text-gray-400 text-xs">{s.label}</p>
          <p className="text-white text-xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
