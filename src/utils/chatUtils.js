import dayjs from "dayjs";

/**
 * 채팅 메시지 목록에 날짜 구분 시스템 메시지를 삽입합니다.
 * @param {Array} messages - 정렬된 메시지 배열
 * @returns {Array} 날짜 구분이 삽입된 메시지 배열
 */

export function insertDateSeparators(messages) {
  const result = [];
  let lastDate = null;

  messages.forEach((msg) => {
    const date = dayjs(msg.createdAt?.toDate?.() || msg.createdAt).format(
      "YYYY-MM-DD"
    );

    if (date !== lastDate) {
      result.push({
        id: `date-${date}`,
        type: "system",
        systemType: "date",
        message: dayjs(date).format("YYYY년 M월 D일"),
        createdAt: msg.createdAt,
      });
      lastDate = date;
    }

    result.push(msg);
  });

  return result;
}
