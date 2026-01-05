import './globals.css';
import LazorProviderWrapper from '@/components/LazorProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">
        <LazorProviderWrapper>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </LazorProviderWrapper>
      </body>
    </html>
  );
}