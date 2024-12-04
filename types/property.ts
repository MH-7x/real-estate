// Property Types
export type Purpose = "for sell" | "for rent";

export type Residential =
  | "house"
  | "flat"
  | "lower portion"
  | "upper portion"
  | "room"
  | "farm house"
  | "guest house"
  | "pent house"
  | "annexe"
  | "hostel"
  | "hotel suites";

export type Plot =
  | "residential plot"
  | "commercial plot"
  | "agricultural land"
  | "plot file"
  | "industrial land"
  | "farmhouse plot";

export type Commercial =
  | "office"
  | "shop"
  | "warehouse"
  | "building"
  | "hall"
  | "plaza"
  | "gym"
  | "theatre"
  | "land"
  | "food court"
  | "factory";

export type Unit = "Marla" | "Sq. Ft" | "Sq. M" | "Sq. Yd" | "Kanal";

export type Bedrooms = "studio" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 10;

export type Condition =
  | "Brand New"
  | "Excellent"
  | "Good"
  | "Need Minor Work"
  | "Need Major Work";

// Property Interface
export const conditions: Condition[] = [
  "Brand New",
  "Excellent",
  "Good",
  "Need Minor Work",
  "Need Major Work",
];

export const popularCities = [
  { value: "karachi", label: "Karachi" },
  { value: "lahore", label: "Lahore" },
  { value: "islamabad", label: "Islamabad" },
  { value: "rawalpindi", label: "Rawalpindi" },
  { value: "peshawar", label: "Peshawar" },
  { value: "quetta", label: "Quetta" },
  { value: "multan", label: "Multan" },
  { value: "faisalabad", label: "Faisalabad" },
  { value: "gujranwala", label: "Gujranwala" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "sialkot", label: "Sialkot" },
  { value: "sukkur", label: "Sukkur" },
  { value: "bahawalpur", label: "Bahawalpur" },
  { value: "abbottabad", label: "Abbottabad" },
  { value: "mardan", label: "Mardan" },
  { value: "sargodha", label: "Sargodha" },
  { value: "sheikhupura", label: "Sheikhupura" },
  { value: "rahim yar khan", label: "Rahim Yar Khan" },
  { value: "sahiwal", label: "Sahiwal" },
  { value: "mirpur", label: "Mirpur" },
  { value: "dera ghazi khan", label: "Dera Ghazi Khan" },
  { value: "nawabshah", label: "Nawabshah" },
  { value: "gujrat", label: "Gujrat" },
  { value: "chiniot", label: "Chiniot" },
  { value: "jhang", label: "Jhang" },
  { value: "kasur", label: "Kasur" },
  { value: "larkana", label: "Larkana" },
  { value: "khuzdar", label: "Khuzdar" },
  { value: "okara", label: "Okara" },
  { value: "mansehra", label: "Mansehra" },
];
export const resident: Residential[] = [
  "house",
  "flat",
  "lower portion",
  "upper portion",
  "room",
  "farm house",
  "guest house",
  "pent house",
  "annexe",
  "hostel",
  "hotel suites",
];

export const plot: Plot[] = [
  "agricultural land",
  "commercial plot",
  "farmhouse plot",
  "industrial land",
  "plot file",
  "residential plot",
];

export const commerical: Commercial[] = [
  "office",
  "shop",
  "warehouse",
  "building",
  "hall",
  "plaza",
  "gym",
  "theatre",
  "land",
  "food court",
  "factory",
];

export const bedroomOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10+" },
];
export const bathroomsOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10+" },
];

export const cityDistrictData: Record<
  string,
  { value: string; label: string }[]
