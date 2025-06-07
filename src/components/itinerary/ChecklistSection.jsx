import React from "react";
import {
  ClipboardCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";

/**
 * 여행 일정 작성 페이지의 체크리스트 섹션
 * - 필수 / 선택 준비물을 항목별로 나누어 관리
 * - 항목 추가 / 체크 / 삭제 기능 포함
 * - 필수 항목은 Shield 아이콘, 선택 항목은 Shopping 아이콘으로 구분
 */

function ChecklistSection({
  localChecklist,
  newItem,
  setNewItem,
  handleAddItem,
  toggleCheck,
  handleDeleteItem,
}) {
  return (
    <section
      aria-labelledby="checklist-title"
      className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm"
    >
      {/* 제목 */}
      <h3 className="text-sm text-gray-500 font-semibold mb-4 flex items-center gap-2">
        <ClipboardCheck className="w-4 h-4" />
        여행 준비 체크리스트
      </h3>

      {/* 항목 추가 입력 영역 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddItem();
        }}
        className="flex gap-2 mb-4"
        aria-label="체크리스트 항목 추가 폼"
      >
        <label className="sr-only" htmlFor="item-type">
          항목 유형 선택
        </label>
        <select
          id="item-type"
          className="border rounded px-2 py-1 text-sm"
          value={newItem.type}
          onChange={(e) =>
            setNewItem((prev) => ({ ...prev, type: e.target.value }))
          }
        >
          <option value="required">필수</option>
          <option value="optional">선택</option>
        </select>

        <label className="sr-only" htmlFor="item-text">
          항목 내용 입력
        </label>
        <input
          id="item-text"
          type="text"
          className="border rounded px-2 py-1 text-sm flex-1"
          placeholder="항목 추가"
          value={newItem.text}
          onChange={(e) =>
            setNewItem((prev) => ({ ...prev, text: e.target.value }))
          }
          onKeyUp={(e) => e.key === "Enter" && handleAddItem()}
        />
        <button
          type="submit"
          className="bg-gray-800 text-white text-sm px-3 py-1 rounded"
          aria-label="항목 추가"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* 항목 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 필수 준비물 */}
        <section
          aria-labelledby="required-title"
          className="border rounded-xl p-4"
        >
          <h4
            id="required-title"
            className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
          >
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
                  aria-label="항목 삭제"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* 선택 준비물 */}
        <section
          aria-labelledby="optional-title"
          className="border rounded-xl p-4"
        >
          <h4
            id="optional-title"
            className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
          >
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
                    aria-label={`선택 준비물: ${item.text}`}
                  />
                  <span
                    className={item.checked ? "line-through text-gray-400" : ""}
                  >
                    {item.text}
                  </span>
                </label>
                <button
                  onClick={() => handleDeleteItem("optional", idx)}
                  aria-label="항목 삭제"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default React.memo(ChecklistSection);
