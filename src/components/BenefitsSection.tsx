import React from 'react';
import { Truck, UserCheck, CheckCircle, MessageSquare } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Truck className="w-5 h-5 text-gold-500 stroke-[1.5]" />,
      title: 'ENVÍOS NACIONALES',
      description: 'Cobertura a todo el territorio nacional con transportadoras de alta seguridad y rastreo directo.',
    },
    {
      icon: <UserCheck className="w-5 h-5 text-gold-500 stroke-[1.5]" />,
      title: 'ATENCIÓN PERSONALIZADA',
      description: 'Asesoría individual con expertos en joyería para ayudarte a elegir la pieza o talla ideal.',
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-gold-500 stroke-[1.5]" />,
      title: 'COMPRA FÁCIL',
      description: 'Proceso ágil, transparente y seguro sin registros tediosos ni complicaciones.',
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-gold-500 stroke-[1.5]" />,
      title: 'PEDIDOS POR WHATSAPP',
      description: 'Finalización directa y humana a través de nuestra línea oficial con respuesta ágil.',
    },
  ];

  return (
    <section className="py-20 bg-luxury-900/30 border-b border-luxury-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-6 bg-luxury-950/80 border border-luxury-800/80 hover:border-gold-500/40 transition-colors flex flex-col justify-between"
            >
              <div className="w-12 h-12 bg-luxury-900 border border-luxury-800 rounded-none flex items-center justify-center mb-5">
                {b.icon}
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg text-ivory-50 tracking-wider uppercase mb-2">
                  {b.title}
                </h4>
                <p className="text-luxury-400 text-xs font-light leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
