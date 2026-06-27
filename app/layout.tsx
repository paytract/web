import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { AppProvider } from '@/components/providers/AppProvider';

export const metadata: Metadata = {
  title: 'PayTract',
  description: 'Start managing client payments the smarter way.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
