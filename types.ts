export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'CNG' | 'Hybrid';
export type Transmission = 'Manual' | 'Automatic' | 'AMT' | 'DCT';
export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'MUV' | 'Luxury' | 'Electric';
export type CarStatus = 'New' | 'Used';

export interface CarColor {
  name: string;
  hex: string;
}

export interface CarVariant {
  name: string;
  price: number;
  transmission: Transmission;
  fuel: FuelType;
}

export interface CarReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  emiStart: number;
  fuel: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  mileage: string;
  seating: number;
  bootSpace: string;
  engine: string;
  power: string;
  torque: string;
  safetyRating: number;
  status: CarStatus;
  featured: boolean;
  published: boolean;
  image: string;
  gallery: string[];
  colors: CarColor[];
  features: string[];
  pros: string[];
  cons: string[];
  variants: CarVariant[];
  reviews: CarReview[];
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  count: number;
}

export interface Category {
  id: string;
  name: BodyType;
  description: string;
  image: string;
  count: number;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  car: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Closed';
}

export interface TestDrive {
  id: string;
  name: string;
  phone: string;
  email: string;
  car: string;
  date: string;
  time: string;
  city: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiries: number;
  testDrives: number;
  registeredOn: string;
}

export const FUEL_TYPES: FuelType[] = ['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'];
export const TRANSMISSIONS: Transmission[] = ['Manual', 'Automatic', 'AMT', 'DCT'];
export const BODY_TYPES: BodyType[] = ['SUV', 'Sedan', 'Hatchback', 'MUV', 'Luxury', 'Electric'];
