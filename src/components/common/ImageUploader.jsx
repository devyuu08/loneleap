import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";

export default function ImageUploader({ imageFile, onChange }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!imageFile) return setPreviewUrl(null);
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      alert("5MB 이하의 이미지 파일만 업로드 가능합니다.");
      return;
    }
    onChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        대표 이미지 (선택)
      </label>
      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-sm text-gray-500">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="미리보기"
            className="w-32 h-32 object-cover rounded-lg mx-auto"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="w-6 h-6 mb-2 text-gray-400" />
            여행을 표현할 수 있는 이미지를 업로드해주세요
          </div>
        )}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          >
            이미지 선택
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
