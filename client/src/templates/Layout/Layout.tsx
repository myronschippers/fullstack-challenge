import React from 'react';
import { LayoutFooter } from '../LayoutFooter';
import { LayoutHeader } from '../LayoutHeader';
import styles from './Layout.module.css';
import { ILayoutProps } from './types';

export const Layout: React.FC<ILayoutProps> = ({
  title = 'This is the default title',
  children,
}) => {
  return (
    <div className={styles.layoutContainer}>
      <LayoutHeader />
      <main className={styles.layoutMain}>{children}</main>
      <LayoutFooter />
    </div>
  );
};

Layout.displayName = 'Layout';
