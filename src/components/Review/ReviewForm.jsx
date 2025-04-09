import React, { useState } from "react";
import RatingInput from "./RatingInput";

export default function ReviewForm({ onSubmit, isLoading }) {
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleReviewFormSubmit = (e) => {
    e.preventDefault();
    if (!title || !destination || !content || rating === 0) {
      return alert("제목, 여행지명, 별점, 내용을 모두 입력해주세요!");
    }
    onSubmit({ title, destination, content, rating, image });
  };

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
          className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 별점 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          별점
        </label>
        <RatingInput value={rating} onChange={setRating} />
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
          className="w-full h-36 border border-gray-300 rounded-md px-4 py-2 resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
              src={URL.createObjectURL(image)}
              alt="미리보기"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          </div>
        )}
      </div>

      {/* 등록 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#0F172A] text-white font-semibold py-3 rounded-md hover:bg-[#1E293B] transition disabled:opacity-50"
      >
        {isLoading ? "등록 중..." : "리뷰 등록하기"}
      </button>
    </form>
  );
}
