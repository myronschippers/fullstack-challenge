import React from 'react';
import styles from './ActionPanel.module.css';
import { IActionPanelProps } from './types';

export const ActionPanel: React.FC<IActionPanelProps> = ({ children }) => {
  return <div className={styles.panel}>{children}</div>;
};

ActionPanel.displayName = 'ActionPanel';
