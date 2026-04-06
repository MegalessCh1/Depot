/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Model data defined directly for ease of use and type safety
const MODELS_DATA: Record<string, { name: string; chineseName: string; desc: string }> = {
  "1800": {
    name: "MODEL 1800",
    chineseName: "极简主义石材美学",
    desc: "以极简主义为核心，赋予石材全新的生命力。完美融合了天然纹理与现代工艺。"
  },
  "1807": {
    name: "MODEL 1807",
    chineseName: "现代工业质感",
    desc: "冷峻而优雅的工业风格，展现石材最原始的张力与现代设计的碰撞。"
  },
  "2802": {
    name: "MODEL 2802",
    chineseName: "经典大理石纹理",
    desc: "传承经典的大理石纹路，细腻的触感与流动的线条，营造永恒的优雅。"
  },
  "7002": {
    name: "MODEL 7002",
    chineseName: "奢华灰调空间",
    desc: "深邃的灰调赋予空间沉稳的气质，是高端定制与艺术审美的极致体现。"
  },
  "7005": {
    name: "MODEL 7005",
    chineseName: "纯粹自然之美",
    desc: "回归自然的纯粹，捕捉石材在光影下的微妙变化，让空间充满呼吸感。"
  },
  "9042": {
    name: "MODEL 9042",
    chineseName: "未来主义构想",
    desc: "打破常规的构想，探索石材在未来空间中的无限可能，前卫且富有深度。"
  }
};

const MODEL_IDS = Object.keys(MODELS_DATA);

export default function App() {
  const [currentId, setCurrentId] = useState<string>("1800");
  const [direction, setDirection] = useState(0);

  // Initialize from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id && MODELS_DATA[id]) {
      setCurrentId(id);
    }
  }, []);

  // Update URL without refresh
  const updateUrl = useCallback((id: string) => {
    const newUrl = `${window.location.pathname}?id=${id}`;
    window.history.pushState({ id }, "", newUrl);
  }, []);

  const navigate = useCallback((newDirection: number) => {
    const currentIndex = MODEL_IDS.indexOf(currentId);
    let nextIndex = currentIndex + newDirection;
    
    if (nextIndex < 0) nextIndex = MODEL_IDS.length - 1;
    if (nextIndex >= MODEL_IDS.length) nextIndex = 0;
    
    const nextId = MODEL_IDS[nextIndex];
    setDirection(newDirection);
    setCurrentId(nextId);
    updateUrl(nextId);
  }, [currentId, updateUrl]);

  const currentModel = MODELS_DATA[currentId];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
      {/* Immersive Full-Screen Image Section */}
      <section className="relative h-[75vh] md:h-screen w-full overflow-hidden group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentId}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={`/${currentId}.png`}
              alt={currentModel.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${currentId}/1920/1080?grayscale`;
              }}
            />
            {/* Subtle Overlay for Dark Theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full transition-all duration-300 z-20 group-hover:opacity-100 opacity-40"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-white/70" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full transition-all duration-300 z-20 group-hover:opacity-100 opacity-40"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-white/70" />
        </button>

        {/* Floating Model Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {MODEL_IDS.map((id) => (
            <div
              key={id}
              className={`h-1 transition-all duration-500 ${
                id === currentId ? "w-8 bg-white" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Content Section */}
      <main className="px-6 py-16 max-w-2xl mx-auto relative z-10">
        <motion.div
          key={`content-${currentId}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extralight tracking-[0.3em] uppercase text-white/90">
              {currentModel.name}
            </h1>
            <div className="h-[1px] w-16 bg-white/40" />
            <p className="text-xl md:text-2xl font-light tracking-widest text-white/60">
              {currentModel.chineseName}
            </p>
          </div>

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-white/40 font-extralight tracking-wider">
            <p>{currentModel.desc}</p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-light">
          © 21 Construction Depot
        </p>
      </footer>

      {/* Global Styles to hide potential watermarks if they are within the iframe */}
      <style>{`
        /* Attempt to hide common watermark classes/IDs if injected inside */
        .ais-watermark, #ais-watermark, [class*="watermark"] {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
}
