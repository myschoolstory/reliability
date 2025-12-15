# Agrion Supply Chain Network

An interactive supply chain visualization for Agrion's biomass energy network, showcasing feedstock sources, storage facilities, and transportation routes across regions.

## Features

- **Interactive Map**: Built with Leaflet.js, displaying facilities across the United States
- **Facility Types**:
  - Feedstock Sources (green markers): Agricultural and forestry biomass collection points
  - Storage Facilities (blue markers): Regional distribution centers for biomass storage
  - Processing Plants (amber markers): Primary and secondary biomass processing facilities
- **Toggleable Layers**:
  - Transportation routes with distance and frequency information
  - Storage location visibility control
  - Seasonal availability patterns (Spring, Summer, Fall, Winter)
- **Detailed Facility Information**:
  - Capacity metrics
  - Redundancy scores
  - Seasonal availability charts
  - Feedstock types
- **Interactive Features**:
  - Click on markers to view detailed facility information
  - Hover over routes to see transportation details
  - Responsive design with side panel for detailed metrics

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Leaflet.js**: Interactive mapping library (no API key required)
- **React Leaflet**: React components for Leaflet
- **Tailwind CSS**: Utility-first styling
- **OpenStreetMap**: Free tile provider

## Project Structure

```
app/
├── components/
│   └── SupplyChainMap.tsx    # Main interactive map component
├── data/
│   └── supplyChainData.ts     # Facility and route data
├── layout.tsx                  # Root layout
├── page.tsx                    # Home page with dynamic import
└── globals.css                 # Global styles
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
