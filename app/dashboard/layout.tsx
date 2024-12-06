export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-pagebg">
        {children}
      </div>
    );
  }
  