import Protected from "@/components/Protected";
import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <div
        className="w-full min-h-screen"
        style={{
          backgroundColor: "var(--color-bg-page)",
          color: "var(--color-text-main)",
        }}
      >
        <AdminHeader />
        <main className="w-full max-w-6xl mx-auto p-8">{children}</main>
      </div>
    </Protected>
  );
}
