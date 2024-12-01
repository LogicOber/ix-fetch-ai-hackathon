import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { VaccinationData, Region, VaccineType, HesitancyLevel } from '@/types/health';
import { Card } from '@/components/ui/card';
import { HESITANCY_COLORS } from '@/lib/constants';

interface MapControllerProps {
  selectedRegion: Region | null;
  data: VaccinationData[];
}

function MapController({ selectedRegion, data }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (selectedRegion) {
      const region = data.find((r) => r.region === selectedRegion);
      if (region) {
        map.setView(region.coordinates, 8);
      }
    } else {
      map.setView([52.8566, -1.3522], 6);
    }
  }, [map, selectedRegion, data]);

  return null;
}

interface VaccinationMapProps {
  data: VaccinationData[];
  selectedVaccines: VaccineType[];
  selectedRegion: Region | null;
  selectedHesitancy: HesitancyLevel[];
  onRegionSelect: (region: Region) => void;
}

export function VaccinationMap({ 
  data, 
  selectedVaccines, 
  selectedRegion,
  selectedHesitancy,
  onRegionSelect
}: VaccinationMapProps) {
  const [showLabels, setShowLabels] = useState(false);
  
  // 当选择特定区域时，自动显示标签
  useEffect(() => {
    if (selectedRegion) {
      setShowLabels(true);
    }
  }, [selectedRegion]);
  
  const getCircleColor = (willingness: number) => {
    if (willingness >= 75) return '#2563eb';
    if (willingness >= 50) return '#60a5fa';
    return '#93c5fd';
  };

  return (
    <Card className="w-full h-[600px] overflow-hidden relative">
      <div className="absolute top-2 right-2 z-[1000] bg-white rounded-md shadow-lg">
        <button
          onClick={() => setShowLabels(!showLabels)}
          className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-md"
        >
          {showLabels ? 'Hide Data' : 'Show Data'}
        </button>
      </div>
      <MapContainer
        center={[52.8566, -1.3522]}
        zoom={6}
        className="w-full h-full [&_.leaflet-pane]:!z-[1] [&_.leaflet-top]:!z-[2] [&_.leaflet-bottom]:!z-[2]"
        minZoom={5}
        maxZoom={12}
        maxBounds={[[49.8, -6.3], [55.8, 1.8]]}
      >
        <MapController selectedRegion={selectedRegion} data={data} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showLabels && data.map((location) => (
          <Circle
            key={location.region}
            center={location.coordinates}
            radius={30000}
            pathOptions={{
              color: getCircleColor(location.willingness),
              fillColor: getCircleColor(location.willingness),
              fillOpacity: 0.6,
              weight: 1.5,
            }}
            eventHandlers={{
              click: () => onRegionSelect(location.region)
            }}
          >
            <Tooltip permanent>
              <div className="p-2 font-medium bg-white shadow-lg rounded-md">
                <h3 className="text-sm font-semibold mb-1 text-primary">{location.region}</h3>
                <p className="text-xs text-muted-foreground">
                  Willingness: {location.willingness}%
                </p>
                {selectedVaccines.map((vaccine) => (
                  <p key={vaccine} className="text-xs">
                    {vaccine}: {location.vaccineTypes[vaccine]}%
                  </p>
                ))}
                {selectedHesitancy.length > 0 && (
                  <div className="mt-1 pt-1 border-t">
                    <p className="text-xs font-semibold">Hesitancy Levels:</p>
                    {selectedHesitancy.map((level) => (
                      <div key={level} className="flex items-center gap-1 text-xs">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: HESITANCY_COLORS[level] }}
                        />
                        <span>{level}: {location.hesitancy[level]}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Tooltip>
          </Circle>
        ))}
      </MapContainer>
    </Card>
  );
}