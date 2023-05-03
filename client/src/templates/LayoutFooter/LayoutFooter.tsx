import React from 'react';
import styles from './LayoutFooter.module.css';

export const LayoutFooter: React.FC<{}> = () => {
  return (
    <footer className={styles.footer}>
      <span>&copy; 2023 Myron R Schippers Jr</span>
    </footer>
  );
};

LayoutFooter.displayName = 'LayoutFooter';
