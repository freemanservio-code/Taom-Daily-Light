import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { name: "All", emoji: "✨" },
  { name: "Love", emoji: "❤️" },
  { name: "Compassion", emoji: "🕊️" },
  { name: "Happiness", emoji: "😊" },
  { name: "Giving", emoji: "🙌" },
  { name: "Gratitude", emoji: "🙏" },
  { name: "Well-being", emoji: "🌿" },
  { name: "Mind", emoji: "🧠" },
  { name: "Freedom", emoji: "🕊️" },
];

const QUOTES = [
  // Love
  { category: "Love", emoji: "❤️", title: "Love is All", text: "Love is what we were born with. Fear is what we learned here. The spiritual journey is the relinquishment of fear and the acceptance of love.", author: "A Course in Miracles" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.", author: "Rumi" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "The beginning of love is to let those we love be perfectly themselves.", author: "Thomas Merton" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "Love is the bridge between you and everything.", author: "Rumi" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "To love is to recognize yourself in another.", author: "Eckhart Tolle" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "Love is not something we give or get; it is something that we nurture and grow.", author: "Thich Nhat Hanh" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "The whole world is sustained by love.", author: "Hafiz" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "Where there is love there is life.", author: "Mahatma Gandhi" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "Love is the only reality and it is not a mere sentiment.", author: "Rabindranath Tagore" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "Love cures people — both the ones who give it and the ones who receive it.", author: "Karl Menninger" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "Love is the flower you've got to let grow.", author: "John Lennon" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "We are most alive when we're in love.", author: "John Updike" },
  { category: "Love", emoji: "❤️", title: "Love is All", text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
  // Compassion
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "If you want others to be happy, practice compassion. If you want to be happy, practice compassion.", author: "Dalai Lama" },
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "Compassion is not a relationship between the healer and the wounded. It's a relationship between equals.", author: "Pema Chödrön" },
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "Have compassion for all beings, rich and poor alike; each has their suffering.", author: "Buddha" },
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "Love and compassion are necessities, not luxuries. Without them, humanity cannot survive.", author: "Dalai Lama" },
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "No act of kindness, no matter how small, is ever wasted.", author: "Aesop" },
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "Until he extends the circle of his compassion to all living things, man will not himself find peace.", author: "Albert Schweitzer" },
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "A human being is a part of the whole called by us Universe.", author: "Albert Einstein" },
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "The purpose of human life is to serve and to show compassion.", author: "Albert Schweitzer" },
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "Compassion is the wish for another being to be free from suffering.", author: "Dalai Lama" },
  { category: "Compassion", emoji: "🕊️", title: "Open Your Heart", text: "Too often we underestimate the power of a touch, a smile, a kind word.", author: "Leo Buscaglia" },
  // Happiness
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "The present moment is the only moment available to us, and it is the door to all moments.", author: "Thich Nhat Hanh" },
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "Very little is needed to make a happy life; it is all within yourself.", author: "Marcus Aurelius" },
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "Be happy in the moment, that's enough. Each moment is all we need, not more.", author: "Mother Teresa" },
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" },
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "Joy is the simplest form of gratitude.", author: "Karl Barth" },
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "The secret of happiness is not in doing what one likes, but in liking what one does.", author: "James M. Barrie" },
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "Happiness is a direction, not a place.", author: "Sydney J. Harris" },
  { category: "Happiness", emoji: "😊", title: "Choose Joy", text: "The most wasted of days is one without laughter.", author: "E.E. Cummings" },
  // Giving
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "The wise man does not lay up his own treasures. The more he gives to others, the more he has for his own.", author: "Lao Tzu" },
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "We make a living by what we get, but we make a life by what we give.", author: "Winston Churchill" },
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "No one has ever become poor by giving.", author: "Anne Frank" },
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "You give but little when you give of your possessions. It is when you give of yourself that you truly give.", author: "Kahlil Gibran" },
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "Give, but give until it hurts.", author: "Mother Teresa" },
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "It is not how much we give but how much love we put into giving.", author: "Mother Teresa" },
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "The meaning of life is to find your gift. The purpose of life is to give it away.", author: "Pablo Picasso" },
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened.", author: "Buddha" },
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "Real generosity toward the future lies in giving all to the present.", author: "Albert Camus" },
  { category: "Giving", emoji: "🙌", title: "Give Freely", text: "To give and not count the cost.", author: "St. Ignatius of Loyola" },
  // Gratitude
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "Gratitude is the fairest blossom which springs from the soul.", author: "Henry Ward Beecher" },
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "Be thankful for what you have; you'll end up having more.", author: "Oprah Winfrey" },
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "The root of joy is gratefulness.", author: "David Steindl-Rast" },
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "Gratitude turns what we have into enough.", author: "Aesop" },
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "Gratitude is not only the greatest of virtues, but the parent of all others.", author: "Cicero" },
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "When you are grateful, fear disappears and abundance appears.", author: "Anthony Robbins" },
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "Acknowledging the good that you already have in your life is the foundation for all abundance.", author: "Eckhart Tolle" },
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "Let us be grateful to the people who make us happy.", author: "Marcel Proust" },
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.", author: "Melody Beattie" },
  { category: "Gratitude", emoji: "🙏", title: "Be Thankful", text: "Joy is the simplest form of gratitude.", author: "Karl Barth" },
  // Well-being
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "The greatest wealth is health.", author: "Virgil" },
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear.", author: "Buddha" },
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "Health is a state of complete harmony of the body, mind and spirit.", author: "B.K.S. Iyengar" },
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "The part can never be well unless the whole is well.", author: "Plato" },
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "A calm mind brings inner strength and self-confidence.", author: "Dalai Lama" },
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "Sleep is the best meditation.", author: "Dalai Lama" },
  { category: "Well-being", emoji: "🌿", title: "Nurture Yourself", text: "Your body is precious. It is our vehicle for awakening. Treat it with care.", author: "Buddha" },
  // Mind
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "The mind is everything. What you think you become.", author: "Buddha" },
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "Silence the mind and the soul will speak.", author: "TAOM" },
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "You have power over your mind, not outside events. Realize this and you will find strength.", author: "Marcus Aurelius" },
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "The quieter you become, the more you can hear.", author: "Ram Dass" },
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "Your vision will become clear only when you can look into your own heart.", author: "Carl Jung" },
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "The only journey is the one within.", author: "Rainer Maria Rilke" },
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "When the mind is pure, joy follows like a shadow that never departs.", author: "Buddha" },
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "What we think, we become.", author: "Buddha" },
  { category: "Mind", emoji: "🧠", title: "Still Your Mind", text: "The soul that sees beauty may sometimes walk alone.", author: "Goethe" },
  // Freedom
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "Between stimulus and response there is a space. In that space is our power to choose our freedom.", author: "Viktor Frankl" },
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "Freedom is not worth having if it does not include the freedom to make mistakes.", author: "Mahatma Gandhi" },
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "No one is free who has not obtained the empire of himself.", author: "Pythagoras" },
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "Letting go gives us freedom, and freedom is the only condition for happiness.", author: "Thich Nhat Hanh" },
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "The most courageous act is still to think for yourself. Aloud.", author: "Coco Chanel" },
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "Real freedom is having nothing to hide.", author: "Henri Nouwen" },
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "Freedom is the oxygen of the soul.", author: "Moshe Dayan" },
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "Man is born free, and everywhere he is in chains.", author: "Jean-Jacques Rousseau" },
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.", author: "Albert Camus" },
  { category: "Freedom", emoji: "🕊️", title: "Be Free", text: "He who has overcome his fears will truly be free.", author: "Aristotle" },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

