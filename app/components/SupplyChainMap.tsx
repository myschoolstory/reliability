'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { facilities, transportRoutes, Season, Facility } from '../data/supplyChainData';

const facilityIcons = {
  feedstock: L.divIcon({
    className: 'custom-marker',
    html: '<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  }),
  storage: L.divIcon({
    className: 'custom-marker',
    html: '<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  }),
  processing: L.divIcon({
    className: 'custom-marker',
    html: '<div style="background-color: #f59e0b; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
};

export default function SupplyChainMap() {
  const [showRoutes, setShowRoutes] = useState(true);
  const [showStorage, setShowStorage] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<Season>('summer');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const filteredFacilities = facilities.filter((facility) => {
    if (!showStorage && facility.type === 'storage') return false;
    return true;
  });

  const getSeasonalColor = (availability: number) => {
    if (availability >= 80) return '#10b981';
    if (availability >= 60) return '#fbbf24';
    return '#ef4444';
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Agrion Supply Chain Network
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive map showing feedstock sources, storage facilities, and transportation routes
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showRoutes}
                onChange={(e) => setShowRoutes(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Transportation Routes
              </span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showStorage}
                onChange={(e) => setShowStorage(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Storage Locations
              </span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
              Season:
            </label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value as Season)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
            <span className="text-gray-700 dark:text-gray-300">Feedstock Source</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
            <span className="text-gray-700 dark:text-gray-300">Storage Facility</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-white"></div>
            <span className="text-gray-700 dark:text-gray-300">Processing Plant</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={5}
            style={{ height: '600px', width: '100%' }}
            className="rounded-lg shadow-lg z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {showRoutes &&
              transportRoutes.map((route) => {
                const fromFacility = facilities.find((f) => f.id === route.from);
                const toFacility = facilities.find((f) => f.id === route.to);
                
                if (!fromFacility || !toFacility) return null;
                if (!showStorage && (fromFacility.type === 'storage' || toFacility.type === 'storage')) {
                  return null;
                }

                return (
                  <Polyline
                    key={route.id}
                    positions={[route.fromCoords, route.toCoords]}
                    color="#6366f1"
                    weight={2}
                    opacity={0.6}
                    dashArray="5, 10"
                  >
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">{fromFacility.name} → {toFacility.name}</p>
                        <p className="text-gray-600">Distance: {route.distance} miles</p>
                        <p className="text-gray-600">Mode: {route.transportMode}</p>
                        <p className="text-gray-600">Frequency: {route.frequency}</p>
                      </div>
                    </Popup>
                  </Polyline>
                );
              })}

            {filteredFacilities.map((facility) => {
              const availability = facility.seasonalAvailability[selectedSeason];
              return (
                <Marker
                  key={facility.id}
                  position={[facility.lat, facility.lng]}
                  icon={facilityIcons[facility.type]}
                  eventHandlers={{
                    click: () => setSelectedFacility(facility),
                  }}
                >
                  <Popup>
                    <div className="text-sm max-w-xs">
                      <h3 className="font-bold text-base mb-1">{facility.name}</h3>
                      <p className="text-gray-600 capitalize mb-2">{facility.type}</p>
                      <div className="space-y-1">
                        <p>
                          <span className="font-semibold">Capacity:</span> {facility.capacity.toLocaleString()}{' '}
                          {facility.capacityUnit}
                        </p>
                        <p>
                          <span className="font-semibold">Redundancy:</span> {facility.redundancy}%
                        </p>
                        <p>
                          <span className="font-semibold">{selectedSeason} Availability:</span>{' '}
                          <span style={{ color: getSeasonalColor(availability) }}>
                            {availability}%
                          </span>
                        </p>
                        {facility.feedstockTypes.length > 0 && (
                          <div>
                            <p className="font-semibold">Feedstock Types:</p>
                            <p className="text-gray-600 text-xs">
                              {facility.feedstockTypes.join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 h-[600px] overflow-y-auto">
          {selectedFacility ? (
            <div>
              <button
                onClick={() => setSelectedFacility(null)}
                className="text-sm text-blue-600 dark:text-blue-400 mb-4 hover:underline"
              >
                ← Back to list
              </button>
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {selectedFacility.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-4">
                {selectedFacility.type}
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Capacity & Redundancy
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <p className="text-sm mb-1">
                      <span className="font-medium">Capacity:</span>{' '}
                      {selectedFacility.capacity.toLocaleString()} {selectedFacility.capacityUnit}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Redundancy:</span> {selectedFacility.redundancy}%
                    </p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${selectedFacility.redundancy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Seasonal Availability
                  </h3>
                  <div className="space-y-2">
                    {(['spring', 'summer', 'fall', 'winter'] as Season[]).map((season) => {
                      const availability = selectedFacility.seasonalAvailability[season];
                      return (
                        <div key={season}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize text-gray-700 dark:text-gray-300">
                              {season}
                            </span>
                            <span
                              className="font-medium"
                              style={{ color: getSeasonalColor(availability) }}
                            >
                              {availability}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${availability}%`,
                                backgroundColor: getSeasonalColor(availability),
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedFacility.feedstockTypes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Feedstock Types
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFacility.feedstockTypes.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Network Facilities
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Click on a facility to view detailed metrics, or select from the list below.
              </p>
              <div className="space-y-2">
                {filteredFacilities.map((facility) => {
                  const availability = facility.seasonalAvailability[selectedSeason];
                  return (
                    <button
                      key={facility.id}
                      onClick={() => setSelectedFacility(facility)}
                      className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                            facility.type === 'feedstock'
                              ? 'bg-green-500'
                              : facility.type === 'storage'
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 dark:text-white">
                            {facility.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {facility.type} • {availability}% availability
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
