import { ActionsBar } from './actions-bar';
import { Sidemenu } from './sub-menu';
import { Toolsbar } from './toolbar';
import style from './style.module.sass';
import './reset.sass';

type ReactNode = React.ReactNode;

type Props = {
  ActionsBarChildren: ReactNode;
  ToolsBarChildren?: ReactNode;
  Sidebar: ReactNode;
  SidemenuChildren?: ReactNode;
  children: ReactNode;
};
export const Editor = ({
  ActionsBarChildren,
  ToolsBarChildren,
  Sidebar,
  SidemenuChildren,
  children,
}: Props) => {
  return (
    <div className={style.editor}>
      <ActionsBar>{ActionsBarChildren}</ActionsBar>
      <div className={style.layout}>
        {Sidebar}
        <Sidemenu className={style.overflowAuto}>{SidemenuChildren}</Sidemenu>
        <div className={[style.toolbarAndEditor, style.overflowAuto].join(' ')}>
          <Toolsbar>{ToolsBarChildren}</Toolsbar>
          <main className={[style.main, style.overflowAuto].join(' ')}>{children}</main>
        </div>
      </div>
    </div>
  );
};
