import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { updateChecklist } from "@/services/itinerary/updateChecklist";
import { useParams } from "react-router-dom";
import ChecklistSection from "@/components/itinerary/ChecklistSection";
import { toast } from "react-hot-toast";
/**
 * ChecklistSectionContainer
 * - 필수/선택 준비물 관리 및 자동 저장 처리
 */

export default function ChecklistSectionContainer({ checklist }) {
  const { id: itineraryId } = useParams();
  const [localChecklist, setLocalChecklist] = useState({
    required: [],
    optional: [],
  });
  const [newItem, setNewItem] = useState({ type: "required", text: "" });

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

  const debouncedSave = debounce((checklistToSave) => {
    if (!itineraryId) return;
    updateChecklist(itineraryId, checklistToSave).catch(() =>
      toast.error("자동 저장에 실패했습니다.")
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
    <ChecklistSection
      localChecklist={localChecklist}
      newItem={newItem}
      setNewItem={setNewItem}
      handleAddItem={handleAddItem}
      toggleCheck={toggleCheck}
      handleDeleteItem={handleDeleteItem}
    />
  );
}
