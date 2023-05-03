import React from 'react';
import styles from './ActionPanel.module.css';
import { IActionPanelProps } from './types';

export const ActionPanel: React.FC<IActionPanelProps> = ({
  children,
  isSelected,
}) => {
  return (
    <div className={`${styles.panel} ${isSelected ? styles.isSelected : ''}`}>
      {children}
    </div>
  );
};

ActionPanel.displayName = 'ActionPanel';
