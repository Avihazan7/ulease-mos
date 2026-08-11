export const metadata = {
  title: 'ULease Deal Score API 🎯',
  description:
    'ULease — the deterministic Deal Score engine. Phase 1: pure, explainable decision engines. Same input, same output.',
  robots: { index: false },
};

export const viewport = {
  themeColor: '#2563eb',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
