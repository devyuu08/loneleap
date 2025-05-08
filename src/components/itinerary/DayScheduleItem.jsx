export default function DayScheduleItem({ time, activity, description }) {
  return (
    <li className="flex items-start space-x-4">
      <div className="min-w-[60px] text-sm text-gray-500 font-semibold">
        {time || "--:--"}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{activity}</p>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </li>
  );
}
