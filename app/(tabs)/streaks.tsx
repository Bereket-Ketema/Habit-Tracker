import { client, DATABASE_ID, databases, HABITSCOLLECTION_ID, HABITSCOMPLETIONS_ID, RealtimeResponse } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit, HabitCompletion } from "@/types/database.type";
import React, { useEffect } from "react";
import { View,Text } from "react-native";
import { Query } from "react-native-appwrite";

export default  function StreakScreen(){

    const [habits, setHabits] = React.useState<Habit[]>();
    const [completedHabit, setCompletedHabit] = React.useState<HabitCompletion[]>();
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            fetchHabits();
            fetchCompletions();
        }
      }, [user]);


      const fetchHabits = async () => {
          try {
            const response = await databases.listDocuments(
              DATABASE_ID,
              HABITSCOLLECTION_ID,
              [Query.equal("user_id", user?.$id ?? "")],
            );
            console.log(response.documents);
            setHabits(response.documents as unknown as Habit[]);
          } catch (error) {
            console.log(error);
          }
        };
      
        const fetchCompletions = async () => {
          try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const response = await databases.listDocuments(
              DATABASE_ID,
              HABITSCOMPLETIONS_ID,
              [
                Query.equal("user_id", user?.$id ?? ""),
              ],
            );
            const completions = response.documents as unknown as HabitCompletion[];
            setCompletedHabit(completions);
          } catch (error) {
            console.log(error);
          }
        };

        interface StreakData {
            streak: number;
            bestStreak: number;
            total: number;
        }

        const getStreakData = (habitId: string) => {
            const habitCompletions = completedHabit?.filter((c) => c.habit_id === habitId)
            .sort(
                (a, b) =>
                    new Date(b.completed_at).getTime() - 
                    new Date(a.completed_at).getTime());
            if (!habitCompletions || habitCompletions.length === 0) {
                return 0;
            }
        }


    return (
        <View>
            <Text>Habit Streaks</Text>
        </View>
     );
}