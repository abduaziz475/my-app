import React, { useState, useEffect } from "react";
import "./App.css";

// 30 ta mutlaqo har xil dasturlash va muhandislik savollari
const questionsData = [
  {
    id: 1,
    q: "HTML-da eng katta sarlavha tegi qaysi?",
    a: ["<h6>", "<h1>", "<heading>", "<head>"],
    c: 1,
  },
  {
    id: 2,
    q: "CSS-da elementni gorizontal va vertikal markazlashtirishning mukammal usuli qaysi?",
    a: [
      "margin: auto",
      "display: flex; justify-content: center; align-items: center;",
      "float: center",
      "position: absolute; text-align: center;",
    ],
    c: 1,
  },
  {
    id: 3,
    q: "JavaScript-da o'zgarmas o'zgaruvchi qaysi kalit so'z bilan e'lon qilinadi?",
    a: ["let", "var", "const", "def"],
    c: 2,
  },
  {
    id: 4,
    q: "React-da komponent holatini saqlash uchun qaysi hook ishlatiladi?",
    a: ["useEffect", "useMemo", "useState", "useContext"],
    c: 2,
  },
  {
    id: 5,
    q: "Vite nima?",
    a: [
      "Ma'lumotlar bazasi",
      "Tezkor frontend loyiha yig'uvchi (bundler)",
      "CSS freymvorki",
      "JS kutubxonasi",
    ],
    c: 1,
  },
  {
    id: 6,
    q: "CSS-da 'z-index' nima vazifani bajaradi?",
    a: [
      "Elementning shaffofligini belgilaydi",
      "Elementlarning qatlam tartibini boshqaradi",
      "O'ng tomondan masofa beradi",
      "Shrift o'lchamini o'zgartiradi",
    ],
    c: 1,
  },
  {
    id: 7,
    q: "JavaScript array-ning oxiriga element qo'shadigan metod qaysi?",
    a: ["pop()", "shift()", "push()", "unshift()"],
    c: 2,
  },
  {
    id: 8,
    q: "React-da yon ta'sirlarni (side effects) boshqarish uchun qaysi hook qo'llaniladi?",
    a: ["useRef", "useEffect", "useCallback", "useReducer"],
    c: 1,
  },
  {
    id: 9,
    q: "HTML formalarida ma'lumot yuborilganda sahifa yangilanmasligi uchun nima qilinadi?",
    a: [
      "e.preventDefault()",
      "e.stopPropagation()",
      "return false",
      "system.pause()",
    ],
    c: 0,
  },
  {
    id: 10,
    q: "Flexbox-da asosiy o'q (main axis) yo'nalishini o'zgartiruvchi xossa qaysi?",
    a: ["justify-content", "align-items", "flex-direction", "flex-wrap"],
    c: 2,
  },
  {
    id: 11,
    q: "CSS-da 'box-sizing: border-box' nima beradi?",
    a: [
      "Padding element eniga qo'shiladi",
      "Padding va border element ichki o'lchamiga kiritiladi",
      "Elementni aylanma shaklga keltirish",
      "Tashqi marjinal chegaralarni yopish",
    ],
    c: 1,
  },
  {
    id: 12,
    q: "JavaScript-da ma'lumot turini aniqlash uchun qaysi operatordan foydalaniladi?",
    a: ["instanceof", "typeof", "typeOf", "checkType"],
    c: 1,
  },
  {
    id: 13,
    q: "React nima?",
    a: [
      "Faqat bir marta yuklanadigan SPA interfeyslar kutubxonasi",
      "Har safar yuklanadigan HTML sahifalar generatori",
      "Ma'lumotlar bazasi boshqaruvchisi",
      "Mobil o'yinlar dvijogi",
    ],
    c: 0,
  },
  {
    id: 14,
    q: "Sass (SCSS) nima?",
    a: [
      "JS freymvorki",
      "CSS preprotsessori",
      "Ma'lumotlar ombori",
      "HTML generatori",
    ],
    c: 1,
  },
  {
    id: 15,
    q: "Git-da masofaviy repozitoriyga kodni yuborish buyrug'i qaysi?",
    a: ["git pull", "git commit", "git push", "git clone"],
    c: 2,
  },
  {
    id: 16,
    q: "JavaScript-da massiv elementlarini qidirish va birinchi mos kelgan natijani olish metodi?",
    a: ["map()", "find()", "filter()", "reduce()"],
    c: 1,
  },
  {
    id: 17,
    q: "Barcha elementlar va matn rangi moslashuvchan bo'lishi uchun CSS-da qaysi birlik tavsiya etiladi?",
    a: ["px", "rem/em", "pt", "cm"],
    c: 1,
  },
  {
    id: 18,
    q: "Semantic HTML tegi hisoblangan variantni toping.",
    a: ["<div>", "<span>", "<article>", "<b>"],
    c: 2,
  },
  {
    id: 19,
    q: "React-da 'props' nima?",
    a: [
      "Komponent ichidagi xususiy holat",
      "Komponentga tashqaridan uzatiladigan ma'lumotlar",
      "Xatoliklarni tuzatuvchi tizim",
      "CSS stillar to'plami",
    ],
    c: 1,
  },
  {
    id: 20,
    q: "API bilan ishlashda ma'lumot olish (read) uchun qaysi HTTP metodi ishlatiladi?",
    a: ["POST", "PUT", "DELETE", "GET"],
    c: 3,
  },
  {
    id: 21,
    q: "JSON so'zining kengaytmasi nima?",
    a: [
      "JavaScript Object Notation",
      "Java Sync Object Node",
      "JS Over Network",
      "Just Simple Object Name",
    ],
    c: 0,
  },
  {
    id: 22,
    q: "CSS-da 'position: fixed' xususiyati qanday ishlaydi?",
    a: [
      "O'zining ota elementiga nisbatan joylashadi",
      "Brauzer oynasiga (viewport) nisbatan qotiriladi",
      "Statik holatda qoladi",
      "Hujjat oqimidan chiqmaydi",
    ],
    c: 1,
  },
  {
    id: 23,
    q: "JavaScript-da asinxron kodlarni boshqarish uchun nimalardan foydalaniladi?",
    a: [
      "Array va Object",
      "Promises va Async/Await",
      "For va While sikllari",
      "Let va Const",
    ],
    c: 1,
  },
  {
    id: 24,
    q: "React-da ro'yxat (list) yaratishda 'key' atributi nega muhim?",
    a: [
      "Elementga chiroyli stil berish uchun",
      "Virtual DOM elementlarni tez va to'g'ri yangilashi uchun",
      "Ma'lumotni shifrlash uchun",
      "Tugma bosilishini aniqlash uchun",
    ],
    c: 1,
  },
  {
    id: 25,
    q: "CSS Grid tizimida ustunlar orasidagi masofa qaysi xossa orqali beriladi?",
    a: ["margin-columns", "grid-gap / gap", "padding-grid", "spacing"],
    c: 1,
  },
  {
    id: 26,
    q: "JavaScript-da ikkita qiymatni turi va qiymati bo'yicha qat'iy tekshirish operatori?",
    a: ["==", "===", "=", "!="],
    c: 1,
  },
  {
    id: 27,
    q: "Tailwind CSS nima?",
    a: [
      "Utility-first CSS freymvorki",
      "JS animatsiyalar kutubxonasi",
      "Dizayn chizadigan dastur",
      "Backend platformasi",
    ],
    c: 0,
  },
  {
    id: 28,
    q: "GitHub nima?",
    a: [
      "Dasturlash tili",
      "Git omborlarini joylashtirish va loyihani boshqarish bulutli xizmati",
      "Operatsion tizim",
      "Kompilyator",
    ],
    c: 1,
  },
  {
    id: 29,
    q: "React-da 'useRef' hookining asosiy vazifalaridan biri?",
    a: [
      "Global state yaratish",
      "DOM elementiga to'g'ridan-to'g'ri murojaat qilish",
      "Sahifani qayta yuklash",
      "API so'rov yuborish",
    ],
    c: 1,
  },
  {
    id: 30,
    q: "Loyiha yuklanish tezligini oshirish va rasmlarni optimallashtirish formati qaysi?",
    a: ["BMP", "WebP", "TIFF", "GIF"],
    c: 1,
  },
];

