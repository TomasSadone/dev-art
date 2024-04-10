type Props = {
  hexCode: string;
  className?: string;
};

export const Color = ({ hexCode, className }: Props) => (
  <div className={className} style={{ backgroundColor: hexCode }} />
);
