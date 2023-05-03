import React from 'react';
import { LayoutFooter } from '../LayoutFooter';
import { LayoutHeader } from '../LayoutHeader';
import { ILayoutProps } from './types';

export const Layout: React.FC<ILayoutProps> = ({
  title = 'This is the default title',
  children,
}) => {
  return (
    <div>
      <LayoutHeader />
      <main>{children}</main>
      <LayoutFooter />
    </div>
  );
};

Layout.displayName = 'Layout';