// Dastlabki ma'lumotlar bazasi
const initialStudents = [
  {
    id: 1,
    name: "Nebi",
    direction: "Frontend",
    practiceLink: "https://nebi-dashboard.vercel.app",
    testScore: 29,
    totalScore: 98,
    certType: "Master",
    pic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
  },
  {
    id: 2,
    name: "Asilbek",
    direction: "Backend",
    practiceLink: "https://asil-api.vercel.app",
    testScore: 24,
    totalScore: 80,
    certType: "Expert",
    pic: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
  },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [userAuth, setUserAuth] = useState(null); // { name: '', direction: '' }
  const [authName, setAuthName] = useState("");
  const [authDirection, setAuthDirection] = useState("Frontend");

  const [activeTab, setActiveTab] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [studentsList, setStudentsList] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Amaliyot inputs
  const [prFullName, setPrFullName] = useState("");
  const [prVercelLink, setPrVercelLink] = useState("");

  // Test state
  const [testAnswers, setTestAnswers] = useState({});
  const [testFinished, setTestFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // ⬇️ SHUNI QO‘SH
  const handleTestOptionClick = (questionId, optionIndex) => {
    setTestAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Bilimlarimizni sinab ko'rish inputs
  const [sinovName, setSinovName] = useState("");
  const [sinovVercel, setSinovVercel] = useState("");

  // Sertifikat boshqaruvchi state
  const [certStudentId, setCertStudentId] = useState("");
  const [certSelectedType, setCertSelectedType] = useState("Standard");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Telegram guruhga va botga uzatish funksiyasi (Real Asynchronous API)
  const sendToTelegram = async (message) => {
    const botToken = "7483920132:AAFlk93jDksjdhf823jdhskj"; // Real token o'rni
    const chatId = "123456789"; // Guruh idsi
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });
    } catch (err) {
      console.log(
        "Telegram tarmoq xatosi (Lekin tizim ishlashda davom etadi):",
        message
      );
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authName.trim()) return;
    setUserAuth({ name: authName, direction: authDirection });
  };

  // Amaliyot formasi topshirilganda
  const handleAmaliyotSubmit = (e) => {
    e.preventDefault();
    if (!prFullName.trim() || !prVercelLink.trim()) return;

    const msg = `💻 YANGI AMALIYOT ISHI\n\nTalaba: ${prFullName}\nYo'nalish: ${userAuth?.direction}\nHavola: ${prVercelLink}`;
    sendToTelegram(msg);

    const newStudent = {
      id: Date.now(),
      name: prFullName,
      direction: userAuth?.direction || "Frontend",
      practiceLink: prVercelLink,
      testScore: 0,
      totalScore: 50, // Boshlang'ich amaliyot bali
      certType: "Standard",
      pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    };

    setStudentsList([newStudent, ...studentsList]);
    alert(
      "🚀 Amaliyot tekshirishga yuborildi! Telegram botga va Baholar sahifasiga muvaffaqiyatli integratsiya qilindi."
    );
    setPrFullName("");
    setPrVercelLink("");
    setActiveTab("baholar");
  };

  // 30 talik test yakunlanganda
  const finishTestExam = () => {
    const answeredCount = Object.keys(testAnswers).length;
    if (answeredCount < 30) {
      alert(
        `⚠️ TO'XTANG! Siz barcha savollarga javob bermadingiz. Tizimda 1 ta savolni ham tashlab ketish mumkin emas!\n\nHozircha yechildi: ${answeredCount} / 30`
      );
      return;
    }

    let correctCount = 0;
    questionsData.forEach((item) => {
      if (testAnswers[item.id] === item.c) {
        correctCount++;
      }
    });

    setFinalScore(correctCount);
    setTestFinished(true);

    const calculatedBall = Math.round(correctCount * 3.33);
    const msg = `📊 TEST IMTIHON NATIJASI\n\nIsm: ${userAuth?.name}\nKurs: ${userAuth?.direction}\nTo'g'ri javoblar: ${correctCount} / 30\nTo'plangan ball: ${calculatedBall}`;
    sendToTelegram(msg);

    // Baholar sahifasidagi ro'yxatga qo'shish yoki yangilash
    const existIndex = studentsList.findIndex(
      (s) => s.name.toLowerCase() === userAuth?.name.toLowerCase()
    );
    if (existIndex !== -1) {
      const updated = [...studentsList];
      updated[existIndex].testScore = correctCount;
      updated[existIndex].totalScore = calculatedBall + 50; // Amaliyot balli bilan qo'shib hisoblanadi
      setStudentsList(updated);
    } else {
      setStudentsList([
        {
          id: Date.now(),
          name: userAuth?.name,
          direction: userAuth?.direction,
          practiceLink: "Kiritilmagan",
          testScore: correctCount,
          totalScore: calculatedBall,
          certType: "Standard",
          pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        },
        ...studentsList,
      ]);
    }
  };

  // Bilimni sinash bo'limi topshirilganda
  const handleSinovSubmit = (e) => {
    e.preventDefault();
    if (!sinovName.trim() || !sinovVercel.trim()) return;

    const msg = `💡 BILIMNI SINASH HAVOLASI\n\nIsm: ${sinovName}\nVercel Linki: ${sinovVercel}`;
    sendToTelegram(msg);

    setStudentsList([
      {
        id: Date.now(),
        name: sinovName,
        direction: "Sinov Guruhi",
        practiceLink: sinovVercel,
        testScore: 0,
        totalScore: 45,
        certType: "Standard",
        pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      },
      ...studentsList,
    ]);

    alert(
      "Muvaffaqiyatli bajarildi! Havola guruh va foydalanuvchilar oynasiga joylashtirildi."
    );
    setSinovName("");
    setSinovVercel("");
    setActiveTab("baholar");
  };

  // Sertifikat darajasini o'zgartirish
  const updateCertificateType = (e) => {
    e.preventDefault();
    if (!certStudentId) return;
    const updated = studentsList.map((st) => {
      if (st.id === parseInt(certStudentId)) {
        return { ...st, certType: certSelectedType };
      }
      return st;
    });
    setStudentsList(updated);
    alert(
      "🎯 Talabaga yangi unvon va sertifikat turi muvaffaqiyatli biriktirildi!"
    );
  };

  if (showSplash) {
    return (
      <div className="splash-container">
        <div className="splash-text">Abduaziz Developer</div>
      </div>
    );
  }

  if (!userAuth) {
    return (
      <div className={`auth-wrapper ${!isDarkMode ? "light-theme" : ""}`}>
        <div className="auth-card">
          <h2>Tizimga Kirish</h2>
          <form onSubmit={handleAuthSubmit}>
            <div className="input-field-group">
              <label>Ism-sharfingizni kiriting:</label>
              <input
                type="text"
                className="cyber-input"
                required
                placeholder="Masalan: Abduaziz"
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
              />
            </div>
            <div className="input-field-group">
              <label>Yo'nalishni tanlang:</label>
              <select
                className="cyber-select"
                value={authDirection}
                onChange={(e) => setAuthDirection(e.target.value)}
              >
                <option value="Frontend">Frontend Developer</option>
                <option value="Backend">Backend Developer</option>
                <option value="Fullstack">Fullstack Muhandis</option>
                <option value="Mobile App">
                  Mobile (Flutter / React Native)
                </option>
              </select>
            </div>
            <button type="submit" className="cyber-btn">
              Tizimni Ishga Tushirish
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-layout ${!isDarkMode ? "light-theme" : ""}`}>
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar-nav">
        <div>
          <div className="logo-section">HUB DASHBOARD</div>
          <nav className="nav-links">
            <button
              className={`nav-button ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              <span>🏠 Bosh Sahifa</span>
            </button>
            <button
              className={`nav-button ${
                activeTab === "baholar" ? "active" : ""
              }`}
              onClick={() => setActiveTab("baholar")}
            >
              <span>📈 Baholar Paneli</span>
            </button>
            <button
              className={`nav-button ${
                activeTab === "amaliyot" ? "active" : ""
              }`}
              onClick={() => setActiveTab("amaliyot")}
            >
              <span>💻 Amaliyot</span>
            </button>
            <button
              className={`nav-button ${activeTab === "test" ? "active" : ""}`}
              onClick={() => setActiveTab("test")}
            >
              <span>🔥 30 Talik Test</span>
            </button>
            <button
              className={`nav-button ${activeTab === "sinov" ? "active" : ""}`}
              onClick={() => setActiveTab("sinov")}
            >
              <span>🧠 Bilimni Sinash</span>
            </button>
            <button
              className={`nav-button ${
                activeTab === "sertifikat" ? "active" : ""
              }`}
              onClick={() => setActiveTab("sertifikat")}
            >
              <span>🎓 Sertifikatlar</span>
            </button>
          </nav>
        </div>
        <button
          className="mode-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "☀️ Kunduzgi Rejim" : "🌙 Tungi Rejim"}
        </button>
      </aside>

      {/* ASOSIY KONTENT */}
      <main className="content-frame">
        <header
          style={{
            marginBottom: "35px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--border-neon)",
            paddingBottom: "20px",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--neon-blue)",
                fontFamily: "Orbitron",
                fontWeight: "bold",
              }}
            >
              FOYDALANUVCHI SEANSI:
            </span>
            <h2 style={{ fontSize: "1.5rem", marginTop: "4px" }}>
              {userAuth.name} |{" "}
              <span style={{ color: "var(--neon-purple)" }}>
                {userAuth.direction}
              </span>
            </h2>
          </div>
        </header>

        {/* BOSH SAHIFA (3 XIL CARD) */}
        {activeTab === "home" && (
          <div>
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,242,254,0.07) 0%, rgba(157,77,221,0.07) 100%)",
                padding: "35px",
                borderRadius: "16px",
                border: "1px solid var(--border-neon)",
                marginBottom: "35px",
              }}
            >
              <h1
                style={{
                  fontFamily: "Orbitron",
                  fontSize: "2rem",
                  marginBottom: "10px",
                }}
              >
                Salom, {userAuth.name}!
              </h1>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
                Platformaga xush kelibsiz. Bu yerda siz barcha yo'nalishlar
                bo'yicha amaliy topshiriqlarni yuklashingiz, 30 talik
                takrorlanmas test tizimida qatnashishingiz va natijalarni
                telegramga ulashingiz mumkin.
              </p>
            </div>
            <div className="home-cards-grid">
              <div
                className="interactive-neon-card"
                onClick={() => setActiveTab("baholar")}
              >
                <h3 style={{ color: "var(--neon-blue)", marginBottom: "12px" }}>
                  📊 Baholar & Reyting
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  Barcha foydalanuvchilarning real vaqtdagi ballari,
                  sertifikatlari va Vercel loyihalarini kuzating.
                </p>
              </div>
              <div
                className="interactive-neon-card"
                onClick={() => setActiveTab("amaliyot")}
              >
                <h3
                  style={{ color: "var(--neon-green)", marginBottom: "12px" }}
                >
                  💻 Amaliyot Yuklash
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  O'z loyihalaringiz havolalarini joylashtiring va reyting
                  tizimiga integratsiya qiling.
                </p>
              </div>
              <div
                className="interactive-neon-card"
                onClick={() => setActiveTab("test")}
              >
                <h3
                  style={{ color: "var(--neon-purple)", marginBottom: "12px" }}
                >
                  ⚡ 30 Talik Imtihon
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  Hech qaysi savolni tashlab ketmasdan yechilishi majburiy
                  bo'lgan mukammal test.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BAHOLAR PANELI */}
        {activeTab === "baholar" && (
          <div>
            <h2 style={{ fontFamily: "Orbitron", marginBottom: "25px" }}>
              Talabalar Matrix Ro'yxati
            </h2>
            <div className="matrix-list-grid">
              {studentsList.map((st) => (
                <div
                  key={st.id}
                  className="student-matrix-card"
                  onClick={() => setSelectedStudent(st)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <img
                      src={st.pic}
                      alt=""
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid var(--neon-blue)",
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: "1.1rem" }}>{st.name}</h4>
                      <small style={{ color: "var(--text-muted)" }}>
                        {st.direction}
                      </small>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      borderTop: "1px solid var(--border-neon)",
                      paddingTop: "15px",
                      fontSize: "0.9rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifycontent: "space-between",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span>To'plangan Ball:</span>
                      <strong style={{ color: "var(--neon-blue)" }}>
                        {st.totalScore} ball
                      </strong>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Sertifikat Turi:</span>
                      <strong style={{ color: "var(--neon-green)" }}>
                        {st.certType}
                      </strong>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "15px",
                      textAlign: "center",
                      fontSize: "0.75rem",
                      color: "var(--neon-purple)",
                      fontWeight: "600",
                    }}
                  >
                    Batafsil ma'lumot (Hujjat va Havolalar) 🔍
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AMALIYOT SAHIFASI */}
        {activeTab === "amaliyot" && (
          <div style={{ maxWidth: "600px" }}>
            <h2 style={{ fontFamily: "Orbitron", marginBottom: "25px" }}>
              Amaliyot Ishini Topshirish
            </h2>
            <form
              onSubmit={handleAmaliyotSubmit}
              className="interactive-neon-card"
            >
              <div className="input-field-group">
                <label>To'liq Ism-sharifingiz (Full Name):</label>
                <input
                  type="text"
                  className="cyber-input"
                  required
                  placeholder="Ismingizni kiriting"
                  value={prFullName}
                  onChange={(e) => setPrFullName(e.target.value)}
                />
              </div>
              <div className="input-field-group">
                <label>Amaliyotning Vercel Havolasi (Vercel Link):</label>
                <input
                  type="url"
                  className="cyber-input"
                  required
                  placeholder="https://myproject.vercel.app"
                  value={prVercelLink}
                  onChange={(e) => setPrVercelLink(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="cyber-btn"
                style={{ marginTop: "10px" }}
              >
                Loyihani Topshirish
              </button>
            </form>
          </div>
        )}

        {/* 30 TALIK TEST */}
        {activeTab === "test" && (
          <div className="quiz-container-box">
            <h2 style={{ fontFamily: "Orbitron", marginBottom: "10px" }}>
              Professional Imtihon (30 ta Savol)
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                marginBottom: "30px",
                fontSize: "0.9rem",
              }}
            >
              ⚠️ Ogohlantirish: Testdan o'tish uchun barcha savollarga javob
              berishingiz shart. Aks holda natija hisoblanmaydi.
            </p>

            {!testFinished ? (
              <div>
                {questionsData.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      marginBottom: "35px",
                      borderBottom: "1px solid var(--border-neon)",
                      paddingBottom: "25px",
                    }}
                  >
                    <h4 style={{ fontSize: "1.15rem", marginBottom: "15px" }}>
                      {index + 1}. {item.q}
                    </h4>
                    <div>
                      {item.a.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`quiz-option-row ${
                            testAnswers[item.id] === oIdx ? "selected" : ""
                          }`}
                          onClick={() => handleTestOptionClick(item.id, oIdx)}
                        >
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              border: "2px solid var(--text-muted)",
                              background:
                                testAnswers[item.id] === oIdx
                                  ? "var(--neon-blue)"
                                  : "transparent",
                            }}
                          />
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  className="cyber-btn"
                  onClick={finishTestExam}
                  style={{ marginTop: "20px" }}
                >
                  Natijani Hisoblash & Telegramga Uzatish
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <h3
                  style={{
                    color: "var(--neon-green)",
                    fontSize: "2rem",
                    marginBottom: "15px",
                  }}
                >
                  Imtihon Yakunlandi!
                </h3>
                <p style={{ fontSize: "1.2rem" }}>
                  Siz 30 ta savoldan <strong>{finalScore}</strong> tasiga
                  to'g'ri javob berdingiz.
                </p>
                <button
                  className="cyber-btn"
                  style={{ maxWidth: "280px", marginTop: "25px" }}
                  onClick={() => {
                    setTestAnswers({});
                    setTestFinished(false);
                  }}
                >
                  Qayta Urinish
                </button>
              </div>
            )}
          </div>
        )}

        {/* BILIMLARIMIZNI SINAB KO'RISH */}
        {activeTab === "sinov" && (
          <div style={{ maxWidth: "600px" }}>
            <h2 style={{ fontFamily: "Orbitron", marginBottom: "20px" }}>
              Bilimlarimizni Sinab Ko'rish
            </h2>
            <form
              onSubmit={handleSinovSubmit}
              className="interactive-neon-card"
            >
              <div className="input-field-group">
                <label>Foydalanuvchi nomi (Full Name):</label>
                <input
                  type="text"
                  className="cyber-input"
                  required
                  placeholder="Ismingizni kiriting"
                  value={sinovName}
                  onChange={(e) => setSinovName(e.target.value)}
                />
              </div>
              <div className="input-field-group">
                <label>Vercel Havolasi (Vercel Link):</label>
                <input
                  type="url"
                  className="cyber-input"
                  required
                  placeholder="https://sinov-loyiha.vercel.app"
                  value={sinovVercel}
                  onChange={(e) => setSinovVercel(e.target.value)}
                />
              </div>
              <button type="submit" className="cyber-btn">
                Havolani Botga va Foydalanuvchilarga Yuborish
              </button>
            </form>
          </div>
        )}

        {/* SERTIFIKAT BO'LIMI */}
        {activeTab === "sertifikat" && (
          <div>
            <h2 style={{ fontFamily: "Orbitron", marginBottom: "25px" }}>
              Sertifikat va Unvonlar Berish
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
              }}
            >
              <form
                onSubmit={updateCertificateType}
                className="interactive-neon-card"
              >
                <h4 style={{ marginBottom: "20px", color: "var(--neon-blue)" }}>
                  Talaba Darajasini O'zgartirish
                </h4>
                <div className="input-field-group">
                  <label>Talabani tanlang:</label>
                  <select
                    className="cyber-select"
                    value={certStudentId}
                    onChange={(e) => setCertStudentId(e.target.value)}
                    required
                  >
                    <option value="">-- Tanlash --</option>
                    {studentsList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.direction})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-field-group">
                  <label>Sertifikat Turini Tanlang:</label>
                  <select
                    className="cyber-select"
                    value={certSelectedType}
                    onChange={(e) => setCertSelectedType(e.target.value)}
                  >
                    <option value="Master">Master Darajali Sertifikat</option>
                    <option value="Expert">Expert Darajali Sertifikat</option>
                    <option value="Standard">
                      Standart Darajali Sertifikat
                    </option>
                  </select>
                </div>
                <button type="submit" className="cyber-btn">
                  Unvonni Tasdiqlash
                </button>
              </form>

              <div className="interactive-neon-card">
                <h4 style={{ marginBottom: "15px", fontFamily: "Orbitron" }}>
                  Statistika (O'rinlar ko'rsatkichi)
                </h4>
                <p style={{ marginBottom: "10px" }}>
                  🥇 Master Darajali:{" "}
                  {studentsList.filter((s) => s.certType === "Master").length}{" "}
                  ta talaba
                </p>
                <p style={{ marginBottom: "10px" }}>
                  ⚡ Expert Darajali:{" "}
                  {studentsList.filter((s) => s.certType === "Expert").length}{" "}
                  ta talaba
                </p>
                <p>
                  📝 Standart Darajali:{" "}
                  {studentsList.filter((s) => s.certType === "Standard").length}{" "}
                  ta talaba
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* BATAFSIL MODAL OYNASI */}
      {selectedStudent && (
        <div
          className="custom-modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="modal-content-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal-btn"
              onClick={() => setSelectedStudent(null)}
            >
              ×
            </button>
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <img
                src={selectedStudent.pic}
                alt=""
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid var(--neon-blue)",
                  marginBottom: "12px",
                }}
              />
              <h3 style={{ fontSize: "1.5rem", fontFamily: "Orbitron" }}>
                {selectedStudent.name}
              </h3>
              <p style={{ color: "var(--neon-purple)", fontWeight: "600" }}>
                {selectedStudent.direction}
              </p>
            </div>
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                padding: "20px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <p>
                🎯 <strong>Test Natijasi:</strong> {selectedStudent.testScore} /
                30 to'g'ri jvob
              </p>
              <p>
                🎓 <strong>Sertifikat Turi:</strong>{" "}
                <span
                  style={{ color: "var(--neon-green)", fontWeight: "bold" }}
                >
                  {selectedStudent.certType} Darajali
                </span>
              </p>
              <p>
                💎 <strong>Umumiy Ball:</strong> {selectedStudent.totalScore}{" "}
                ball
              </p>
              <p>
                🔗 <strong>Loyiha Linki:</strong>{" "}
                <a
                  href={selectedStudent.practiceLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--neon-blue)", textDecoration: "none" }}
                >
                  Vercel Saytga kirish ↗
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
