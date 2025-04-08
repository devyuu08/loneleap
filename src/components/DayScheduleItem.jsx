export default function DayScheduleItem({ time, activity, description }) {
  return (
    <li className="flex items-start space-x-4">
      <span className="min-w-[70px] text-sm text-gray-500 whitespace-nowrap">
        {time}
      </span>
      <div>
        <p className="font-medium">{activity}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </li>
  );
}
