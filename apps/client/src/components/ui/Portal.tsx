import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PropsType = {
  show: boolean;
  children: ReactNode | ReactNode[];
};
export default function Portal({ show, children }: PropsType) {
  return show ? createPortal(<>{children}</>, document.body) : null;
}
