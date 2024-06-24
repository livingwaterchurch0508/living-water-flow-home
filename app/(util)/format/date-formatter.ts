import dayjs from "dayjs";

export const convertToDate = (date: string) => {
  const now = dayjs();
  const targetDate = dayjs(date);

  const diffYears = now.diff(targetDate, "year");
  const diffMonths = now.diff(targetDate, "month");
  const diffDays = now.diff(targetDate, "day");

  if (diffYears >= 1) {
    return `${diffYears}년 전`;
  } else if (diffMonths >= 1) {
    return `${diffMonths}달 전`;
  } else if (diffDays >= 1) {
    return `${diffDays}일 전`;
  } else {
    return "방금";
  }
};

export const formattedDate = (date: string) => dayjs(date).format("YYYY-MM-DD");
