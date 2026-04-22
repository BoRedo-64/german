'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    if (formData.password.length < 6) {
      setError('يجب أن تكون كلمة المرور 6 أحرف على الأقل');
      return;
    }

    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/login';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold text-accent cursor-pointer hover:text-accent/90 transition-colors">
              اللغة الألمانية
            </div>
          </Link>
          <div className="flex gap-2">
            <Link href="/login">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Signup Section */}
      <section className="flex-1 flex items-center justify-center px-4 md:px-6 py-20">
        <Card className="w-full max-w-md bg-card border-border/40">
          <div className="p-8 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-accent">إنشاء حساب جديد</h1>
              <p className="text-muted-foreground">
                انضم إلينا وابدأ رحلتك في تعلم اللغة الألمانية
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أحمد محمد"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  required
                />
              </div>

              {/* Terms and Conditions */}
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border/40 bg-background accent-accent mt-0.5"
                  required
                />
                <span className="text-muted-foreground">
                  أوافق على{' '}
                  <Link href="#" className="text-accent hover:text-accent/90">
                    الشروط والأحكام
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed h-10 text-base"
              >
                {isLoading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border/40"></div>
              <span className="text-sm text-muted-foreground">أو</span>
              <div className="flex-1 h-px bg-border/40"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              هل لديك حساب بالفعل؟{' '}
              <Link href="/login" className="text-accent hover:text-accent/90 transition-colors font-medium">
                سجل الدخول
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
