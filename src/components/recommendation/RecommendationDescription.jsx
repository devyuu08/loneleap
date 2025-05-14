import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Map, MapPin, Quote } from "lucide-react";

export default function RecommendationDescription({
  description,
  locationInfo,
}) {
  return (
    <section className="py-16 border-b px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 상세 설명 */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <p className="text-neutral-800 text-[15px] leading-relaxed tracking-wide mb-5">
                {children}
              </p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-gray-300 pl-4 italic text-sm leading-relaxed mb-6 [&>p]:text-gray-500">
                {children}
              </blockquote>
            ),
          }}
        >
          {description}
        </ReactMarkdown>

        {/* 구분선 */}
        <div className="border-t border-gray-200 my-10" />

        {/* 위치 정보 */}
        <p className="text-sm text-gray-500 flex items-center gap-2 mt-8">
          <MapPin className="w-4 h-4" />
          {locationInfo}
        </p>
      </div>
    </section>
  );
}
