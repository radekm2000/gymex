export const formatStringToFirstLetterUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
