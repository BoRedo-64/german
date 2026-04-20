'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <img
            src="/german.png"
            alt="German Logo"
            className="h-15 w-auto"
          />
          <Link href="/login">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              دخول
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 md:px-6 py-20">
        <div className="max-w-3xl w-full text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            تعلم اللغة الألمانية بطريقة حديثة وفعالة
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed">
            منصة متكاملة لتعلم اللغة الألمانية من الصفر إلى الاحتراف مع تمارين تفاعلية وحصص مباشرة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg h-12">
                ابدأ التعلم الآن
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 border-accent/30 hover:bg-card">
              تعرف على المزيد
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card/30 py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">
            لماذا اختيار منصتنا؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'تمارين تفاعلية',
                description: 'مجموعة شاملة من التمارين المتنوعة من مستوى A1 إلى C2',
              },
              {
                title: 'تتبع التقدم',
                description: 'راقب تقدمك يومياً مع إحصائيات مفصلة وشاملة',
              },
              {
                title: 'حصص مباشرة',
                description: 'تواصل مع معلمين متخصصين عبر حصص تفاعلية مباشرة',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border/40 bg-background/40 hover:bg-background/60 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-3 text-accent">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-balance">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-balance">
            جاهز للبدء في رحلتك مع اللغة الألمانية؟
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            انضم إلى آلاف الطلاب الذين يتعلمون اللغة الألمانية معنا
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg h-12">
              ابدأ الآن مجاناً
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/20 py-8 px-4 md:px-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>جميع الحقوق محفوظة © 2024 منصة تعلم اللغة الألمانية</p>
        </div>
      </footer>
    </div>
  );
}
