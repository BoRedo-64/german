'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AddExercisePage() {
  const [formData, setFormData] = useState({
    title: '',
    level: 'A1',
    type: 'quiz',
    description: '',
    content: '',
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
    console.log('Submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ title: '', level: 'A1', type: 'quiz', description: '', content: '' });
    }, 3000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">إضافة تمرين جديد</h1>
        <p className="text-muted-foreground text-lg">أنشئ تمرين جديد للطلاب</p>
      </div>

      {/* Success Message */}
      {submitted && (
        <Card className="border-green-500/50 bg-green-500/10">
          <CardContent className="pt-6">
            <p className="text-green-400">تم إضافة التمرين بنجاح!</p>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>بيانات التمرين</CardTitle>
          <CardDescription>أملأ جميع الحقول المطلوبة</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                اسم التمرين <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="مثال: تعلم الأرقام"
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

            {/* Type */}
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium">
                نوع التمرين <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="quiz">اختبار تفاعلي</option>
                <option value="pdf">ملف PDF</option>
                <option value="video">فيديو تعليمي</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                الوصف <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="أوضح ماذا سيتعلم الطالب من هذا التمرين"
                required
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium">
                محتوى التمرين <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="أدخل محتوى التمرين هنا..."
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                إضافة التمرين
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-accent/30"
                onClick={() =>
                  setFormData({ title: '', level: 'A1', type: 'quiz', description: '', content: '' })
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
          <p>• اختر عنواناً واضحاً وجذاباً للتمرين</p>
          <p>• تأكد من أن مستوى التمرين مناسب للمتعلمين</p>
          <p>• اكتب وصفاً شاملاً للتمرين لمساعدة الطلاب على فهم الهدف</p>
          <p>• تأكد من صحة المحتوى والنصوص قبل النشر</p>
        </CardContent>
      </Card>
    </div>
  );
}
