// types/location.ts

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Address {
    street: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
    details?: string;
    coordinates: Coordinates;
}

export type BusinessCategory =
    | "restaurant"
    | "cafe"
    | "bakery"
    | "fast_food"
    | "bar"
    | "dessert"
    | "other";

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
    "restaurant",
    "cafe",
    "bakery",
    "fast_food",
    "bar",
    "dessert",
    "other",
];