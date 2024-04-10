import style from './style.module.sass';

type Props = {
  children: React.ReactNode;
};

export const Toolsbar = ({ children }: Props) => {
  return <div className={style.toolsbar}>{children}</div>;
};