function TriangleLogo() {
  // Triforce: outer triangle + 3 inner triangles (2 up, 1 down center)
  // Outer vertices: top=(50,2), bottom-left=(2,90), bottom-right=(98,90)
  // Midpoints:      mid-left=(26,46), mid-right=(74,46), mid-bottom=(50,90)
  return (
    <svg viewBox="0 0 100 92" width="120" height="110" style={{ display: "block", margin: "0 auto" }}>
      {/* Outer triangle */}
      <polygon points="50,2 98,90 2,90" fill="none" stroke="#e8a020" strokeWidth="4" strokeLinejoin="round" />
      {/* Top inner triangle pointing UP */}
      <polygon points="50,2 26,46 74,46" fill="none" stroke="#e8a020" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Bottom-left inner triangle pointing UP */}
      <polygon points="26,46 2,90 50,90" fill="none" stroke="#e8a020" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Bottom-right inner triangle pointing UP */}
      <polygon points="74,46 50,90 98,90" fill="none" stroke="#e8a020" strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
}

function SpinningSun() {
  return (
    <>
      <style>{`
        @keyframes spinSun {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sun-spin {
          animation: spinSun 10s linear infinite;
          transform-origin: center center;
          display: inline-block;
          font-size: 56px;
          line-height: 1;
        }
      `}</style>
      <div style={{ textAlign: "center", margin: "6px 0" }}>
        <span className="sun-spin">☀️</span>
      </div>
    </>
  );
}

