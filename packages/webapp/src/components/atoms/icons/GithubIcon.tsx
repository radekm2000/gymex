import githubLogo from "../../../assets/github-mark-white.png";

type Props = {
  width?: number;
  height?: number;
};

export const GithubIcon = ({ width, height }: Props) => {
  return <img src={githubLogo} width={width} height={height} />;
};
