export const formatTotalWeighToUi = (totalWeight: number) => {
  const totalWeightInTons = totalWeight / 1000;

  return `${totalWeightInTons}t`;
};
