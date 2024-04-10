import style from './style.module.sass';

type Props = {
  children: React.ReactNode;
};

export const ActionsBar = ({ children }: Props) => {
  return <div className={style.actionsBar}>{children}</div>;
};
