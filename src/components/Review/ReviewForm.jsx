import React, { useState, useEffect, useCallback } from "react";
import RatingInput from "./RatingInput";

export default function ReviewForm({ initialData, onSubmit, isLoading }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [destination, setDestination] = useState(
    initialData?.destination || ""
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [image, setImage] = useState(initialData?.image || null);

  const [errors, setErrors] = useState({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    if (image) {
      try {
        const url = URL.createObjectURL(image);
        setImagePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error("이미지 미리보기 생성 오류:", error);
      }
    }
  }, [image]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 제한 (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 이미지 타입 확인
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setImage(file);
    }
  }, []);

  const handleReviewFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newErrors = {};

      if (!title) newErrors.title = "제목을 입력해주세요.";
      if (!destination) newErrors.destination = "여행지명을 입력해주세요.";
      if (rating === 0) newErrors.rating = "별점을 선택해주세요.";
      if (!content) newErrors.content = "내용을 입력해주세요.";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      onSubmit({ title, destination, content, rating, image });
    },
    [title, destination, content, rating, image, onSubmit]
  );

  return (
    <form
      onSubmit={handleReviewFormSubmit}
      className="bg-white p-8 rounded-2xl shadow-md border max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">리뷰 작성하기</h2>

      {/* 제목 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 제주도 혼행 후기"
          aria-invalid={errors.title ? "true" : "false"}
          className={`w-full border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      {/* 여행지명 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          여행지명
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="예: 제주"
          className={`w-full border ${
            errors.destination ? "border-red-500" : "border-gray-300"
          } rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.destination && (
          <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
        )}
      </div>

      {/* 별점 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          별점
        </label>
        <RatingInput value={rating} onChange={setRating} />
        {errors.rating && (
          <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
        )}
      </div>

      {/* 내용 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          내용
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="여행 후기를 자세히 작성해주세요 :)"
          maxLength={1000}
          rows="6"
          aria-invalid={errors.content ? "true" : "false"}
          className={`w-full border ${
            errors.content ? "border-red-500" : "border-gray-300"
          } rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-500">{errors.content}</p>
        )}
        {content && (
          <p className="mt-1 text-xs text-gray-500 text-right">
            {content.length}/1000
          </p>
        )}
      </div>

      {/* 이미지 업로드 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이미지 업로드 (선택)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-sm text-gray-600"
        />
        {image && (
          <div className="mt-3">
            <img
              src={imagePreviewUrl}
              alt="미리보기"
              className="w-32 h-32 object-cover rounded-lg border"
              onError={(e) => {
                console.error("이미지 로딩 오류");
                e.target.src = "기본 이미지 경로"; // 기본 이미지로 대체
              }}
            />
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => {
            // 취소 로직 (예: 이전 페이지로 돌아가기)
            window.history.back();
          }}
          className="w-1/3 bg-gray-200 text-gray-800 font-semibold py-3 rounded-md hover:bg-gray-300 transition"
        >
          취소
        </button>

        {/* 등록 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-2/3 bg-[#0F172A] text-white font-semibold py-3 rounded-md hover:bg-[#1E293B] transition disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              등록 중...
            </div>
          ) : (
            "리뷰 등록하기"
          )}
        </button>
      </div>
    </form>
  );
}
