import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";

export default function ImageUploader({ imageFile, onChange }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!imageFile) return setPreviewUrl(null);

    if (typeof imageFile === "string") {
      setPreviewUrl(imageFile);
      return;
    }

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
          <div className="flex flex-col items-center justify-center text-gray-700">
            <ImageIcon className="w-8 h-8 mb-2 text-gray-600" />
            <p className="text-sm font-medium">
              여행을 표현할 이미지를 업로드해주세요
            </p>
          </div>
        )}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-sm rounded-full bg-white/70 text-gray-800 hover:bg-white shadow-sm border border-gray-200 transition-all backdrop-blur-sm"
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
