import React from 'react';
import styles from './LayoutHeader.module.css';
import logo from './logo.svg';

export const LayoutHeader: React.FC<{}> = () => {
  return (
    <header className={styles.header}>
      <img src={logo} className={styles.headerLogo} alt="logo" />
      <h1 className={styles.headerTitle}>Fullstack Challenge</h1>
    </header>
  );
};

LayoutHeader.displayName = 'LayoutHeader';
