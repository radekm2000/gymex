export const formatUrlToUi = (url: string) => {
  const trimmedUrl = url.replace("/", "");
  return trimmedUrl.charAt(0).toUpperCase() + trimmedUrl.slice(1);
};
