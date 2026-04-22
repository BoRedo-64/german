'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const LEVELS = [
  { id: 'A1', label: 'A1 - المستوى الأساسي' },
  { id: 'A2', label: 'A2 - المستوى الابتدائي' },
  { id: 'B1', label: 'B1 - المستوى المتوسط' },
  { id: 'B2', label: 'B2 - المستوى المتوسط المتقدم' },
];

export default function ExercisesPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const mockExercises = {
    A1: [
      { id: 1, title: 'التحية والتعريف', type: 'quiz', description: 'تعلم طرق التحية والتعريف عن نفسك' },
      { id: 2, title: 'الأرقام والألوان', type: 'pdf', description: 'قائمة شاملة بالأرقام والألوان بالألمانية' },
      { id: 3, title: 'الأطعمة الشائعة', type: 'quiz', description: 'اختبر معرفتك بأسماء الأطعمة' },
    ],
    A2: [
      { id: 4, title: 'الماضي البسيط', type: 'quiz', description: 'تعلم الأفعال في الماضي البسيط' },
      { id: 5, title: 'الهوايات', type: 'pdf', description: 'كيفية التحدث عن هواياتك المفضلة' },
      { id: 6, title: 'الحياة اليومية', type: 'quiz', description: 'اختبر معرفتك بمفردات الحياة اليومية' },
    ],
    B1: [
      { id: 7, title: 'الشروط والافتراضات', type: 'quiz', description: 'تعلم الجمل الشرطية' },
      { id: 8, title: 'القراءة المتقدمة', type: 'pdf', description: 'نصوص متوسطة للقراءة والفهم' },
      { id: 9, title: 'الحوار المتقدم', type: 'quiz', description: 'تمارين على الحوار المتقدم' },
    ],
    B2: [
      { id: 10, title: 'الأدب الألماني', type: 'pdf', description: 'مقتطفات من أدب ألماني معروف' },
      { id: 11, title: 'المقالات الاقتصادية', type: 'quiz', description: 'فهم المقالات الاقتصادية' },
      { id: 12, title: 'النقاش المتقدم', type: 'quiz', description: 'تمارين على النقاش المعقد' },
    ],
    C1: [
      { id: 13, title: 'الفلسفة والأفكار', type: 'pdf', description: 'نقاش الأفكار الفلسفية بالألمانية' },
      { id: 14, title: 'التحليل النقدي', type: 'quiz', description: 'تحليل وانتقاد النصوص' },
      { id: 15, title: 'الخطابة والعرض', type: 'quiz', description: 'فنون الخطابة والعرض الشفهي' },
    ],
    C2: [
      { id: 16, title: 'الدراسات العليا', type: 'pdf', description: 'نصوص أكاديمية متقدمة جداً' },
      { id: 17, title: 'البحث العلمي', type: 'quiz', description: 'كتابة وفهم البحث العلمي' },
      { id: 18, title: 'الترجمة المتقدمة', type: 'quiz', description: 'تمارين على الترجمة الدقيقة' },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-balance">التمارين</h1>
        <p className="text-muted-foreground text-lg">اختر المستوى التعليمي وابدأ التعلم</p>
      </div>

      {/* Levels Grid */}
      {selectedLevel === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {LEVELS.map((level) => (
            <div
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className="text-right"
            >
              <Card className="cursor-pointer transition-all hover:border-accent/50 hover:shadow-lg hover:bg-card/80">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-accent">{level.id}</CardTitle>
                      <CardDescription className="mt-2">{level.label}</CardDescription>
                    </div>
                    <BookOpen className="text-accent/50 w-8 h-8" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-accent/30 hover:bg-accent/10">
                    اختر المستوى
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setSelectedLevel(null)}
              className="text-accent hover:text-accent/80 transition-colors font-semibold"
            >
              ← العودة
            </button>
            <h2 className="text-3xl font-bold">
              مستوى {selectedLevel}
            </h2>
          </div>

          {/* Exercises List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockExercises[selectedLevel as keyof typeof mockExercises].map((exercise) => (
              <Card key={exercise.id} className="hover:border-accent/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <CardDescription className="mt-2 text-balance">
                        {exercise.description}
                      </CardDescription>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-semibold whitespace-nowrap mr-2">
                      {exercise.type === 'quiz' ? 'اختبار' : 'ملف'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/exercises/${selectedLevel}/${exercise.id}`}>
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      {exercise.type === 'quiz' ? 'ابدأ الاختبار' : 'تحميل الملف'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
