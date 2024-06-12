export const format = (date: Date | string | undefined) => {
  if (!date) {
    return "";
  }

  let d: Date;

  if (typeof date === "string") {
    d = new Date(date);
  }

  return d.toLocaleDateString("pl-PL", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  });
};
