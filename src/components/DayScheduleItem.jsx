export default function DayScheduleItem({ time, activity, description }) {
  return (
    <li className="flex gap-2 mb-1">
      <span className="text-gray-500 text-sm w-16">{time}</span>
      <div>
        <p className="font-medium">{activity}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </li>
  );
}
