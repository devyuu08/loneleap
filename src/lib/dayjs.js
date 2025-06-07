/**
 * dayjs 설정 파일
 * - 상대 시간 포맷(`n분 전`)을 사용하기 위해 relativeTime 플러그인을 확장
 * - 전체 프로젝트의 날짜 표기를 한국어(`ko`)로 설정
 * - 설정된 dayjs 인스턴스를 기본 export로 제공하여 전역에서 동일한 포맷 사용 가능
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default dayjs;
