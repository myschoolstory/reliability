export interface Facility {
  id: string;
  name: string;
  type: 'feedstock' | 'storage' | 'processing';
  lat: number;
  lng: number;
  capacity: number;
  capacityUnit: string;
  redundancy: number;
  seasonalAvailability: {
    spring: number;
    summer: number;
    fall: number;
    winter: number;
  };
  feedstockTypes: string[];
}

export interface TransportRoute {
  id: string;
  from: string;
  to: string;
  fromCoords: [number, number];
  toCoords: [number, number];
  distance: number;
  transportMode: string;
  frequency: string;
}

export const facilities: Facility[] = [
  {
    id: 'feed-1',
    name: 'Northern Agricultural Hub',
    type: 'feedstock',
    lat: 42.3601,
    lng: -71.0589,
    capacity: 25000,
    capacityUnit: 'tons/year',
    redundancy: 85,
    seasonalAvailability: {
      spring: 60,
      summer: 95,
      fall: 100,
      winter: 40,
    },
    feedstockTypes: ['Agricultural Residue', 'Corn Stover', 'Wheat Straw'],
  },
  {
    id: 'feed-2',
    name: 'Midwest Biomass Collective',
    type: 'feedstock',
    lat: 41.8781,
    lng: -87.6298,
    capacity: 35000,
    capacityUnit: 'tons/year',
    redundancy: 92,
    seasonalAvailability: {
      spring: 70,
      summer: 100,
      fall: 95,
      winter: 45,
    },
    feedstockTypes: ['Corn Stover', 'Switchgrass', 'Soybean Residue'],
  },
  {
    id: 'feed-3',
    name: 'Southern Forestry Cooperative',
    type: 'feedstock',
    lat: 33.7490,
    lng: -84.3880,
    capacity: 18000,
    capacityUnit: 'tons/year',
    redundancy: 78,
    seasonalAvailability: {
      spring: 80,
      summer: 85,
      fall: 90,
      winter: 75,
    },
    feedstockTypes: ['Forest Residue', 'Pine Chips', 'Hardwood Waste'],
  },
  {
    id: 'feed-4',
    name: 'Pacific Northwest Timber Operations',
    type: 'feedstock',
    lat: 47.6062,
    lng: -122.3321,
    capacity: 22000,
    capacityUnit: 'tons/year',
    redundancy: 88,
    seasonalAvailability: {
      spring: 85,
      summer: 90,
      fall: 80,
      winter: 70,
    },
    feedstockTypes: ['Forest Residue', 'Mill Waste', 'Logging Slash'],
  },
  {
    id: 'storage-1',
    name: 'Central Distribution Center',
    type: 'storage',
    lat: 39.7392,
    lng: -104.9903,
    capacity: 50000,
    capacityUnit: 'tons capacity',
    redundancy: 95,
    seasonalAvailability: {
      spring: 100,
      summer: 100,
      fall: 100,
      winter: 100,
    },
    feedstockTypes: ['All Types'],
  },
  {
    id: 'storage-2',
    name: 'Eastern Storage Facility',
    type: 'storage',
    lat: 40.7128,
    lng: -74.0060,
    capacity: 35000,
    capacityUnit: 'tons capacity',
    redundancy: 90,
    seasonalAvailability: {
      spring: 100,
      summer: 100,
      fall: 100,
      winter: 100,
    },
    feedstockTypes: ['All Types'],
  },
  {
    id: 'storage-3',
    name: 'Western Storage Depot',
    type: 'storage',
    lat: 34.0522,
    lng: -118.2437,
    capacity: 28000,
    capacityUnit: 'tons capacity',
    redundancy: 87,
    seasonalAvailability: {
      spring: 100,
      summer: 100,
      fall: 100,
      winter: 100,
    },
    feedstockTypes: ['All Types'],
  },
  {
    id: 'proc-1',
    name: 'Agrion Primary Processing Plant',
    type: 'processing',
    lat: 39.0997,
    lng: -94.5786,
    capacity: 120000,
    capacityUnit: 'tons/year',
    redundancy: 98,
    seasonalAvailability: {
      spring: 100,
      summer: 100,
      fall: 100,
      winter: 100,
    },
    feedstockTypes: ['All Types'],
  },
  {
    id: 'proc-2',
    name: 'Agrion Secondary Processing Plant',
    type: 'processing',
    lat: 35.2271,
    lng: -80.8431,
    capacity: 85000,
    capacityUnit: 'tons/year',
    redundancy: 96,
    seasonalAvailability: {
      spring: 100,
      summer: 100,
      fall: 100,
      winter: 100,
    },
    feedstockTypes: ['All Types'],
  },
];

export const transportRoutes: TransportRoute[] = [
  {
    id: 'route-1',
    from: 'feed-1',
    to: 'storage-2',
    fromCoords: [42.3601, -71.0589],
    toCoords: [40.7128, -74.0060],
    distance: 215,
    transportMode: 'Truck',
    frequency: 'Daily',
  },
  {
    id: 'route-2',
    from: 'feed-2',
    to: 'storage-1',
    fromCoords: [41.8781, -87.6298],
    toCoords: [39.7392, -104.9903],
    distance: 920,
    transportMode: 'Rail',
    frequency: 'Weekly',
  },
  {
    id: 'route-3',
    from: 'feed-2',
    to: 'proc-1',
    fromCoords: [41.8781, -87.6298],
    toCoords: [39.0997, -94.5786],
    distance: 500,
    transportMode: 'Truck',
    frequency: '3x/week',
  },
  {
    id: 'route-4',
    from: 'feed-3',
    to: 'proc-2',
    fromCoords: [33.7490, -84.3880],
    toCoords: [35.2271, -80.8431],
    distance: 245,
    transportMode: 'Truck',
    frequency: 'Daily',
  },
  {
    id: 'route-5',
    from: 'feed-4',
    to: 'storage-3',
    fromCoords: [47.6062, -122.3321],
    toCoords: [34.0522, -118.2437],
    distance: 1135,
    transportMode: 'Rail',
    frequency: 'Weekly',
  },
  {
    id: 'route-6',
    from: 'storage-1',
    to: 'proc-1',
    fromCoords: [39.7392, -104.9903],
    toCoords: [39.0997, -94.5786],
    distance: 600,
    transportMode: 'Rail',
    frequency: '2x/week',
  },
  {
    id: 'route-7',
    from: 'storage-2',
    to: 'proc-2',
    fromCoords: [40.7128, -74.0060],
    toCoords: [35.2271, -80.8431],
    distance: 640,
    transportMode: 'Rail',
    frequency: '2x/week',
  },
  {
    id: 'route-8',
    from: 'storage-3',
    to: 'proc-1',
    fromCoords: [34.0522, -118.2437],
    toCoords: [39.0997, -94.5786],
    distance: 1590,
    transportMode: 'Rail',
    frequency: 'Weekly',
  },
];

export const seasons = ['spring', 'summer', 'fall', 'winter'] as const;
export type Season = typeof seasons[number];
