import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, ShieldCheck, Dumbbell, PlayCircle, Info } from 'lucide-react';

const scheduleData = [
  {
    id: 1,
    title: "GĐ 1: Phục Hồi Nền Tảng (Foundation)",
    weeks: "Tuần 1 – 2",
    focus: "Phục hồi cổ chân (ankle rehab + proprioception), xây dựng aerobic base (Zone 2), sửa cơ học gối & vai. KHÔNG đánh cầu. 3–4 buổi/tuần × 45–60'.",
    days: [
      {
        name: "Thứ 6",
        label: "Ngày 1 — 45'",
        focus: "Ankle Rehab + Mobility",
        exercises: [
          { name: "Ankle Mobility", desc: "Ankle alphabet 2 lần/chân + knee-to-wall dorsiflexion 3×30 s/chân. Khởi động ROM cổ chân.", videoId: "sdiIn7mtJ2s" },
          { name: "Resistance Band Ankle", desc: "Dorsiflexion 3×15, plantarflexion 3×15, eversion 3×15, inversion 3×10 nhẹ (pain-free). Xây dựng sức mạnh quanh cổ chân.", videoId: "sdiIn7mtJ2s" },
          { name: "Balance Progression", desc: "2-chân mắt nhắm 3×30 s → 1-chân mắt mở (bên lành) 3×30 s → 1-chân mắt mở (bên đau) 3×20 s. Mục tiêu ≥30 s cuối tuần 2.", videoId: "sdiIn7mtJ2s" },
          { name: "Glute Bridge + Clamshell", desc: "Glute bridge 3×12 + clamshell 3×15/bên. Kích hoạt gluteus medius — chìa khóa bảo vệ gối & cổ chân.", videoId: "aQVApsdOLSI" },
          { name: "Foam Roll Recovery", desc: "Foam roll calves, IT band, glutes 5'. Giải phóng cơ căng sau ngày văn phòng.", videoId: "F0aO3uPs6zI" }
        ]
      },
      {
        name: "Thứ 7",
        label: "Ngày 2 — 60'",
        focus: "Upper Body + Core",
        exercises: [
          { name: "Shoulder Activation", desc: "Arm circles × 10/hướng + scapular CARs × 5 + band pull-apart 2×15. Kích hoạt cơ lưng trên và chóp xoay trước khi tập.", videoId: "F0aO3uPs6zI" },
          { name: "Y-T-W + Rotator Cuff Band", desc: "Y-T-W prone raises 3×10/chữ @ 1–2 kg + external rotation band 3×15/tay (khuỷu sát thân 90°). Phòng shoulder impingement vai phải.", videoId: "F0aO3uPs6zI" },
          { name: "Push-up + Row", desc: "Push-up (gối nếu cần) 3×8–12 + inverted row hoặc seated row 3×10. Tải nhẹ thân trên — giai đoạn anatomical adaptation.", videoId: "3i1uGqH5Ca8" },
          { name: "Bird-dog + Dead Bug + Plank", desc: "Bird-dog 3×8/bên + dead bug 3×10/bên + plank 3×30 s. Core stability giảm dynamic knee valgus khi lunge.", videoId: "3i1uGqH5Ca8" },
          { name: "Sleeper Stretch + Foam Roll Lưng", desc: "Sleeper stretch 2×30 s/vai + foam roll thoracic extension 5'. Xử lý GIRD vai phải, giảm forward head posture.", videoId: "3i1uGqH5Ca8" }
        ]
      },
      {
        name: "Chủ Nhật",
        label: "Ngày 3 — 45'",
        focus: "Aerobic + Light Lower",
        exercises: [
          { name: "Xe đạp tĩnh Zone 2", desc: "25–30' ở 65–75% HRmax (~130–145 bpm). Low-impact theo LOVE protocol — tăng tuần hoàn không tải cổ chân.", videoId: "mZk26NvfIVI" },
          { name: "Glute Bridge Progression", desc: "Bilateral glute bridge 3×15 + single-leg glute bridge (bên lành) 3×10. Tăng dần tải posterior chain.", videoId: "aQVApsdOLSI" },
          { name: "Wall Sit + Hip Abduction", desc: "Wall sit 3×30 s (không gập quá 70° nếu đau gối) + side-lying hip abduction 3×15. Sức bền VMO và gluteus medius.", videoId: "sdiIn7mtJ2s" },
          { name: "Bilateral Calf Raise", desc: "3×20. Xây dựng sức chịu đựng cơ bắp chân cho cổ chân đang hồi phục.", videoId: "sdiIn7mtJ2s" }
        ]
      },
      {
        name: "Thứ 2",
        label: "Active Recovery",
        focus: "Thư Giãn & Tư Thế Văn Phòng",
        exercises: [
          { name: "Đi Bộ 30'", desc: "Đi bộ nhẹ theo đường thẳng + 5' giãn cơ. LOVE protocol: vascularisation — tuần hoàn hỗ trợ lành mô dây chằng.", videoId: "mZk26NvfIVI" },
          { name: "Desk Exercises", desc: "Chin tucks 10×3 (giữ 3 s) + seated upper trap stretch 2×30 s/bên + shoulder rolls 10 lần lùi. Thực hiện mỗi 2 giờ tại văn phòng.", videoId: "F0aO3uPs6zI" }
        ]
      },
      {
        name: "Thứ 3",
        label: "Ngày 4 — 60'",
        focus: "Wrist + Vai + Ankle Round 2",
        exercises: [
          { name: "Ankle Protocol R2", desc: "Lặp lại ankle rehab Ngày 1: alphabet + resistance band + balance. Tăng balance bên đau lên 3×20 s tuần này.", videoId: "sdiIn7mtJ2s" },
          { name: "Wrist Strength", desc: "Wrist curl 3×15 (tạ 2–3 kg) + reverse wrist curl 3×15 + radial/ulnar deviation 3×15. Nền tảng sức bền cổ tay cho smash dài buổi.", videoId: "zCq36gnqGdI" },
          { name: "Forearm Endurance", desc: "Pronation/supination DB 3×12 + grip squeeze 3×20 + forearm pronation rapid band 3×30 s — mô phỏng wrist snap.", videoId: "zCq36gnqGdI" },
          { name: "Rotator Cuff Prehab", desc: "External rotation @ 0° band 3×15/tay + internal rotation band 3×15. Thrower's 10 — phòng shoulder impingement lâu dài.", videoId: "F0aO3uPs6zI" },
          { name: "Tibialis Raise + Foam Roll Cẳng Tay", desc: "Tibialis raise 3×15 (phòng shin splint) + foam roll forearms 3'. Hoàn thiện kinetic chain cẳng tay–cổ tay.", videoId: "F0aO3uPs6zI" }
        ]
      },
      {
        name: "Thứ 4",
        label: "Nghỉ Hoàn Toàn",
        focus: "Phục Hồi & Desk Exercises",
        exercises: [
          { name: "Desk Exercises Cổ Chân", desc: "Ankle alphabet 2 lần/chân + heel raise ngồi 20 rep + toe raise ngồi 20 rep × 2 sets. Kín đáo dưới bàn mỗi 2 giờ.", videoId: "sdiIn7mtJ2s" },
          { name: "Pre-sleep Stretch (10–15')", desc: "Foam roll IT band & quads 1'/chân + thoracic extension 2' + sleeper stretch 2×30 s/vai + pigeon stretch 60 s/bên. Thực hiện trước khi ngủ.", videoId: "F0aO3uPs6zI" }
        ]
      },
      {
        name: "Thứ 5",
        label: "Ngày 5 — 50'",
        focus: "Aerobic + Core",
        exercises: [
          { name: "Zone 2 Aerobic", desc: "Bơi (kick nhẹ với phao) hoặc xe đạp tĩnh Zone 2 trong 30'. Không impact — bảo vệ cổ chân.", videoId: "mZk26NvfIVI" },
          { name: "Anti-Rotation Core", desc: "Pallof press band 3×10/bên + side plank 3×20 s/bên. Core chống xoay — nền cho lunge & smash.", videoId: "3i1uGqH5Ca8" },
          { name: "Bird-dog + Cable Woodchop", desc: "Bird-dog 3×8/bên + cable woodchop nhẹ 3×10/hướng. Mô phỏng rotation power cầu lông trong môi trường kiểm soát.", videoId: "3i1uGqH5Ca8" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "GĐ 2: Sức Mạnh & Thể Lực (Strength & Endurance)",
    weeks: "Tuần 3 – 4",
    focus: "Hypertrophy + anaerobic capacity, return-to-running, trở lại sân drill nhẹ. ĐEO BRACE khi đánh. 4–5 buổi/tuần × 60–75'.",
    days: [
      {
        name: "Thứ 6",
        label: "Ngày 1 — 60'",
        focus: "Lower Strength",
        exercises: [
          { name: "Goblet Squat + Reverse Lunge", desc: "Goblet squat 4×10 @ 12–16 kg + reverse lunge DB 3×10/chân. KHÔNG forward lunge (giảm tải bánh chè). Tuần 4: chuyển sang Bulgarian split squat 4×8/chân.", videoId: null },
          { name: "Single-leg RDL + Calf Raise", desc: "Single-leg Romanian deadlift 3×8/chân (proprioception + posterior chain) + single-leg calf raise 3×12/bên.", videoId: null },
          { name: "Cossack Squat", desc: "2×8/bên. Di động háng + ổn định mắt cá — thiết yếu cho chasse step cầu lông.", videoId: null },
          { name: "Foam Roll Cool-down", desc: "Foam roll quads, IT band, calves 5'. Phục hồi sau buổi tập nặng.", videoId: "F0aO3uPs6zI" }
        ]
      },
      {
        name: "Thứ 7",
        label: "Ngày 2 — 60'",
        focus: "Upper Push/Pull + Core + Wrist",
        exercises: [
          { name: "DB Bench Press + Pull-up", desc: "DB bench press 3×10 + pull-up (assisted nếu cần) hoặc lat pulldown 3×8–10. Tăng tải thân trên progressively.", videoId: "3i1uGqH5Ca8" },
          { name: "Seated Row + DB Overhead Press", desc: "Seated row 3×12 + DB overhead press 3×10 (chỉ khi không đau vai). Cân bằng push–pull.", videoId: "3i1uGqH5Ca8" },
          { name: "Face Pull Band", desc: "3×15. Quan trọng nhất cho posterior shoulder + rear delt — chống GIRD tích lũy từ smash lặp lại.", videoId: "F0aO3uPs6zI" },
          { name: "Wrist Routine + Core", desc: "Wrist curl tăng 4 kg × 3×15 + Pallof press 3×12/bên + plank 3×45 s. Tăng tải theo progression.", videoId: "zCq36gnqGdI" }
        ]
      },
      {
        name: "Chủ Nhật",
        label: "Ngày 3 — 60' (ĐEO BRACE)",
        focus: "Shadow Footwork + Aerobic",
        exercises: [
          { name: "Warm-up Động Lực", desc: "Jump rope 3' nếu không đau ankle — hoặc step-up nhẹ 3' nếu còn khó chịu.", videoId: "xHNAGaT_3ME" },
          { name: "Shadow Badminton 6-góc (Chậm — ĐEO BRACE)", desc: "4 sets × 30 s on / 60 s off ở nửa tốc độ. Form chasse step + lunge kiểm soát — không cắt góc đột ngột.", videoId: "b4WGY4z1A3E" },
          { name: "Ladder Drills", desc: "2-in-2-out, lateral shuffle, in-out — 5 patterns × 2 lần. Footwork agility nền tảng.", videoId: "b4WGY4z1A3E" },
          { name: "Zone 2 Xe đạp", desc: "20' aerobic nhẹ sau footwork. Duy trì aerobic base, hỗ trợ recovery.", videoId: "mZk26NvfIVI" }
        ]
      },
      {
        name: "Thứ 2",
        label: "Active Recovery",
        focus: "Phục Hồi Chủ Động",
        exercises: [
          { name: "Active Recovery", desc: "Đi bộ nhẹ 20–30' + giãn cơ. Tăng tuần hoàn không gây mệt mỏi thêm.", videoId: "mZk26NvfIVI" }
        ]
      },
      {
        name: "Thứ 3",
        label: "Ngày 4 — 60'",
        focus: "HIIT + Vai + Wrist",
        exercises: [
          { name: "HIIT Xe đạp/Rower (1:2 Rally Ratio)", desc: "15 s sprint / 30 s rest × 10 sets. Mô phỏng tỷ lệ work:rest 1:2 của cầu lông match-play. Tuần 4: tăng lên 20 s/40 s × 10.", videoId: "mZk26NvfIVI" },
          { name: "Shoulder Protocol Post-HIIT", desc: "Y-T-W prone raises + external rotation band 3×12 sau khi nghỉ 5'. Prehab rotator cuff trong trạng thái fatigue nhẹ.", videoId: "F0aO3uPs6zI" },
          { name: "Wrist Endurance", desc: "Wrist curl + reverse curl + grip squeeze. Tuần 4: tăng tải thêm 0.5–1 kg.", videoId: "zCq36gnqGdI" }
        ]
      },
      {
        name: "Thứ 4",
        label: "Nghỉ",
        focus: "Phục Hồi & Desk Exercises",
        exercises: [
          { name: "Desk Exercises + Pre-sleep Stretch", desc: "Chin tucks + ankle alphabet ngồi mỗi 2 h văn phòng. Tối: foam roll IT band + sleeper stretch + couch stretch 60 s/bên + diaphragmatic breathing 5'.", videoId: "F0aO3uPs6zI" }
        ]
      },
      {
        name: "Thứ 5",
        label: "Drill Cố Định (ĐEO BRACE)",
        focus: "Return to Court — 45–60'",
        exercises: [
          { name: "Warm-up Off-court", desc: "Dynamic warm-up 10': leg swings + hip CARs + ankle CARs + A-skip + lateral lunge. Shadow swing nhẹ 5'.", videoId: "b4WGY4z1A3E" },
          { name: "Feeding Drill Cố Định — ĐEO BRACE", desc: "Đối tác feed cố định 1 vị trí — net + lift, không chạy nhiều. 3 sets × 10' nghỉ 3'. Tuần 4: mở feed sang 2 góc trước. CÀI BRACE TRƯỚC KHI VÀO SÂN.", videoId: null }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "GĐ 3: Tốc Độ & Sức Mạnh Chuyên Môn (Sport-Specific)",
    weeks: "Tuần 5 – 6",
    focus: "Power, plyometric, RTS test, social half-pace → full-pace sau khi pass battery. 4–5 buổi/tuần × 75–90'.",
    days: [
      {
        name: "Thứ 6",
        label: "Ngày 1 — 75'",
        focus: "Lower Power + Plyo",
        exercises: [
          { name: "Box Squat / Front Squat + KB Swing", desc: "Box squat hoặc front squat 4×6 @ 70% 1RM + KB swing 4×10. Chuyển từ hypertrophy sang power. ĐẦU TUẦN 6: thực hiện RTS test battery trước khi chuyển social full-pace.", videoId: null },
          { name: "Single-leg Plyos", desc: "Single-leg hop tại chỗ 3×10/chân + lateral bound double-to-single 3×8/bên. Progression: bilateral → single-leg sagittal → lateral.", videoId: "xHNAGaT_3ME" },
          { name: "Single-leg RDL + Loaded Calf Raise", desc: "Single-leg RDL 3×8 với tạ + loaded calf raise 3×12. Posterior chain + calf strength hỗ trợ cổ chân khi cutting.", videoId: null }
        ]
      },
      {
        name: "Thứ 7",
        label: "Ngày 2 — 75'",
        focus: "Upper Power + Rotation + Core",
        exercises: [
          { name: "DB Bench Press + Med Ball Slam", desc: "DB bench press 3×6 nặng hơn T3–4 + med ball overhead slam 4×8. Chuyển từ strength sang power — tempo nhanh.", videoId: "3i1uGqH5Ca8" },
          { name: "Med Ball Rotational Throw + Weighted Pull-up", desc: "Med ball rotational throw vào tường 3×8/bên + weighted pull-up 3×6. Mô phỏng rotation power của smash cầu lông.", videoId: null },
          { name: "Face Pull + Pallof Variations", desc: "Face pull 3×15 + Pallof press 3×12/bên + Pallof rotational 3×8. Shoulder stability + anti-rotation core cho rally dài.", videoId: null },
          { name: "Wrist + Flexibility", desc: "Wrist routine + grip heavy + sleeper stretch 3×30 s/vai + cross-body stretch 3×30 s/bên. Bảo vệ vai sau buổi power.", videoId: "zCq36gnqGdI" }
        ]
      },
      {
        name: "Chủ Nhật",
        label: "Ngày 3 — 75' (ĐEO BRACE)",
        focus: "Shadow Badminton + Agility",
        exercises: [
          { name: "Shadow 6-góc Full-pace — ĐEO BRACE", desc: "4 sets × 45 s on / 60 s off ở full-pace. Split-step trước mọi di chuyển + chasse step chuẩn + recovery về base.", videoId: "b4WGY4z1A3E" },
          { name: "Reactive Agility", desc: "Random partner-pointing 3×30 s on / 60 s off + cone drill 5-10-5 & T-drill 4 sets nghỉ 90 s. Phản xạ đổi hướng đa chiều.", videoId: "b4WGY4z1A3E" },
          { name: "Agility Ladder", desc: "5' ladder drill: in-out, lateral, 2-in-2-out, ickey shuffle. Tốc độ chân + nhịp độ footwork.", videoId: "b4WGY4z1A3E" }
        ]
      },
      {
        name: "Thứ 2",
        label: "Active Recovery",
        focus: "Phục Hồi Chủ Động",
        exercises: [
          { name: "Active Recovery", desc: "Đi bộ nhẹ + foam roll toàn thân nếu cứng sau buổi agility.", videoId: "mZk26NvfIVI" }
        ]
      },
      {
        name: "Thứ 3",
        label: "HIIT Match-Sim (ĐEO BRACE)",
        focus: "Match-Simulation HIIT — 60'",
        exercises: [
          { name: "Shadow Rally HIIT — ĐEO BRACE", desc: "15 s shadow rally / 30 s rest × 12 sets (3 blocks × 4, nghỉ 2' giữa block). Hoặc: multi-shuttle drill 40 s on / 80 s rest × 6. Mô phỏng thể lực match-play thực tế.", videoId: "gy4YZS5tGxE" }
        ]
      },
      {
        name: "Thứ 4",
        label: "Nghỉ",
        focus: "Phục Hồi & Desk Exercises",
        exercises: [
          { name: "Desk Exercises + Pre-sleep Stretch", desc: "Ankle alphabet + single-leg balance khi đứng pha cà phê 30 s/bên. Tối: sleeper stretch + pigeon stretch + couch stretch + diaphragmatic breathing 5'.", videoId: "F0aO3uPs6zI" }
        ]
      },
      {
        name: "Thứ 5",
        label: "Social Half-pace (ĐEO BRACE)",
        focus: "Return to Social Play — 75'",
        exercises: [
          { name: "Warm-up 15' + Shadow", desc: "Warm-up off-court 15': dynamic stretching + shadow badminton nhẹ. ĐEO BRACE TRƯỚC KHI VÀO SÂN.", videoId: "b4WGY4z1A3E" },
          { name: "Social Half-pace — ĐEO BRACE", desc: "Đôi/đơn social, KHÔNG jump smash full power, KHÔNG stretch lunge đến giới hạn. Split-step + recovery là ưu tiên. Pass RTS battery T6 → chuyển full-pace.", videoId: "gy4YZS5tGxE" },
          { name: "Cool-down", desc: "Giãn cơ + ice 10' lên cổ chân nếu hơi mỏi. Đánh giá: đau ≥4/10 → giảm intensity 30% buổi sau.", videoId: "F0aO3uPs6zI" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "GĐ 4: Đỉnh Cao & Duy Trì (Peak & Maintenance)",
    weeks: "Tuần 7 – 8",
    focus: "Match conditioning, peaking, maintenance. 3 buổi gym + 2 buổi cầu social/match. Vẫn đeo brace mỗi buổi đánh.",
    days: [
      {
        name: "Gym A",
        label: "Lower Power",
        focus: "Sức Mạnh Bùng Nổ Thân Dưới",
        exercises: [
          { name: "Front Squat + Depth Jump", desc: "Front squat 4×3 @ 85% 1RM + depth jump 4×5 từ box 30 cm (complex training). Heavy + plyo kết hợp — tối đa hóa RFD cho explosive lunge.", videoId: null },
          { name: "KB Swing + Single-leg RDL", desc: "KB swing 4×10 + single-leg RDL 3×6. Duy trì posterior chain power + proprioception cổ chân.", videoId: null }
        ]
      },
      {
        name: "Gym B",
        label: "Upper Power + Core",
        focus: "Sức Mạnh Bùng Nổ Thân Trên",
        exercises: [
          { name: "Bench Press + Weighted Pull-up", desc: "Bench press 4×4 + weighted pull-up 4×5. Peaking phase — load cao, volume giảm.", videoId: "3i1uGqH5Ca8" },
          { name: "Med Ball Throw + Rotational Throw", desc: "Med ball overhead throw 4×6 + rotational throw 4×6/bên. Mô phỏng power chuỗi động tác smash.", videoId: null },
          { name: "Pallof Rotational", desc: "3×10/hướng. Core rotation endurance — duy trì stability trong match dài.", videoId: null }
        ]
      },
      {
        name: "Gym C",
        label: "Conditioning + Accessories",
        focus: "Thể Lực Nền & Prehab Duy Trì",
        exercises: [
          { name: "HIIT 15s/30s × 12 sets", desc: "3 blocks × 4 rep, nghỉ 2' giữa block. Duy trì anaerobic capacity match-play. ĐEO BRACE khi shadow rally.", videoId: "mZk26NvfIVI" },
          { name: "Y-T-W + Rotator Cuff + Wrist", desc: "Y-T-W 3×10 + external rotation band 3×15 + full wrist routine. Maintenance prehab — không giảm tần suất.", videoId: "F0aO3uPs6zI" },
          { name: "Balance Perturbation + Agility Ladder", desc: "Single-leg balance perturbation 3×30 s/bên + agility ladder 5'. Duy trì 5' sáng hằng ngày: single-leg eyes closed + calf raise + mini-hop.", videoId: "sdiIn7mtJ2s" }
        ]
      },
      {
        name: "Sân Cầu",
        label: "Social / Match (ĐEO BRACE)",
        focus: "Thi Đấu Thực Chiến 100%",
        exercises: [
          { name: "Warm-up Shadow 10'", desc: "Shadow footwork 6-góc nhẹ 10' + split-step activation. ĐEO BRACE TRƯỚC KHI VÀO SÂN.", videoId: "b4WGY4z1A3E" },
          { name: "Social / Match-play 100% — ĐEO BRACE", desc: "Thi đấu bình thường. Split-step như bản năng. Smash có wrist snap + xoay thân — không dùng vai đơn thuần.", videoId: "gy4YZS5tGxE" },
          { name: "Cool-down + Recovery", desc: "Giãn cơ bắp chân + calf stretch + foam roll IT band. Cổ chân sưng > đêm trước → giảm intensity 30% buổi sau.", videoId: "F0aO3uPs6zI" }
        ]
      },
      {
        name: "Buổi Sáng",
        label: "Daily Proprioception",
        focus: "Duy Trì Hằng Ngày — 5'",
        exercises: [
          { name: "Ankle Proprioception Sáng (5')", desc: "Single-leg balance mắt nhắm 30 s/bên + single-leg calf raise 15 rep/bên + mini-hop forward-backward 10 rep. Duy trì HÀNG NGÀY 6–12 tháng. Rhon et al. IJSPT 2021: 44.2% tái phát trong 5 năm nếu không luyện tập proprioception.", videoId: "sdiIn7mtJ2s" }
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
          Phác đồ 8 tuần tích hợp Y học thể thao (PEACE & LOVE, RTS criteria) và Huấn luyện cầu lông (sport-specific HIIT 1:2, plyometric progression) — thiết kế cho người trình độ khá đang hồi phục lật cổ chân.
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
                Luôn đeo ankle brace (ASO hoặc Aircast A60) mỗi buổi đánh cầu trong ít nhất 6–12 tháng sau chấn thương. Dừng ngay nếu đau ≥4/10 hoặc cổ chân sưng tái phát. Nội dung này không thay thế tư vấn y khoa chuyên khoa.
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
