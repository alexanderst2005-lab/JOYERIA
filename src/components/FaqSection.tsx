import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/initialData';
import { useStore } from '../context/StoreContext';

export const FaqSection: React.FC = () => {
  const { config } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 bg-luxury-950 border-b border-luxury-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-gold-400 text-xs tracking-luxury uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold-500" />
            <span>Resolución de Inquietudes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory-50 tracking-wide uppercase font-light">
            PREGUNTAS FRECUENTES
          </h2>
          <p className="text-luxury-400 text-xs sm:text-sm font-light mt-3">
            Todo lo que necesitas conocer sobre nuestros procesos de compra, envíos y garantías.
          </p>
        </div>

        {/* Accordions */}
        <div className="divide-y divide-luxury-800 border-y border-luxury-800">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className="font-serif text-base sm:text-lg text-ivory-50 group-hover:text-gold-300 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-luxury-800 group-hover:border-gold-500 flex items-center justify-center flex-shrink-0 transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 text-luxury-400 group-hover:text-gold-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-gold-400' : ''
                      }`}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="pb-6 text-xs sm:text-sm text-luxury-400 font-light leading-relaxed animate-fade-in pr-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Bar */}
        <div className="mt-12 p-6 bg-luxury-900/50 border border-luxury-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-ivory-50 font-serif text-base uppercase">¿Tienes otra consulta en mente?</div>
            <div className="text-luxury-400 text-xs font-light">
              Nuestro equipo de asesoría atiende en tiempo real vía WhatsApp.
            </div>
          </div>
          <a
            href={`https://wa.me/${config.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-luxury-950 border border-gold-500/60 hover:bg-gold-500 hover:text-luxury-950 text-gold-400 text-xs uppercase tracking-luxury transition-all flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hablar con un Asesor</span>
          </a>
        </div>
      </div>
    </section>
  );
};