export default function DailyLight() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [translatedQuote, setTranslatedQuote] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [fade, setFade] = useState(true);
  const langRef = useRef(null);

  const filtered = selectedCategory === "All" ? QUOTES : QUOTES.filter(q => q.category === selectedCategory);
  const total = filtered.length;
  const current = filtered[quoteIndex] || filtered[0];

  useEffect(() => {
    setFade(false);
    setTranslatedQuote(null);
    const t = setTimeout(() => setFade(true), 180);
    return () => clearTimeout(t);
  }, [quoteIndex, selectedCategory]);

  useEffect(() => {
    function close(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setShowLangMenu(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function next() { setQuoteIndex(i => (i + 1) % total); }
  function prev() { setQuoteIndex(i => (i - 1 + total) % total); }

  function handleCategory(name) {
    setSelectedCategory(name);
    setQuoteIndex(0);
  }

  async function translate(lang) {
    setShowLangMenu(false);
    if (lang.code === "en") { setTranslatedQuote(null); return; }
    setTranslating(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Translate to ${lang.label}. Return ONLY:
QUOTE: [translated quote]
AUTHOR: [author, keep name as-is]

"${current.text}" — ${current.author}`
          }]
        })
      });
      const data = await res.json();
      const txt = data.content?.[0]?.text || "";
      const qm = txt.match(/QUOTE:\s*(.+)/);
      const am = txt.match(/AUTHOR:\s*(.+)/);
      if (qm) setTranslatedQuote({ text: qm[1].trim(), author: am ? am[1].trim() : current.author });
    } catch (e) { console.error(e); }
    setTranslating(false);
  }

  const display = translatedQuote || current;
  const DOT_COLS = 18;
  const dots = Array.from({ length: Math.min(total, 108) });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #fde98a 0%, #fdd96a 40%, #fce878 100%)",
      fontFamily: "Georgia, 'Times New Roman', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 0 32px",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeUp 0.4s ease forwards; }
        .cat-pill {
          border: 2px solid #d4b06a;
          background: #fff8e6;
          color: #7a4a10;
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          font-family: Georgia, serif;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }
        .cat-pill:hover { background: #ffe9a0; }
        .cat-pill.active { background: #f5a623; border-color: #f5a623; color: #fff; font-weight: bold; }
        .nav-circle {
          width: 52px; height: 52px; border-radius: 50%;
          background: #fff; border: none; font-size: 22px;
          color: #c08020; cursor: pointer;
          box-shadow: 0 2px 10px #00000015;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .nav-circle:hover { background: #fff8e6; transform: scale(1.05); }
      `}</style>

      {/* Language button row */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: "16px 16px 0", boxSizing: "border-box" }}>
        <div ref={langRef} style={{ position: "relative" }}>
          <button onClick={() => setShowLangMenu(v => !v)} style={{
            background: "#fff",
            border: "1.5px solid #d4b06a",
            borderRadius: 999,
            padding: "7px 14px",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "Georgia, serif",
            color: "#7a4a10",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}>
            {selectedLang.flag} {selectedLang.label} ▼
          </button>
          {showLangMenu && (
            <div style={{
              position: "absolute", top: "110%", right: 0,
              background: "#fff", border: "1px solid #d4b06a",
              borderRadius: 12, boxShadow: "0 8px 24px #00000018",
              zIndex: 100, minWidth: 140, overflow: "hidden",
            }}>
              {LANGUAGES.map(lang => (
                <button key={lang.code} onClick={() => { setSelectedLang(lang); translate(lang); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "9px 16px", border: "none",
                    background: selectedLang.code === lang.code ? "#fff8e6" : "none",
                    cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif", color: "#7a4a10",
                    fontWeight: selectedLang.code === lang.code ? "bold" : "normal",
                  }}>
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Triangle logo */}
      <div style={{ marginTop: 4 }}>
        <TriangleLogo />
      </div>

      {/* TAOM */}
      <div style={{
        fontFamily: "'Times New Roman', Times, serif",
        fontWeight: "bold",
        fontSize: 48,
        color: "#1a3a8f",
        letterSpacing: 8,
        lineHeight: 1.1,
        textAlign: "center",
        margin: "2px 0",
      }}>TAOM</div>

      {/* Spinning Sun */}
      <SpinningSun />

      {/* Daily Light — BIGGER */}
      <div style={{
        fontSize: 42,
        fontWeight: "bold",
        color: "#7a3010",
        fontFamily: "Georgia, serif",
        textAlign: "center",
        margin: "2px 0 4px",
        letterSpacing: 1,
      }}>Daily Light</div>

      {/* Reminders for the Heart — edge to edge */}
      <div style={{
        fontSize: 26,
        color: "#a06030",
        fontStyle: "italic",
        fontFamily: "Georgia, serif",
        textAlign: "center",
        width: "100%",
        padding: "0 8px",
        boxSizing: "border-box",
        marginBottom: 12,
        letterSpacing: 0.5,
      }}>Reminders for the Heart</div>

      {/* Category buttons */}
      <div style={{
        display: "flex", flexWrap: "wrap", justifyContent: "center",
        gap: 8, padding: "4px 14px 10px", width: "100%", boxSizing: "border-box",
      }}>
        {CATEGORIES.map(cat => (
          <button key={cat.name}
            className={`cat-pill${selectedCategory === cat.name ? " active" : ""}`}
            onClick={() => handleCategory(cat.name)}>
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Quote card */}
      <div style={{
        background: "#fffdf5",
        borderRadius: 20,
        margin: "4px 14px",
        padding: "32px 24px 24px",
        width: "calc(100% - 28px)",
        boxSizing: "border-box",
        boxShadow: "0 2px 16px #00000010",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #f0e0b0",
      }}>
        {translating ? (
          <div style={{ color: "#a06030", fontSize: 14, textAlign: "center", padding: "20px 0" }}>
            Translating...
          </div>
        ) : (
          <div className={fade ? "fade-in" : ""} style={{ textAlign: "center", width: "100%" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>{current.emoji}</div>
            <div style={{ fontSize: 19, fontWeight: "bold", color: "#7a3010", marginBottom: 16 }}>
              {current.title}
            </div>
            <div style={{
              fontSize: 16, lineHeight: 1.85, color: "#3a2010",
              fontStyle: "italic", marginBottom: 18, textAlign: "center",
            }}>
              "{display.text}"
            </div>
            <div style={{ fontSize: 14, color: "#c07830", fontWeight: "bold", textAlign: "right" }}>
              — {display.author}
            </div>
            {translatedQuote && (
              <div style={{ fontSize: 11, color: "#b09060", textAlign: "right", marginTop: 4 }}>
                {selectedLang.flag} {selectedLang.label}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dot grid */}
      <div style={{ padding: "12px 16px 4px", width: "100%", boxSizing: "border-box" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${DOT_COLS}, 1fr)`,
          gap: 4,
          maxWidth: 380,
          margin: "0 auto",
        }}>
          {dots.map((_, i) => (
            <div key={i} onClick={() => setQuoteIndex(i)}
              style={{
                width: 10, height: 10, borderRadius: "50%",
                background: i === quoteIndex ? "#f5a623" : "none",
                border: `1.5px solid ${i === quoteIndex ? "#f5a623" : "#c8a040"}`,
                cursor: "pointer",
                transition: "all 0.15s",
              }} />
          ))}
        </div>
      </div>

      {/* Nav arrows + counter */}
      <div style={{ display: "flex", alignItems: "center", gap: 28, margin: "12px 0 4px" }}>
        <button className="nav-circle" onClick={prev}>‹</button>
        <span style={{ fontSize: 13, color: "#a06030", fontFamily: "Georgia, serif", minWidth: 70, textAlign: "center" }}>
          {quoteIndex + 1} of {total}
        </span>
        <button className="nav-circle" onClick={next}>›</button>
      </div>
    </div>
  );
}
