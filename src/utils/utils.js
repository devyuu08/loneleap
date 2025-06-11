import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 조건부 Tailwind 클래스명을 병합하고, 중복을 제거합니다.
 * - clsx로 조건부 클래스 문자열 생성
 * - tailwind-merge로 Tailwind 중복 클래스 정리
 *
 * @param {...(string|false|null|undefined)} inputs - 조건부 클래스명 목록
 * @returns {string} 병합된 클래스 문자열
 */

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
