export const formatUrlToUi = (url: string) => {
  const trimmedUrl = url.replace("/", "");

  if (url.startsWith("/exercises/") && url.includes("/statistics")) {
    return "Exercise statistics";
  } else if (url.startsWith("/exercises/")) {
    const slashIndex = url.indexOf("/", 2);
    return (
      trimmedUrl.charAt(0).toUpperCase() + trimmedUrl.slice(1, slashIndex - 1)
    );
  } else if (url.startsWith("/training")) {
    const firstPart = trimmedUrl.split("/")[0].replace("-", " ");
    return firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase();
  } else if (url.startsWith("/active-workout")) {
    return "Active workout";
  } else if (url.startsWith("/workouts/history")) {
    return "History";
  } else if (url.startsWith("/workout")) {
    return "Workout summary";
  } else {
    return trimmedUrl.charAt(0).toUpperCase() + trimmedUrl.slice(1);
  }
};
