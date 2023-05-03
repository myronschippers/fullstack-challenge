import { PropsWithChildren } from 'react';

export interface IActionPanelProps extends PropsWithChildren {
  onClick: () => void;
}
