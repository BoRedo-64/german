'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  // 🔐 AUTH + ROLE CHECK
  useEffect(() => {
    const checkAccess = async () => {
      const { data } = await supabase.auth.getUser();

      // ❌ Not logged in
      if (!data.user) {
        router.replace('/login');
        return;
      }

      // 🔎 Check role
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data.user.id)
        .single();

      // 👑 Admin → redirect to admin panel
      if (!error && profile?.is_admin) {
        router.replace('/admin/exercises');
        return;
      }

      // ✅ Normal user
      setLoading(false);
    };

    checkAccess();
  }, [router]);

  // 🔐 LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  const navItems = [
    {
      label: 'التمارين',
      href: '/dashboard/exercises',
      key: 'exercises',
    },
    {
      label: 'الإحصائيات',
      href: '/dashboard/stats',
      key: 'stats',
    },
    {
      label: 'الانضمام إلى الحصة',
      href: '/dashboard/meeting',
      key: 'meeting',
    },
  ];

  // ⛔ Prevent flash before auth check
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row-reverse h-screen bg-background" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-64 bg-sidebar border-l border-sidebar-border transform transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <img
              src="/german.png"
              alt="German Logo"
              className="h-20 w-auto mr-5"
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-sidebar-foreground hover:text-sidebar-accent"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href}>
                <button
                  //onClick={() => setSidebarOpen(false)}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.key)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="space-y-2 border-t border-sidebar-border pt-6">
            <button
              onClick={handleLogout}
              className="w-full text-sidebar-foreground hover:text-red-400 text-sm transition-colors py-2"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col mr-0 md:mr-64 overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border/40 bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-foreground hover:text-accent"
          >
            <Menu size={24} />
          </button>

          <div className="ml-auto"></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">{children}</div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}