'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Calendar, Clock, User } from 'lucide-react';

export default function MeetingPage() {
  const meetingInfo = {
    title: 'الحصة المباشرة - أساسيات اللغة الألمانية',
    instructor: 'أ.د محمد أحمد',
    level: 'A1 - المستوى الأساسي',
    startTime: '14:00',
    date: '2024-04-20',
    link: 'https://meet.example.com/german-lesson-a1',
  };

  const upcomingMeetings = [
    {
      id: 1,
      title: 'درس المفردات - الحيوانات',
      instructor: 'أ.د عائشة محمد',
      level: 'A1',
      time: '16:00',
      date: '2024-04-21',
    },
    {
      id: 2,
      title: 'تمرين الكلام - الحوار اليومي',
      instructor: 'أ.د محمد أحمد',
      level: 'A2',
      time: '18:00',
      date: '2024-04-22',
    },
    {
      id: 3,
      title: 'شرح القواعد - الأفعال المركبة',
      instructor: 'أ.د علي عبدالله',
      level: 'B1',
      time: '15:00',
      date: '2024-04-23',
    },
  ];

  const handleJoinMeeting = () => {
    window.open(meetingInfo.link, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">الانضمام إلى الحصة</h1>
        <p className="text-muted-foreground text-lg">تواصل مع معلمينا عبر حصص مباشرة</p>
      </div>

      {/* Current/Next Meeting */}
      <Card className="border-accent/30 bg-card/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{meetingInfo.title}</CardTitle>
              <CardDescription className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>المعلم: {meetingInfo.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>التاريخ: {meetingInfo.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>الوقت: {meetingInfo.startTime}</span>
                </div>
              </CardDescription>
            </div>
            <Video className="w-8 h-8 text-accent flex-shrink-0" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            حصة تفاعلية مباشرة لتعلم أساسيات اللغة الألمانية. سيتم شرح المفردات والقواعس الأساسية مع تمارين عملية.
          </p>
          <Button
            onClick={handleJoinMeeting}
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg h-12"
          >
            اضغط للانضمام إلى الحصة
          </Button>
        </CardContent>
      </Card>

      {/* Meeting Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">ملاحظات قبل الحضور</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-accent font-bold">•</span>
              <span>تأكد من وجود اتصال إنترنت سريع وموثوق</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">•</span>
              <span>استخدم ميكروفون وكاميرا عالية الجودة للمشاركة الفعالة</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">•</span>
              <span>حاول الحضور قبل موعد الحصة بـ 5 دقائق</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">•</span>
              <span>أغلق التطبيقات الأخرى لضمان جودة الاتصال</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">•</span>
              <span>شارك أسئلتك وملاحظاتك خلال الحصة</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Upcoming Meetings */}
      <div>
        <h2 className="text-2xl font-bold mb-6">الحصص القادمة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMeetings.map((meeting) => (
            <Card key={meeting.id} className="hover:border-accent/50 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">{meeting.title}</CardTitle>
                <CardDescription className="space-y-2 mt-3">
                  <div>المعلم: {meeting.instructor}</div>
                  <div className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-semibold inline-block">
                    مستوى {meeting.level}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{meeting.time}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-accent/30 text-foreground hover:bg-accent/10"
                >
                  أضف إلى التقويم
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>أسئلة شائعة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-semibold">هل يمكنني حضور الحصة من الهاتف المحمول؟</h4>
            <p className="text-muted-foreground">نعم، يمكنك الانضمام من أي جهاز يتوفر فيه اتصال إنترنت وكاميرا</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">ماذا لو فاتتني الحصة المباشرة؟</h4>
            <p className="text-muted-foreground">سيتم تسجيل جميع الحصص المباشرة وستتاح لك مشاهدتها لاحقاً</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">هل هناك حصص خاصة أو جماعية؟</h4>
            <p className="text-muted-foreground">نحن نقدم كلا النوعين - حصص جماعية مع معلمين ومعايير معينة والحصص الخاصة بناءً على احتياجاتك</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
