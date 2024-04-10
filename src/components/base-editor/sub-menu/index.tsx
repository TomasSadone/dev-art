type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Sidemenu = ({ children, className }: Props) => {
  return <aside className={className}>{children}</aside>;
};
