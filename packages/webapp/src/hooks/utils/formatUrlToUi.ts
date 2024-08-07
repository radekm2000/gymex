export const formatUrlToUi = (url: string) => {
  const trimmedUrl = url.replace("/", "");

  if (url.startsWith("/exercises/")) {
    const slashIndex = url.indexOf("/", 2);
    return trimmedUrl.charAt(0).toUpperCase() + trimmedUrl.slice(1, slashIndex - 1);
  }
  return trimmedUrl.charAt(0).toUpperCase() + trimmedUrl.slice(1);
};
