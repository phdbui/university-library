import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <main className="root-container">{children}</main>;
};

export default RootLayout;
