import DayScheduleItem from "./DayScheduleItem";

export default function DayScheduleList({ days }) {
  if (!days || days.length === 0) return null;

  return (
    <div className="mt-10 space-y-6">
      {days.map((day) => (
        <section key={day.day} className="border p-4 rounded-md">
          <h3 className="font-semibold text-lg mb-2">
            DAY {day.day} · {day.date}
          </h3>
          <ul>
            {day.schedules.map((item, idx) => (
              <DayScheduleItem
                key={item.id || `${day.day}-${idx}`}
                time={item.time}
                activity={item.activity}
                description={item.description}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
