import style from './style.module.sass';

export type Props = {
  buttons: {
    icon: string;
    title: string;
    onClick: (e: React.MouseEvent) => void;
    isSelected?: boolean;
  }[];
};

export const Sidebar = ({ buttons }: Props) => {
  return (
    <div className={style.sidebar}>
      <div>
        {buttons.map((button, i) => (
          <button
            key={button.title}
            onClick={button.onClick}
            className={`${style.button} ${
              button.isSelected && style.selected
            } ${
              buttons[i - 1]?.isSelected
                ? style.prevSelected
                : buttons[i + 1]?.isSelected
                ? style.nextSelected
                : null
            }`}
          >
            <img
              src={button.icon}
              alt=''
            />
            <span>{button.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
