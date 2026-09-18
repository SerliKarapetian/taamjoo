// types/social.ts

export interface Comment {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    businessId: string;
    text: string;
    rating?: number; // 1-5
    createdAt: string; // ISO
    menuItemId?: string;
}

export interface Recommendation {
    id: string;
    businessId: string;
    title: string;
    description: string;
    image?: string;
    offer?: string; // e.g. "20% off"
    startsAt?: string;
    endsAt?: string;
    createdAt: string;
}

export interface Favorite {
    id: string;
    userId: string;
    businessId: string;
    menuItemId?: string;
    createdAt: string;
}

export interface MenuItem {
    id: string;
    businessId: string;
    name: string;
    description?: string;
    price?: number;
    currency?: string;
    image?: string;
    category?: string;
    isSeasonal?: boolean;
}