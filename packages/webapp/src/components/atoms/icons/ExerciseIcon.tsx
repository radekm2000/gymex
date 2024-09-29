type Props = {
  width?: number;
  height?: number;
  icon: string;
};

export const ExerciseIcon = ({ width, height, icon }: Props) => {
  return <img height={height} width={width} src={icon} />;
};
