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
    chineseName: "溯源 · Origin",
    desc: "剥离繁冗，回归石材最原始的纯粹。以极简线条勾勒空间骨架，让静谧在留白中流淌。"
  },
  "1807": {
    name: "MODEL 1807",
    chineseName: "铸迹 · Trace",
    desc: "工业文明与自然造物的交响。粗犷的质感中蕴含着细腻的逻辑，展现力量与美感的平衡。"
  },
  "2802": {
    name: "MODEL 2802",
    chineseName: "脉动 · Pulse",
    desc: "捕捉亿万年地壳运动留下的韵律。流动的纹理如江河入海，赋予冰冷石材温润的生命感。"
  },
  "7002": {
    name: "MODEL 7002",
    chineseName: "沉境 · Submersion",
    desc: "深邃的灰调如同破晓前的海面。在克制的色彩中探索空间的深度，营造极致的沉浸式美学。"
  },
  "7005": {
    name: "MODEL 7005",
    chineseName: "息壤 · Breath",
    desc: "捕捉自然界最轻盈的呼吸。石材不再是沉重的存在，而是光影交织下的灵动注脚。"
  },
  "9042": {
    name: "MODEL 9042",
    chineseName: "锋芒 · Edge",
    desc: "打破常规的几何构想，探索石材在未来维度中的表达。前卫、锐利，且富有哲思。"
  },
  "9088": {
    name: "MODEL 9088",
    chineseName: "岚影 · Mist",
    desc: "细腻的灰阶过渡，宛如远山在晨雾中若隐若现。为空间注入一份朦胧而高级的艺术诗意。"
  },
  "9094": {
    name: "MODEL 9094",
    chineseName: "映辉 · Radiance",
    desc: "独特的矿物结晶捕捉每一缕微光。在不同角度的审视下，展现石材多维度的流光魅力。"
  },
  "9103": {
    name: "MODEL 9103",
    chineseName: "极夜 · Absolute Night",
    desc: "极致的黑，是所有色彩的终点，也是想象力的起点。在无声的深邃中，定义空间的绝对权威。"
  },
  "9139": {
    name: "MODEL 9139",
    chineseName: "暖阳 · Amber",
    desc: "柔和的色泽中蕴含着大地的温度。如冬日暖阳洒在石阶上，为居家空间带来一份治愈的温馨。"
  },
  "9154": {
    name: "MODEL 9154",
    chineseName: "磐石 · Monolith",
    desc: "厚重的大地色系，承载着岁月的稳重。以磐石之姿，为现代建筑奠定坚实的审美基石。"
  },
  "9181": {
    name: "MODEL 9181",
    chineseName: "凝霜 · Frost",
    desc: "剔透的质感仿佛万年不化的冰川。冷冽而高洁，在纯净的视觉体验中洗涤心灵的浮躁。"
  },
  "9186": {
    name: "MODEL 9186",
    chineseName: "典藏 · Heritage",
    desc: "融合古典艺术的厚重与现代设计的灵动。每一道纹路都是时间的刻痕，讲述着跨越时空的审美故事。"
  },
  "9237": {
    name: "MODEL 9237",
    chineseName: "幻沙 · Phantom Sand",
    desc: "灵动的纹路如风吹过沙漠留下的印记。在静止的石材中展现动态的幻影，充满自然的律动。"
  },
  "9243": {
    name: "MODEL 9243",
    chineseName: "盈白 · Pristine White",
    desc: "极致的白，不染尘埃。如初雪覆盖大地，在无限的纯净中，拓宽空间的视觉边界。"
  },
  "9257": {
    name: "MODEL 9257",
    chineseName: "繁星 · Starry Sky",
    desc: "璀璨的矿物颗粒如星辰散落。在深邃的基底上，勾勒出一幅永恒的宇宙画卷，浪漫且神秘。"
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
      <section className="relative h-[65vh] md:h-screen w-full overflow-hidden group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentId}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? "100%" : "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? "-100%" : "100%" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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

        {/* Navigation Arrows - Optimized for Mobile Touch */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center bg-transparent z-20 active:bg-white/5 transition-colors"
          aria-label="Previous"
        >
          <div className="p-2 bg-black/20 backdrop-blur-sm rounded-full">
            <ChevronLeft className="w-6 h-6 text-white/50" />
          </div>
        </button>
        <button
          onClick={() => navigate(1)}
          className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center bg-transparent z-20 active:bg-white/5 transition-colors"
          aria-label="Next"
        >
          <div className="p-2 bg-black/20 backdrop-blur-sm rounded-full">
            <ChevronRight className="w-6 h-6 text-white/50" />
          </div>
        </button>

        {/* Floating Model Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 max-w-[80vw] overflow-x-auto no-scrollbar px-4">
          {MODEL_IDS.map((id) => (
            <div
              key={id}
              className={`h-1 transition-all duration-300 flex-shrink-0 ${
                id === currentId ? "w-6 bg-white" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Content Section - Optimized for Mobile Reading */}
      <main className="px-6 py-12 max-w-2xl mx-auto relative z-10">
        <motion.div
          key={`content-${currentId}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-extralight tracking-[0.2em] uppercase text-white/90">
              {currentModel.name}
            </h1>
            <div className="h-[1px] w-12 bg-white/30" />
            <p className="text-lg md:text-2xl font-light tracking-widest text-white/60">
              {currentModel.chineseName}
            </p>
          </div>

          <div className="space-y-4 text-sm md:text-lg leading-relaxed text-white/40 font-extralight tracking-wider">
            <p>{currentModel.desc}</p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] tracking-[0.2em] text-white/20 uppercase font-light">
          © 21 Construction Depot
        </p>
      </footer>

      {/* Global Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Hide watermarks */
        .ais-watermark, #ais-watermark, [class*="watermark"] {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
}
