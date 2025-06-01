import dayjs from "dayjs";

export const insertDateSeparators = (messages) => {
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
};
