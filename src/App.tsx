/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans overflow-x-hidden">
      {/* Top Full-Screen Image Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/1800.png"
          alt="MODEL 1800"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to a high-quality placeholder if 1800.jpg is not found
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </section>

      {/* Content Section */}
      <main className="px-6 py-20 max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">
              MODEL 1800
            </h1>
            <div className="h-[1px] w-12 bg-[#333333] opacity-30" />
            <p className="text-lg md:text-xl font-medium tracking-widest text-gray-600">
              极简主义石材美学
            </p>
          </div>

          <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-500 font-light tracking-wide">
            <p>
              以极简主义为核心，赋予石材全新的生命力。MODEL 1800 完美融合了天然纹理与现代工艺，
              为您的居家空间带来无与伦比的质感与宁静。
            </p>
            <p>
              每一寸细节都经过精心打磨，旨在呈现最纯粹的美学体验。
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100 text-center">
        <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
          © 21 Construction Depot
        </p>
      </footer>
    </div>
  );
}
