'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AddMeetingPage() {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    level: 'A1',
    date: '',
    time: '',
    link: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Meeting submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        instructor: '',
        level: 'A1',
        date: '',
        time: '',
        link: '',
        description: '',
      });
    }, 3000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">إضافة حصة مباشرة</h1>
        <p className="text-muted-foreground text-lg">أنشئ حصة جديدة للطلاب</p>
      </div>

      {/* Success Message */}
      {submitted && (
        <Card className="border-green-500/50 bg-green-500/10">
          <CardContent className="pt-6">
            <p className="text-green-400">تم إضافة الحصة بنجاح!</p>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>بيانات الحصة</CardTitle>
          <CardDescription>أملأ جميع الحقول المطلوبة</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                عنوان الحصة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="مثال: درس أساسيات اللغة الألمانية"
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Instructor */}
            <div className="space-y-2">
              <label htmlFor="instructor" className="block text-sm font-medium">
                المعلم <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="مثال: أ.د محمد أحمد"
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Level */}
            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium">
                المستوى <span className="text-red-500">*</span>
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="A1">A1 - المستوى الأساسي</option>
                <option value="A2">A2 - المستوى الابتدائي</option>
                <option value="B1">B1 - المستوى المتوسط</option>
                <option value="B2">B2 - المستوى المتوسط المتقدم</option>
                <option value="C1">C1 - المستوى المتقدم</option>
                <option value="C2">C2 - المستوى المتقدم جداً</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium">
                التاريخ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-medium">
                الوقت <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Meeting Link */}
            <div className="space-y-2">
              <label htmlFor="link" className="block text-sm font-medium">
                رابط الحصة (Zoom/Google Meet/etc) <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://meet.example.com/..."
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                وصف الحصة
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="أوضح محتوى الحصة والأهداف..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                إضافة الحصة
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-accent/30"
                onClick={() =>
                  setFormData({
                    title: '',
                    instructor: '',
                    level: 'A1',
                    date: '',
                    time: '',
                    link: '',
                    description: '',
                  })
                }
              >
                إلغاء
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-card/30">
        <CardHeader>
          <CardTitle className="text-lg">نصائح مفيدة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• استخدم عنواناً واضحاً يصف محتوى الحصة</p>
          <p>• تأكد من صحة رابط الحصة قبل النشر</p>
          <p>• اختر وقتاً مناسباً لجميع الطلاب</p>
          <p>• أضف وصفاً شاملاً لمساعدة الطلاب على معرفة ما يتوقعونه</p>
          <p>• تأكد من أن رابط الحصة يعمل قبل الموعد المحدد</p>
        </CardContent>
      </Card>
    </div>
  );
}
