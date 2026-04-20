'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 🔐 1. Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setIsLoading(false);
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      return;
    }

    const user = data.user;

    // 🧠 2. Get role from profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    setIsLoading(false);

    if (profileError || !profile) {
      setError('حدث خطأ أثناء تحميل بيانات المستخدم');
      return;
    }

    // 🚀 3. Redirect based on role
    if (profile.is_admin) {
      router.replace('/admin/exercises');
    } else {
      router.replace('/dashboard/stats');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground" dir="rtl">
      {/* Navbar */}
      <nav className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold text-accent cursor-pointer hover:text-accent/90 transition-colors">
              اللغة الألمانية
            </div>
          </Link>
          <div className="flex gap-2">
            <Link href="/signup">
              <Button variant="outline" className="border-accent/30 hover:bg-card">
                إنشاء حساب
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Section */}
      <section className="flex-1 flex items-center justify-center px-4 md:px-6 py-20">
        <Card className="w-full max-w-md bg-card border-border/40">
          <div className="p-8 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-accent">تسجيل الدخول</h1>
              <p className="text-muted-foreground">
                أدخل بيانات حسابك للوصول إلى المنصة
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  required
                />
              </div>

              {/* Error */}
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed h-10 text-base"
              >
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>

            {/* Signup */}
            <p className="text-center text-sm text-muted-foreground">
              ليس لديك حساب؟{' '}
              <Link
                href="/signup"
                className="text-accent hover:text-accent/90 transition-colors font-medium"
              >
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/20 py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>جميع الحقوق محفوظة © 2024 منصة تعلم اللغة الألمانية</p>
        </div>
      </footer>
    </div>
  );
}