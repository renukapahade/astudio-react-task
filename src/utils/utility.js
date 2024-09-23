const toTitleCase = (str) => {
  // Handle camelCase or snake_case formats and convert to Title Case
  return str
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters (for camelCase)
    .replace(/_/g, " ") // Replace underscores with spaces (for snake_case)
    .replace(
      /\w\S*/g,
      (
        word // Capitalize the first letter of each word
      ) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
};
export { toTitleCase };
