export const format = (date: Date | string | undefined) => {
  if (!date) {
    return "";
  }

  let d: Date;

  if (typeof date === "string") {
    d = new Date(date);
  }

  return (
    getWeekday(d) +
    ", " +
    d.toLocaleDateString("pl-PL", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Warsaw",
    })
  );
};

const getWeekday = (date: Date): string => {
  switch (date.getDay()) {
    case 0:
      return "nd";
    case 1:
      return "pn";
    case 2:
      return "wt";
    case 3:
      return "śr";
    case 4:
      return "cz";
    case 5:
      return "pt";
    case 6:
      return "sb";
  }
};