> = {
  karachi: [
    { value: "clifton", label: "Clifton" },
    { value: "defence", label: "Defence" },
    { value: "gulshan e iqbal", label: "Gulshan-e-Iqbal" },
    { value: "north nazimabad", label: "North Nazimabad" },
    { value: "korangi", label: "Korangi" },
    { value: "malir", label: "Malir" },
    { value: "saddar", label: "Saddar" },
  ],
  lahore: [
    { value: "dha-lahore", label: "DHA Lahore" },
    { value: "gulberg", label: "Gulberg" },
    { value: "model town", label: "Model Town" },
    { value: "johar town", label: "Johar Town" },
    { value: "iqbal town", label: "Allama Iqbal Town" },
    { value: "cantt", label: "Lahore Cantt" },
  ],
  islamabad: [
    { value: "f-6", label: "F-6" },
    { value: "f-7", label: "F-7" },
    { value: "g-11", label: "G-11" },
    { value: "g-13", label: "G-13" },
    { value: "dha islamabad", label: "DHA Islamabad" },
    { value: "bahria town", label: "Bahria Town" },
    { value: "park view city", label: "Park View City" },
    { value: "blue world city", label: "Blue World City" },
  ],
  rawalpindi: [
    { value: "saddar rawalpindi", label: "Saddar" },
    { value: "peshawar road", label: "Peshawar Road" },
    { value: "chandni chowk", label: "Chandni Chowk" },
    { value: "satellite town", label: "Satellite Town" },
    { value: "bahria town phase 8", label: "Bahria Town Phase 8" },
  ],
  peshawar: [
    { value: "hayatabad", label: "Hayatabad" },
    { value: "university town", label: "University Town" },
    { value: "dha peshawar", label: "DHA Peshawar" },
    { value: "sheikh yasin town", label: "Sheikh Yasin Town" },
    { value: "regi model town", label: "Regi Model Town" },
    { value: "gulbahar", label: "Gulbahar" },
    { value: "dilazak road", label: "Dilazak Road" },
  ],
  quetta: [
    { value: "satellite town quetta", label: "Satellite Town" },
    { value: "sariab road", label: "Sariab Road" },
    { value: "cantt quetta", label: "Quetta Cantt" },
    { value: "jinnah town", label: "Jinnah Town" },
  ],
  multan: [
    { value: "cantt multan", label: "Multan Cantt" },
    { value: "gulgasht colony", label: "Gulgasht Colony" },
    { value: "bahria town multan", label: "Bahria Town Multan" },
    { value: "shah rukn e alam", label: "Shah Rukn e Alam" },
  ],
  faisalabad: [
    { value: "peoples colony", label: "Peoples Colony" },
    { value: "gulfishan colony", label: "Gulfishan Colony" },
    { value: "satiana road", label: "Satiana Road" },
    { value: "d ground", label: "D Ground" },
  ],
  gujranwala: [
    { value: "satellite town gujranwala", label: "Satellite Town" },
    { value: "model town gujranwala", label: "Model Town" },
    { value: "civil lines", label: "Civil Lines" },
  ],
  hyderabad: [
    { value: "latifabad", label: "Latifabad" },
    { value: "qasimabad", label: "Qasimabad" },
    { value: "cantt hyderabad", label: "Hyderabad Cantt" },
  ],
  sialkot: [
    { value: "cantt sialkot", label: "Sialkot Cantt" },
    { value: "sambrial", label: "Sambrial" },
    { value: "defence road", label: "Defence Road" },
  ],
  sukkur: [
    { value: "military road", label: "Military Road" },
    { value: "barrage colony", label: "Barrage Colony" },
  ],
  bahawalpur: [
    { value: "model town b", label: "Model Town B" },
    { value: "mubarak pur", label: "Mubarak Pur" },
  ],
  abbottabad: [
    { value: "mandian", label: "Mandian" },
    { value: "supply", label: "Supply" },
  ],
  mardan: [
    { value: "par hotii", label: "Par Hotii" },
    { value: "cantt mardan", label: "Mardan Cantt" },
  ],
  sargodha: [
    { value: "satellite town sargodha", label: "Satellite Town" },
    { value: "university road", label: "University Road" },
  ],
  sheikhupura: [
    { value: "faisalabad road", label: "Faisalabad Road" },
    { value: "housing colony", label: "Housing Colony" },
  ],
  rahim_yar_khan: [
    { value: "model town", label: "Model Town" },
    { value: "cantt rahim yar khan", label: "Cantt" },
  ],
  sahiwal: [
    { value: "farid town", label: "Farid Town" },
    { value: "gulshan colony", label: "Gulshan Colony" },
  ],
  dera_ghazi_khan: [
    { value: "kashmir colony", label: "Kashmir Colony" },
    { value: "dgk cantt", label: "D.G.K Cantt" },
  ],
  nawabshah: [
    { value: "sakrand", label: "Sakrand" },
    { value: "college road", label: "College Road" },
  ],
  gujrat: [
    { value: "shaheen colony", label: "Shaheen Colony" },
    { value: "bhimber road", label: "Bhimber Road" },
  ],
  chiniot: [
    { value: "mohalla fateh ullah", label: "Mohalla Fateh Ullah" },
    { value: "lahore road chiniot", label: "Lahore Road" },
  ],
  jhang: [
    { value: "peoples colony jhang", label: "Peoples Colony" },
    { value: "jhang saddar", label: "Jhang Saddar" },
  ],
  kasur: [
    { value: "bhatti gate", label: "Bhatti Gate" },
    { value: "allahabad road", label: "Allahabad Road" },
  ],
  larkana: [
    { value: "residential colony", label: "Residential Colony" },
    { value: "mohalla ikhlas", label: "Mohalla Ikhlas" },
  ],
  khuzdar: [
    { value: "civil colony", label: "Civil Colony" },
    { value: "bazaar", label: "Bazaar" },
  ],
  okara: [
    { value: "depalpur road", label: "Depalpur Road" },
    { value: "model town okara", label: "Model Town" },
  ],
  mansehra: [
    { value: "karakoram highway", label: "Karakoram Highway" },
    { value: "mandi bazar", label: "Mandi Bazar" },
  ],
};

export interface ResponseProperty {
  message: string;
  success: boolean;
  properties: ResProperty[];
}

export interface ResProperty {
  address: Address;
  street: string;
  size: Size;
  _id: string;
  purpose: string;
  propertyType: string;
  bedrooms: number;
  PropertyName: string;
  condition: string;
  price: number;
  description: string;
  images: string[];
  isFeatured: boolean;
  discount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  amenities: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Address {
  city: string;
  area: string;
}

export interface Size {
  value: number;
  unit: string;
}

export interface SinResProperty {
  address: Address;
  size: Size;
  _id: string;
  purpose: string;
  propertyType: string;
  street: string;
  bedrooms: number;
  bathrooms: number;
  PropertyName: string;
  condition: string;
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  amenities: any[];
  description: string;
  images: string[];
  isFeatured: boolean;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
