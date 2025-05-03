export const getInitials = (name: string): string => {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join("");
};

export const dateTimeFormatter = (dateTime: string): string => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Date(dateTime).toLocaleString("en-US", dateTimeOptions);
};

export const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
};

export const deslugify = (slug: string) => {
  return slug.trim().replace("-", " ");
};
