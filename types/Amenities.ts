export interface Amenities {
  id: string;
  name: string;
  count: number;
  isToggle: boolean;
  icon: string;
}

const PrimaryFeatures: Amenities[] = [
  {
    id: "tv_lounge",
    name: "TV Lounge",
    count: 0,
    icon: "/aminaties/rv-lounge.svg",
    isToggle: false,
  },
  {
    id: "store_room",
    name: "Store Room",
    count: 0,
    icon: "/aminaties/rv-lounge.svg",
    isToggle: false,
  },
  {
    id: "laundry_room",
    name: "Laundry Room",
    count: 0,
    icon: "/aminaties/balcony.svg",
    isToggle: false,
  },
  {
    id: "dining_room",
    name: "Dining Room",
    count: 0,
    icon: "/aminaties/laundry.svg",
    isToggle: false,
  },
  {
    id: "balcony",
    name: "Balcony",
    count: 0,
    icon: "/aminaties/dining.svg",
    isToggle: false,
  },
  {
    id: "kitchen",
    name: "Kitchen",
    count: 0,
    icon: "/aminaties/kitchen.svg",
    isToggle: false,
  },
  {
    id: "basement",
    name: "Basement",
    count: 0,
    icon: "/aminaties/basement.svg",
    isToggle: false,
  },
];
const utilities: Amenities[] = [
  {
    id: "sewerage",
    name: "Sewerage",
    count: 0,
    isToggle: true,
    icon: "/aminaties/Sewerage.png",
  },
  {
    id: "electricity",
    name: "Electricity",
    count: 0,
    isToggle: true,
    icon: "/aminaties/electricity.svg",
  },
  {
    id: "water_supply",
    name: "Water Supply",
    count: 0,
    isToggle: true,
    icon: "/aminaties/water-supply.svg",
  },
  {
    id: "gas",
    name: "Gas",
    count: 0,
    isToggle: true,
    icon: "/aminaties/gas.svg",
  },
  {
    id: "security",
    name: "Security",
    count: 0,
    isToggle: true,
    icon: "/aminaties/security.svg",
  },
];

const communications: Amenities[] = [
  {
    id: "internet_access",
    name: "Internet Access",
    count: 0,
    isToggle: true,
    icon: "/aminaties/inernet.svg",
  },
  {
    id: "satellite_or_cable_tv",
    name: "Satellite or Cable TV",
    count: 0,
    isToggle: true,
    icon: "/aminaties/satellite.svg",
  },
];

const LandmarkNearby: Amenities[] = [
  {
    id: "schools",
    name: "Schools",
    count: 0,
    isToggle: true,
    icon: "/aminaties/schools.svg",
  },
  {
    id: "hospitals",
    name: "Hospitals",
    count: 0,
    isToggle: true,
    icon: "/aminaties/c.svg",
  },
  {
    id: "shopping_malls",
    name: "Shopping Malls",
    count: 0,
    isToggle: true,
    icon: "/aminaties/shopping.svg",
  },
  {
    id: "mosques",
    name: "Mosques",
    count: 0,
    isToggle: true,
    icon: "/aminaties/mosque.svg",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    count: 0,
    isToggle: true,
    icon: "/aminaties/restaurants.svg",
  },
];

const secondaryFeatures: Amenities[] = [
  {
    id: "dirty_kitchen",
    name: "Dirty Kitchen",
    count: 0,
    isToggle: true,
    icon: "/aminaties/Dirty-Kitchen.png",
  },
  {
    id: "swimming_pool",
    name: "Swimming Pool",
    count: 0,
    isToggle: true,
    icon: "/aminaties/pool.svg",
  },
  {
    id: "lawn",
    name: "Lawn",
    count: 0,
    isToggle: true,
    icon: "/aminaties/lawn.svg",
  },
  {
    id: "elevator",
    name: "Elevator/Lift",
    count: 0,
    isToggle: true,
    icon: "/aminaties/elevator.svg",
  },

  {
    id: "home_theatre",
    name: "Home Theatre",
    count: 0,
    isToggle: true,
    icon: "/aminaties/home-reater.svg",
  },
  {
    id: "central_heating",
    name: "Central Heating",
    count: 0,
    isToggle: true,
    icon: "/aminaties/heating.svg",
  },
  {
    id: "central_cooling",
    name: "Central Cooling",
    count: 0,
    isToggle: true,
    icon: "/aminaties/colling.svg",
  },
  {
    id: "accessibility",
    name: "Accessibility",
    count: 0,
    isToggle: true,
    icon: "/aminaties/accessibility.svg",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    count: 0,
    isToggle: true,
    icon: "/aminaties/maintenance.svg",
  },
];

export {
  PrimaryFeatures,
  utilities,
  communications,
  LandmarkNearby,
  secondaryFeatures,
};
