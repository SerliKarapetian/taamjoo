// types/profile.ts

import type { Address, BusinessCategory } from "./location";
import type { Comment, Recommendation, Favorite, MenuItem } from "./social";

export type ProfileType = "business" | "user";

interface BaseProfile {
    id: string;
    type: ProfileType;
    displayName: string;
    avatar?: string;
    bio?: string;
    createdAt: string;
    updatedAt: string;
    isVerified?: boolean;
}

export interface BusinessProfile extends BaseProfile {
    type: "business";
    category: BusinessCategory;
    address: Address;
    phone?: string;
    website?: string;
    gallery?: string[];
    menuItems: MenuItem[];
    recommendations: Recommendation[];
    comments: Comment[];
    rating?: number;
    ratingCount?: number;
}

export interface UserProfile extends BaseProfile {
    type: "user";
    savedBusinessIds: string[];
    favorites: Favorite[];
    recommendations: Recommendation[];
    comments: Comment[];
    city?: string;
}

export type Profile = BusinessProfile | UserProfile;

/** Type guards */
export const isBusinessProfile = (
    profile: Profile
): profile is BusinessProfile => profile.type === "business";

export const isUserProfile = (profile: Profile): profile is UserProfile =>
    profile.type === "user";