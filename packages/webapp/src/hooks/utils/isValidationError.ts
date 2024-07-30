export type ValidationError = {
  type: "validation";
  message: string;
  errors: { path: string[]; message: string }[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidationError = (err: any | Error): err is ValidationError => {
  return err.type === "validation";
};
