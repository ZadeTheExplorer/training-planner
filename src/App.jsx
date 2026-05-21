import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, ShieldCheck, Dumbbell, PlayCircle, Info } from 'lucide-react';

const scheduleData = [
  {
    id: 1,
    title: "GĐ 1: Tái Thiết Nền Tảng & Chữa Lành",
    weeks: "Tuần 1 - 2",
    focus: "Ổn định cổ chân, giãn chóp xoay vai, lực ly tâm gân bánh chè.",
    days: [
      {
        name: "Thứ 5",
        label: "Ngày 1",
        focus: "Tái cấu trúc cơ xương khớp cốt lõi",
        exercises: [
          { name: "Desk Angels", desc: "10 lần. Mở rộng lồng ngực tại văn phòng.", videoId: "F0aO3uPs6zI" },
          { name: "Clamshells", desc: "3 hiệp x 15 lần/bên. Kích hoạt cơ mông nhỡ.", videoId: "aQVApsdOLSI?si=ibhVKjXcC3Z3hMBd" },
          { name: "Basas Spanish Squat", desc: "3 hiệp tĩnh x 45 giây. Đeo dây kháng lực khoeo gối.", videoId: "hgFxm5KIF7M" },
          { name: "Stork Balance Test", desc: "Đứng một chân nhắm/mở mắt (Mục tiêu 30s).", videoId: "sdiIn7mtJ2s" }
        ]
      },
      {
        name: "Thứ 6",
        label: "Phục hồi",
        focus: "Phục hồi chủ động",
        exercises: [
          { name: "Towel Stretch", desc: "Kéo giãn mặt sau khớp vai bằng khăn tắm.", videoId: "3i1uGqH5Ca8" },
          { name: "Massage Gun", desc: "Đánh lỏng cơ tứ đầu đùi và cẳng tay.", videoId: "F0aO3uPs6zI" },
          { name: "Đi bộ nhanh", desc: "15 phút di chuyển theo đường thẳng.", videoId: "mZk26NvfIVI" }
        ]
      },
      {
        name: "Thứ 7",
        label: "Ngày 2",
        focus: "Thể lực yếm khí & Cảm nhận bản thể",
        exercises: [
          { name: "Cardio Máy (HIIT)", desc: "Đạp xe/Elliptical: Bứt tốc 30s - Phục hồi 60s (15 chu kỳ).", videoId: "mZk26NvfIVI" },
          { name: "Y-Balance Test", desc: "Vươn chân chạm 3 điểm hình chữ Y (5 lần/hướng).", videoId: "qFVuS-P2FrI" }
        ]
      },
      {
        name: "Chủ Nhật",
        label: "Ngày 3",
        focus: "Đào tạo chuyển động (Footwork)",
        exercises: [
          { name: "Nhảy dây chậm", desc: "10 phút tập trung bật nảy cổ chân.", videoId: "xHNAGaT_3ME" },
          { name: "Shadow Footwork", desc: "Di chuyển 6 góc sân với tốc độ 40% thực tế.", videoId: "b4WGY4z1A3E" },
          { name: "Split-step tại chỗ", desc: "Thả trọng tâm, không di chuyển.", videoId: "gy4YZS5tGxE" }
        ]
      },
      {
        name: "Thứ 2",
        label: "Văn phòng",
        focus: "Thư giãn & Tư thế",
        exercises: [
          { name: "Thoracic Extension", desc: "Ngồi chuẩn, vươn giãn ngực thường xuyên.", videoId: "F0aO3uPs6zI" }
        ]
      },
      {
        name: "Thứ 3",
        label: "Ngày 4",
        focus: "Linh hoạt vai & Sức bền cẳng tay",
        exercises: [
          { name: "Wall Isometrics", desc: "Ép góc cẳng tay vào tường (15s x 4 hiệp).", videoId: "zCq36gnqGdI" },
          { name: "Plate Pinches & Wrist Curls", desc: "Kẹp tạ dẹt và gập cổ tay với tạ đơn (3 hiệp).", videoId: "zCq36gnqGdI" },
          { name: "Basas Spanish Squat", desc: "Lặp lại 15 lần x 3 hiệp.", videoId: "hgFxm5KIF7M" }
        ]
      },
      {
        name: "Thứ 4",
        label: "Nghỉ",
        focus: "Nghỉ ngơi trọn vẹn",
        exercises: [
          { name: "Calf Wall Stretch", desc: "Giãn cơ bắp chân vào tường.", videoId: "aQVApsdOLSI" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "GĐ 2: Mở Rộng Biên Độ & Động Học",
    weeks: "Tuần 3 - 4",
    focus: "Tăng tải cổ chân, kỹ thuật Relax-Squeeze, áp dụng Split-step.",
    days: [
      {
        name: "Thứ 5",
        label: "Ngày 1",
        focus: "Kiểm tra chuyển cấp",
        exercises: [
          { name: "Y-Balance Test", desc: "Đo lường chỉ số đối xứng LSI.", videoId: "qFVuS-P2FrI" },
          { name: "Heel Rise Test", desc: "Nhón gót một chân liên tục 25 lần.", videoId: "sdiIn7mtJ2s" }
        ]
      },
      {
        name: "Thứ 6",
        label: "Kỹ thuật",
        focus: "Truyền lực vợt & Tay cầm",
        exercises: [
          { name: "Throwing Motion", desc: "Tập mô phỏng động tác ném bóng với vợt.", videoId: "3i1uGqH5Ca8" },
          { name: "Relax-Squeeze Grip", desc: "Đánh lưới/phản tạt nhẹ 15p. Thả lỏng bàn tay.", videoId: "zCq36gnqGdI" }
        ]
      },
      {
        name: "Thứ 7",
        label: "Ngày 2",
        focus: "Thể lực sân & Phản xạ Split-step",
        exercises: [
          { name: "Shuttle Runs", desc: "Chạy ngang sân 80% sức x 20s (10 chu kỳ).", videoId: "xHNAGaT_3ME" },
          { name: "Shuttle Call-outs", desc: "Nghe hiệu lệnh -> Split-step -> Di chuyển ảo.", videoId: "gy4YZS5tGxE" }
        ]
      },
      {
        name: "Chủ Nhật",
        label: "Ngày 3",
        focus: "Sức mạnh thân dưới",
        exercises: [
          { name: "Squat Jumps", desc: "Bật nhảy nhẹ, tiếp đất êm, giữ thẳng trục gối.", videoId: "hgFxm5KIF7M" },
          { name: "Weighted Spanish Squat", desc: "Đeo thêm balo 5kg.", videoId: "hgFxm5KIF7M" }
        ]
      },
      {
        name: "Thứ 2",
        label: "Văn phòng",
        focus: "Giãn cơ",
        exercises: [
          { name: "Giãn cơ toàn diện", desc: "Massage gân bắp chân.", videoId: "aQVApsdOLSI" }
        ]
      },
      {
        name: "Thứ 3",
        label: "Ngày 4",
        focus: "Core & Cẳng tay",
        exercises: [
          { name: "Plank & Deadbug", desc: "Củng cố cơ lõi (Core stability).", videoId: "3i1uGqH5Ca8" },
          { name: "Heavy Wrist Curls", desc: "Gập cổ tay tạ nặng hơn.", videoId: "zCq36gnqGdI" }
        ]
      },
      {
        name: "Thứ 4",
        label: "Nghỉ",
        focus: "Phục hồi",
        exercises: [
          { name: "Box Breathing", desc: "Tập thở sâu, giãn đùi trước.", videoId: "F0aO3uPs6zI" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "GĐ 3: Tối Ưu Tốc Độ & Bứt Phá",
    weeks: "Tuần 5 - 6",
    focus: "Bài kiểm tra nhảy cường độ cao, Split-step bản năng, Phông cầu chuẩn.",
    days: [
      {
        name: "Thứ 5",
        label: "Ngày 1",
        focus: "Kiểm tra bậc cao",
        exercises: [
          { name: "Side Hop Test", desc: "Nhảy lò cò ngang 30cm (Mục tiêu 30 lần/30s).", videoId: "xHNAGaT_3ME" },
          { name: "Square Hop Test", desc: "Nhảy hình vuông, đo độ ổn định.", videoId: "xHNAGaT_3ME" }
        ]
      },
      {
        name: "Thứ 6",
        label: "Kỹ thuật",
        focus: "Động học vợt chuyên sâu",
        exercises: [
          { name: "Training Racket", desc: "Khởi động với vợt nặng.", videoId: "zCq36gnqGdI" },
          { name: "Kỹ thuật Phông cầu (Clear)", desc: "Xoay cẳng tay, mở vai tối đa, không gồng cứng.", videoId: "b4WGY4z1A3E" }
        ]
      },
      {
        name: "Thứ 7",
        label: "Ngày 2",
        focus: "Linh hoạt kỵ khí (Agility)",
        exercises: [
          { name: "Footwork Ajay Jayaram", desc: "Nhấc cao đùi, di chuyển chéo sân.", videoId: "b4WGY4z1A3E" },
          { name: "Shadow Footwork 80%", desc: "2 phút x 4 hiệp với tốc độ sát thực tế.", videoId: "b4WGY4z1A3E" }
        ]
      },
      {
        name: "Chủ Nhật",
        label: "Ngày 3",
        focus: "Đấu tập thực chiến (70%)",
        exercises: [
          { name: "Match Play 70%", desc: "BẮT BUỘC Split-step trước mọi pha cầu.", videoId: "gy4YZS5tGxE" },
          { name: "Test Maximum Lunge", desc: "Cố tình rướn vài pha để kiểm tra đầu gối.", videoId: "hgFxm5KIF7M" }
        ]
      },
      { name: "Thứ 2", label: "Văn phòng", focus: "Nghỉ ngơi", exercises: [{ name: "Giãn gáy & cổ", desc: "Nghỉ ngơi toàn diện.", videoId: "F0aO3uPs6zI" }] },
      { name: "Thứ 3", label: "Ngày 4", focus: "Phục hồi đỉnh cao", exercises: [{ name: "Cardio Hỗn hợp", desc: "HIIT 15 chu kỳ + 10p nhảy dây.", videoId: "mZk26NvfIVI" }] },
      { name: "Thứ 4", label: "Nghỉ", focus: "Đánh giá", exercises: [{ name: "Kiểm tra cơ", desc: "Đánh giá mỏi cổ tay và vai phải.", videoId: "3i1uGqH5Ca8" }] }
    ]
  },
  {
    id: 4,
    title: "GĐ 4: Trở Lại Thi Đấu (RTP)",
    weeks: "Tuần 7 - 8",
    focus: "Tích hợp chuỗi động lực học hoàn chỉnh vào thi đấu thực tế 100%.",
    days: [
      {
        name: "Match Day",
        label: "Quy trình",
        focus: "Quy trình thi đấu chuẩn mực",
        exercises: [
          { name: "1. Khởi động (Pre-hab)", desc: "Clamshells (mông), Thoracic extension (ngực), xoay cổ tay.", videoId: "aQVApsdOLSI" },
          { name: "2. Agility & Footwork", desc: "10p Shadow footwork. Chú trọng Split-step chuẩn.", videoId: "b4WGY4z1A3E" },
          { name: "3. Thi đấu 100%", desc: "Tích hợp tín hiệu âm thanh cho Split-step. Đập cầu vẩy roi.", videoId: "gy4YZS5tGxE" },
          { name: "4. Phục hồi (Cool-down)", desc: "Kéo giãn bắp chân, dùng súng massage nới lỏng IT band.", videoId: "F0aO3uPs6zI" }
        ]
      }
    ]
  }
];

const YouTubeEmbed = ({ videoId }) => {
  if (!videoId) return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
      <PlayCircle size={48} className="animate-pulse opacity-50" />
    </div>
  );

  return (
    <div className="w-full h-full relative">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl border-none"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default function App() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeDay, setActiveDay] = useState(0);

  const currentPhaseData = scheduleData[activePhase];
  const currentDayData = currentPhaseData.days[activeDay] || currentPhaseData.days[0];

  useEffect(() => {
    setActiveDay(0);
  }, [activePhase]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans p-4 md:p-8 flex flex-col items-center">

      <header className="max-w-5xl w-full mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Lộ Trình Phục Hồi Cầu Lông Đa Chuyên Khoa
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-3xl">
          Phác đồ 8 tuần tích hợp Y học phục hồi (ổn định cổ chân, gân bánh chè) và Cơ sinh học thể thao (Split-step, lực truyền cánh tay) thiết kế chuyên biệt cho giới văn phòng.
        </p>
      </header>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-4 flex flex-col gap-4">

          <div className="bg-gray-900 rounded-2xl p-2 border border-gray-800 shadow-xl flex flex-col gap-1">
            {scheduleData.map((phase, idx) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(idx)}
                className={`text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                  activePhase === idx
                    ? 'bg-teal-900/40 border border-teal-500/30 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                    : 'hover:bg-gray-800 text-gray-400'
                }`}
              >
                <div>
                  <div className="font-semibold text-sm">{phase.weeks}</div>
                  <div className="text-xs opacity-80 mt-1 truncate max-w-[200px]">{phase.title}</div>
                </div>
                {activePhase === idx && <ChevronRight size={18} />}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-teal-900/20 rounded-2xl p-5 border border-gray-800 shadow-xl">
            <h3 className="text-teal-400 font-semibold mb-2 flex items-center gap-2 text-sm">
              <ShieldCheck size={18} /> Mục Tiêu Cốt Lõi
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">{currentPhaseData.focus}</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-3 border border-gray-800 shadow-xl overflow-x-auto lg:overflow-y-auto lg:max-h-[400px] flex lg:flex-col gap-2 custom-scrollbar">
            {currentPhaseData.days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={`flex-shrink-0 lg:flex-shrink flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeDay === idx
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeDay === idx ? 'bg-blue-500' : 'bg-gray-700'}`}>
                  <Calendar size={18} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">{day.name}</div>
                  <div className="text-xs opacity-80">{day.label}</div>
                </div>
              </button>
            ))}
          </div>

        </div>

        <div className="lg:col-span-8">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl min-h-[600px] flex flex-col">

            <div className="mb-6 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {currentDayData.name} - {currentDayData.label}
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock size={14} /> Tuỳ chọn Sáng/Tối
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Dumbbell className="text-blue-400" /> {currentDayData.focus}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              {currentDayData.exercises.map((exercise, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-4 hover:border-gray-600 transition-colors flex flex-col group">
                  <div className="w-full h-48 bg-gray-950 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center border border-gray-800 shadow-inner group-hover:border-teal-500/30 transition-colors">
                    <YouTubeEmbed videoId={exercise.videoId} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-gray-100 mb-1">{exercise.name}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{exercise.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 flex items-start gap-3 text-sm text-gray-500">
              <Info size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <p>
                *Luôn lắng nghe phản hồi của cơ thể. Đối với các bài kiểm tra chức năng (Y-Balance, Stork), hãy đảm bảo có đai hỗ trợ (ankle stabiliser) ở giai đoạn đầu nếu cần thiết.
              </p>
            </div>

          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(31,41,55,0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(75,85,99,0.8); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(107,114,128,1); }
      `}} />
    </div>
  );
}
