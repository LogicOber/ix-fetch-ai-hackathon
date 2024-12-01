import { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { History, ArrowLeft, Edit, ChevronDown } from 'lucide-react';
import { EmotionChart } from '@/components/audio/EmotionChart';
import { TreatmentStrategy } from '@/components/audio/TreatmentStrategy';
import { mockAudioAnalysis } from '@/lib/mock-audio-data';
import { format, isWithinInterval, startOfDay, endOfDay, parseISO, subMonths } from 'date-fns';
import { DateRangeSelector, DateRange } from '@/components/ui/DateRangeSelector';

// 创建更多的历史记录，日期随机分布在过去30天内
const generateRandomDate = (startDate: Date, endDate: Date) => {
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

const endDate = new Date();
const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

const mockHistoryRecords = [
  {
    id: 1,
    title: "Initial Patient Consultation",
    description: "First meeting with elderly patient discussing vaccine concerns",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `elderly_patient_consultation.mp3`
    }
  },
  {
    id: 2,
    title: "Follow-up with Young Mother",
    description: "Discussing childhood vaccination schedule and addressing safety concerns",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `young_mother_consultation.mp3`
    }
  },
  {
    id: 3,
    title: "Community Leader Discussion",
    description: "Meeting with local religious leader about community health initiatives",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `community_leader_meeting.mp3`
    }
  },
  {
    id: 4,
    title: "Cultural Barriers Workshop",
    description: "Team discussion about overcoming cultural barriers in healthcare",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `cultural_barriers_workshop.mp3`
    }
  },
  {
    id: 5,
    title: "Patient Education Session",
    description: "Group session explaining new treatment procedures",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `patient_education_session.mp3`
    }
  },
  {
    id: 6,
    title: "Vaccine Hesitancy Discussion",
    description: "One-on-one consultation addressing vaccine safety concerns",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `vaccine_hesitancy.mp3`
    }
  },
  {
    id: 7,
    title: "Mental Health Support",
    description: "Supporting patient with anxiety about medical procedures",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `mental_health_support.mp3`
    }
  },
  {
    id: 8,
    title: "Family Counseling Session",
    description: "Meeting with family about elderly care options",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `family_counseling.mp3`
    }
  },
  {
    id: 9,
    title: "Chronic Disease Management",
    description: "Regular check-in with diabetes patient",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `chronic_disease.mp3`
    }
  },
  {
    id: 10,
    title: "New Patient Orientation",
    description: "Introduction to healthcare services for new community member",
    date: generateRandomDate(startDate, endDate),
    analysis: {
      ...mockAudioAnalysis,
      fileName: `new_patient.mp3`
    }
  }
].sort((a, b) => b.date.getTime() - a.date.getTime()); // 按日期降序排序

export default function AnalysisHistory() {
  const [selectedRecord, setSelectedRecord] = useState<typeof mockHistoryRecords[0] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  // 设置默认日期范围为最近一个月
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [visibleCount, setVisibleCount] = useState(5);

  // 根据日期范围筛选记录
  const filteredRecords = useMemo(() => {
    if (!dateRange?.from) return mockHistoryRecords;
    
    const fromDate = startOfDay(dateRange.from);
    const toDate = dateRange.to ? endOfDay(dateRange.to) : endOfDay(new Date());
    
    // 验证日期范围
    if (fromDate > toDate) return [];
    
    return mockHistoryRecords.filter(record => {
      const recordDate = startOfDay(record.date);
      return isWithinInterval(recordDate, { start: fromDate, end: toDate });
    });
  }, [dateRange]);

  // 按日期分组记录
  const groupedRecords = useMemo(() => {
    const groups: { [key: string]: typeof mockHistoryRecords } = {};
    
    filteredRecords.slice(0, visibleCount).forEach(record => {
      const dateKey = format(record.date, 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(record);
    });
    
    return Object.entries(groups).sort((a, b) => 
      parseISO(b[0]).getTime() - parseISO(a[0]).getTime()
    );
  }, [filteredRecords, visibleCount]);

  const handleStartEdit = useCallback((record: typeof mockHistoryRecords[0]) => {
    setIsEditing(true);
    setEditingTitle(record.title);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (selectedRecord) {
      selectedRecord.title = editingTitle;
      setIsEditing(false);
    }
  }, [selectedRecord, editingTitle]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 5, filteredRecords.length));
  }, [filteredRecords.length]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-primary/20">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="h-7 w-7 text-primary" />
              <h1 className="text-2xl font-semibold">Analysis History</h1>
            </div>
            {!selectedRecord && (
              <DateRangeSelector
                date={dateRange}
                onSelect={setDateRange}
                minDate={subMonths(new Date(), 12)}
                maxDate={new Date()}
              />
            )}
          </div>
          {filteredRecords.length === 0 && dateRange && (
            <p className="text-sm text-muted-foreground mt-2">
              No records found for the selected date range
            </p>
          )}
        </div>
      </header>

      <div className="p-8">
        {!selectedRecord ? (
          <div className="space-y-8">
            {groupedRecords.map(([date, records]) => (
              <div key={date} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {format(parseISO(date), 'MMMM d, yyyy')}
                </h2>
                <div className="grid gap-4">
                  {records.map((record) => (
                    <Card
                      key={record.id}
                      className="p-6 cursor-pointer hover:bg-primary/5 transition-colors"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-2">{record.title}</h3>
                          <p className="text-sm text-gray-600 mb-1">{record.description}</p>
                          <p className="text-sm text-gray-500">File: {record.analysis.fileName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{format(record.date, 'p')}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
            {visibleCount < filteredRecords.length && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleLoadMore}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <ChevronDown className="h-4 w-4" />
                  Load More
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedRecord(null)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to List
              </button>
            </div>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="text-lg font-semibold p-1 border rounded"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="text-primary hover:text-primary/80"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{selectedRecord.title}</h2>
                      <button
                        onClick={() => handleStartEdit(selectedRecord)}
                        className="text-gray-400 hover:text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-1">{selectedRecord.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{format(selectedRecord.date, 'PPP')}</p>
                  <p className="text-sm text-gray-500">{format(selectedRecord.date, 'p')}</p>
                </div>
              </div>
              <div className="space-y-6">
                <EmotionChart 
                  data={selectedRecord.analysis.emotionData}
                  hesitationPoints={selectedRecord.analysis.hesitationPoints}
                />
                <TreatmentStrategy hesitationPoints={selectedRecord.analysis.hesitationPoints} />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}