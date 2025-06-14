import PropTypes from "prop-types";
import HeroSection from "@/components/common/layout/HeroSection";
import HeroHeader from "@/components/common/layout/HeroHeader";
import { Search } from "lucide-react";

export default function HeroWithFilterSearch({
  imageSrc,
  title,
  subtitle,
  countLabel,
  count,
  filters = [],
  activeFilter,
  onFilterChange,
  searchKeyword,
  onSearchChange,
  searchPlaceholder = "검색어 입력",
  showSearch = true,
}) {
  const filterButtonBase =
    "px-4 py-1.5 rounded-full text-sm border whitespace-nowrap transition";
  const filterButtonActive = "bg-white text-black";
  const filterButtonInactive = "bg-white/20 text-white hover:bg-white/30";

  const searchInputClass =
    "w-full pl-10 pr-4 py-2 rounded-full bg-white/90 text-gray-800 text-sm border border-white focus:outline-none focus:ring-1 focus:ring-white";

  return (
    <HeroSection imageSrc={imageSrc}>
      <div className="space-y-6 w-full flex flex-col items-center">
        <HeroHeader
          title={title}
          subtitle={subtitle}
          countLabel={countLabel}
          count={count}
        />

        <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 w-full">
          {/* 필터 */}
          <div className="flex flex-wrap justify-center gap-2 max-w-full">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`${filterButtonBase} ${
                  activeFilter === filter
                    ? filterButtonActive
                    : filterButtonInactive
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* 검색창 */}
          {showSearch && (
            <div className="relative w-full sm:w-auto max-w-xs min-w-[200px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/70 w-4 h-4" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="검색어 입력"
                className={searchInputClass}
              />
            </div>
          )}
        </div>
      </div>
    </HeroSection>
  );
}

HeroWithFilterSearch.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  countLabel: PropTypes.string,
  count: PropTypes.number,
  filters: PropTypes.array,
  activeFilter: PropTypes.string,
  onFilterChange: PropTypes.func,
  searchKeyword: PropTypes.string,
  onSearchChange: PropTypes.func,
  searchPlaceholder: PropTypes.string,
};
