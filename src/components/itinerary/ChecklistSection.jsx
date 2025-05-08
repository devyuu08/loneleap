import { useState } from "react";
import {
  ClipboardCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";

export default function ChecklistSection({
  checklist = { required: [], optional: [] },
}) {
  const [localChecklist, setLocalChecklist] = useState(checklist);
  const [newItem, setNewItem] = useState({ type: "required", text: "" });

  const handleAddItem = () => {
    if (!newItem.text.trim()) return;

    setLocalChecklist((prev) => ({
      ...prev,
      [newItem.type]: [
        ...prev[newItem.type],
        { text: newItem.text.trim(), checked: false },
      ],
    }));
    setNewItem({ ...newItem, text: "" });
  };

  const toggleCheck = (type, index) => {
    setLocalChecklist((prev) => {
      const updated = [...prev[type]];
      updated[index] = {
        ...updated[index],
        checked: !updated[index].checked,
      };
      return {
        ...prev,
        [type]: updated,
      };
    });
  };

  const handleDeleteItem = (type, index) => {
    setLocalChecklist((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm">
      <h3 className="text-sm text-gray-500 font-semibold mb-4 flex items-center gap-2">
        <ClipboardCheck className="w-4 h-4" />
        여행 준비 체크리스트
      </h3>

      {/* 추가 입력 */}
      <div className="flex gap-2 mb-4">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={newItem.type}
          onChange={(e) =>
            setNewItem((prev) => ({ ...prev, type: e.target.value }))
          }
        >
          <option value="required">필수</option>
          <option value="optional">선택</option>
        </select>
        <input
          type="text"
          className="border rounded px-2 py-1 text-sm flex-1"
          placeholder="항목 추가"
          value={newItem.text}
          onChange={(e) =>
            setNewItem((prev) => ({ ...prev, text: e.target.value }))
          }
          onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
        />
        <button
          onClick={handleAddItem}
          className="bg-gray-800 text-white text-sm px-3 py-1 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 필수 항목 */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#F87171]" />
          필수 준비물
        </h4>
        <ul className="space-y-2 text-sm text-gray-800">
          {localChecklist.required.map((item, idx) => (
            <li key={`r-${idx}`} className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck("required", idx)}
                  className="accent-[#6C8BA4]"
                />
                <span
                  className={item.checked ? "line-through text-gray-400" : ""}
                >
                  {item.text}
                </span>
              </label>
              <button
                onClick={() => handleDeleteItem("required", idx)}
                aria-label="삭제"
              >
                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 선택 항목 */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#6C8BA4]" />
          선택 준비물
        </h4>
        <ul className="space-y-2 text-sm text-gray-800">
          {localChecklist.optional.map((item, idx) => (
            <li key={`r-${idx}`} className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck("optional", idx)}
                  className="accent-[#6C8BA4]"
                />
                <span
                  className={item.checked ? "line-through text-gray-400" : ""}
                >
                  {item.text}
                </span>
              </label>
              <button
                onClick={() => handleDeleteItem("optional", idx)}
                aria-label="삭제"
              >
                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
