type Props = {
  progress: number | undefined;
  requiredProgress: number | undefined;
};

export const AchievementProgressBar = ({
  progress = 0,
  requiredProgress = 0,
}: Props) => {
  const progressPercentage = Math.min((progress / requiredProgress) * 100, 100);
  console.log(progressPercentage);
  return (
    <div className="w-full h-1 rounded-full bg-secondary-ultraLight opacity-80">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full rounded-l-full bg-secondary-light opacity-100 }`}
      ></div>
    </div>
  );
};
