import React, { useState, memo, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Empreendimento } from '../data/empreendimentos';
import { HeartPulse, Coffee, ShoppingCart, Plus, GraduationCap, Building2, LucideIcon } from 'lucide-react';

function MapBounds({ localizacao, pois }: { localizacao: {lat: number, lng: number}, pois: {lat: number, lng: number}[] }) {
  const map = useMap();
  useEffect(() => {
    if (!localizacao) return;
    const bounds = L.latLngBounds([localizacao.lat, localizacao.lng], [localizacao.lat, localizacao.lng]);
    pois.forEach(poi => {
      bounds.extend([poi.lat, poi.lng]);
    });
    
    if (pois.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    } else {
      map.setView([localizacao.lat, localizacao.lng], 15);
    }
  }, [map, localizacao, pois]);
  
  return null;
}

// Fix for default Leaflet icon paths in some bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapSectionProps {
  empreendimento: Empreendimento;
}

const categoryColors: Record<string, string> = {
  'Hospital': 'bg-red-500',
  'Padaria': 'bg-amber-500',
  'Supermercado': 'bg-blue-500',
  'Farmácia': 'bg-emerald-500',
  'Escola': 'bg-indigo-500',
  'Faculdade': 'bg-violet-500',
  'Outros': 'bg-zinc-500',
};

const categoryIcons: Record<string, LucideIcon> = {
  'Hospital': HeartPulse,
  'Padaria': Coffee,
  'Supermercado': ShoppingCart,
  'Farmácia': Plus,
  'Escola': GraduationCap,
  'Faculdade': GraduationCap,
  'Outros': Building2,
};

export const MapSection = memo(function MapSection({ empreendimento }: MapSectionProps) {
  const { localizacao, pontosDeInteresse } = empreendimento;
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  if (!localizacao) return null;

  const allCategories = ['Todos', ...(pontosDeInteresse?.map(p => p.categoria) || [])];

  const filteredPOIs = pontosDeInteresse?.filter(
    (p) => activeCategory === 'Todos' || p.categoria === activeCategory
  ) || [];

  // Custom icon for the Main Property
  const mainIcon = L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="w-11 h-11 bg-[#1b4332] rounded-full flex items-center justify-center border-[3px] border-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
           </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -44],
  });

  const getPoiIcon = (category: string) => {
    const colorClass = categoryColors[category] || 'bg-zinc-500';
    const IconComponent = categoryIcons[category] || Building2;
    const iconHtml = renderToString(<IconComponent size={15} strokeWidth={2.5} />);

    return L.divIcon({
      className: 'custom-leaflet-icon',
      html: `<div class="w-8 h-8 ${colorClass} rounded-full flex items-center justify-center border-2 border-white shadow-md transition-transform hover:scale-110">
              <div class="text-white flex items-center justify-center">
                ${iconHtml}
              </div>
             </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  return (
    <div className="mt-16">
      <h2 className="font-serif text-2xl font-light text-zinc-900 mb-6">Localização e Conveniências</h2>
      
      {/* Tabs / Legendas */}
      {pontosDeInteresse && pontosDeInteresse.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allCategories.map((cat) => {
            const IconComponent = categoryIcons[cat] || Building2;
            const iconColor = categoryColors[cat]?.replace('bg-', 'text-') || 'text-zinc-500';
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium tracking-wide border transition-all duration-200 ${
                  cat === activeCategory
                    ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
                }`}
              >
                {cat !== 'Todos' && (
                  <IconComponent 
                    className={`w-4 h-4 ${cat === activeCategory ? 'text-white' : iconColor}`} 
                    strokeWidth={2.5} 
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Mapa */}
      <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-zinc-200 shadow-sm relative z-0">
        <MapContainer
          center={[localizacao.lat, localizacao.lng]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%', zIndex: 0 }}
        >
          <MapBounds 
            localizacao={localizacao} 
            pois={filteredPOIs.flatMap(c => c.locais)} 
          />
          {/* CartoDB Positron - Light Theme Map */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          {/* Main Property Marker */}
          <Marker position={[localizacao.lat, localizacao.lng]} icon={mainIcon}>
            <Popup className="custom-popup border-0 shadow-lg rounded-xl overflow-hidden">
              <div className="p-1">
                <div className="font-serif text-base font-medium text-zinc-900">{empreendimento.nome}</div>
                <div className="text-xs text-zinc-500 mt-1">{empreendimento.endereco}</div>
              </div>
            </Popup>
          </Marker>

          {/* POI Markers */}
          {filteredPOIs.map((categoriaPOI) =>
            categoriaPOI.locais.map((poi, idx) => (
              <Marker
                key={`${categoriaPOI.categoria}-${idx}`}
                position={[poi.lat, poi.lng]}
                icon={getPoiIcon(categoriaPOI.categoria)}
              >
                <Popup className="custom-popup border-0 shadow-lg rounded-xl overflow-hidden">
                  <div className="p-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                      {categoriaPOI.categoria}
                    </div>
                    <div className="text-sm font-medium text-zinc-900">{poi.nome}</div>
                  </div>
                </Popup>
              </Marker>
            ))
          )}
        </MapContainer>
      </div>

      <style>{`
        /* Sobrescrevendo estilos do popup do leaflet para combinar com o design Off-White */
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          padding: 4px;
        }
        .leaflet-popup-tip {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .leaflet-container a.leaflet-popup-close-button {
          padding: 8px 8px 0 0;
          color: #71717a;
        }
        .leaflet-container a.leaflet-popup-close-button:hover {
          color: #18181b;
        }
      `}</style>
    </div>
  );
});
