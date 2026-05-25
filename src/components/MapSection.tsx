import React from 'react';
import { Empreendimento } from '../data/empreendimentos';

interface MapSectionProps {
  empreendimento: Empreendimento;
}

export function MapSection({ empreendimento }: MapSectionProps) {
  if (!empreendimento.endereco) return null;

  return (
    <div className="mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-serif text-2xl font-light text-zinc-900">Localização</h2>
      </div>
      
      {/* Mapa do Google Embed */}
      <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-zinc-200 shadow-sm relative z-0">
        <iframe 
          title={`Mapa de localização - ${empreendimento.nome}`}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          style={{ border: 0 }} 
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(empreendimento.endereco)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
          allowFullScreen>
        </iframe>
      </div>
    </div>
  );
}
