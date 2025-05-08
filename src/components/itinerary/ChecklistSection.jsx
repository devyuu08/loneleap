import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { updateChecklist } from "services/itineraryService";
import { useParams } from "react-router-dom";
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
  const { id: itineraryId } = useParams();
  const [localChecklist, setLocalChecklist] = useState({
    required: [],
    optional: [],
  });
  const [newItem, setNewItem] = useState({ type: "required", text: "" });

  // checklist 데이터가 문자열 배열일 경우 대비해서 변환
  useEffect(() => {
    const convertItems = (items) =>
      items.map((item) =>
        typeof item === "string" ? { text: item, checked: false } : item
      );
    const converted = {
      required: convertItems(checklist.required || []),
      optional: convertItems(checklist.optional || []),
    };
    setLocalChecklist(converted);
  }, [checklist]);

  // 자동 저장
  const debouncedSave = debounce((checklistToSave) => {
    if (!itineraryId) return;
    updateChecklist(itineraryId, checklistToSave).catch((err) =>
      console.error("자동 저장 실패:", err)
    );
  }, 500);

  useEffect(() => {
    if (
      localChecklist.required.length === 0 &&
      localChecklist.optional.length === 0
    )
      return;
    debouncedSave(localChecklist);
    return () => debouncedSave.cancel();
  }, [localChecklist, debouncedSave]);

  // 항목 추가
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

  // 체크 상태 토글
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

  // 항목 삭제
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

      {/* 항목 추가 */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 필수 항목 */}
        <div className="border rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F87171]" />
            필수 준비물
          </h4>
          <ul className="space-y-2 text-sm text-gray-800">
            {localChecklist.required.map((item, idx) => (
              <li
                key={`r-${idx}`}
                className="flex justify-between items-center"
              >
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
        <div className="border rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#6C8BA4]" />
            선택 준비물
          </h4>
          <ul className="space-y-2 text-sm text-gray-800">
            {localChecklist.optional.map((item, idx) => (
              <li
                key={`o-${idx}`}
                className="flex justify-between items-center"
              >
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
    </div>
  );
}
