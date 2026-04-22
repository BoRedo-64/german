'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Flame, CheckCircle, TrendingUp, Award } from 'lucide-react';

export default function StatsPage() {
  // Mock data for daily activity
  const dailyActivityData = [
    { day: 'الاثنين', answers: 15 },
    { day: 'الثلاثاء', answers: 23 },
    { day: 'الأربعاء', answers: 18 },
    { day: 'الخميس', answers: 29 },
    { day: 'الجمعة', answers: 25 },
    { day: 'السبت', answers: 31 },
    { day: 'الأحد', answers: 26 },
  ];

  // Mock data for level progress
  const levelProgressData = [
    { level: 'A1', completed: 8, total: 10 },
    { level: 'A2', completed: 5, total: 10 },
    { level: 'B1', completed: 3, total: 10 },
    { level: 'B2', completed: 1, total: 10 },
    { level: 'C1', completed: 0, total: 10 },
    { level: 'C2', completed: 0, total: 10 },
  ];

  // Mock data for accuracy
  const accuracyData = [
    { name: 'صحيح', value: 156 },
    { name: 'خاطئ', value: 24 },
  ];

  const COLORS = ['oklch(0.65 0.16 84.29)', 'oklch(0.577 0.245 27.325)'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">الإحصائيات</h1>
        <p className="text-muted-foreground text-lg">تابع تقدمك في التعلم</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Daily Streak */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">سلسلة يومية</CardTitle>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <CardDescription>أيام متتالية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">24</div>
            <p className="text-xs text-muted-foreground mt-1">+2 اليوم</p>
          </CardContent>
        </Card>

        {/* Correct Answers */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">الإجابات الصحيحة</CardTitle>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <CardDescription>إجمالي الإجابات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">156</div>
            <p className="text-xs text-muted-foreground mt-1">نسبة صحة 87%</p>
          </CardContent>
        </Card>

        {/* Learning Streak */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">التقدم العام</CardTitle>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <CardDescription>النسبة المئوية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">47%</div>
            <p className="text-xs text-muted-foreground mt-1">من المستويات المكتملة</p>
          </CardContent>
        </Card>

        {/* Total Time */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">الإنجاز</CardTitle>
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <CardDescription>الشارات المحصل عليها</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">8</div>
            <p className="text-xs text-muted-foreground mt-1">من أصل 20</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>النشاط اليومي</CardTitle>
            <CardDescription>عدد الإجابات الصحيحة يومياً</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0 0)" />
                <XAxis dataKey="day" stroke="oklch(0.65 0 0)" style={{ direction: 'rtl' }} />
                <YAxis stroke="oklch(0.65 0 0)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'oklch(0.12 0 0)', border: '1px solid oklch(0.20 0 0)' }}
                  labelStyle={{ color: 'oklch(0.95 0 0)' }}
                />
                <Line
                  type="monotone"
                  dataKey="answers"
                  stroke="oklch(0.65 0.16 84.29)"
                  strokeWidth={2}
                  dot={{ fill: 'oklch(0.65 0.16 84.29)', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Accuracy Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>دقة الإجابات</CardTitle>
            <CardDescription>نسبة الإجابات الصحيحة والخاطئة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={accuracyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {accuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'oklch(0.12 0 0)', border: '1px solid oklch(0.20 0 0)' }}
                  labelStyle={{ color: 'oklch(0.95 0 0)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>التقدم حسب المستوى</CardTitle>
            <CardDescription>عدد الدروس المكتملة من كل مستوى</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={levelProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0 0)" />
                <XAxis dataKey="level" stroke="oklch(0.65 0 0)" />
                <YAxis stroke="oklch(0.65 0 0)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'oklch(0.12 0 0)', border: '1px solid oklch(0.20 0 0)' }}
                  labelStyle={{ color: 'oklch(0.95 0 0)' }}
                />
                <Bar dataKey="completed" stackId="a" fill="oklch(0.65 0.16 84.29)" />
                <Bar dataKey="total" stackId="b" fill="oklch(0.20 0 0)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
