import { Models } from "react-native-appwrite";

export interface Habit extends Models.Document {
    title: string;
    description?: string;
    streakCount: number;
    user_id: string;
    frequency: string;
    last_completed?: string;
    created_at: string;
}