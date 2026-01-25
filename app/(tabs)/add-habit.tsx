
import { useAuth } from "@/lib/auth-context";
import { DATABASE_ID, databases, HABITSCOLLECTION_ID } from "@/lib/appwrite";
import React from "react";
import { useRouter } from "expo-router";
import { View,StyleSheet } from "react-native";
import { SegmentedButtons, TextInput,Button, useTheme,Text } from "react-native-paper";
import { ID } from "react-native-appwrite";

const frequencyOptions = ["daily", "weekly","monthly"];
type frequency = (typeof frequencyOptions)[number];

export default  function AddHabitScreen(){  
    const [title,setTitle] = React.useState<string>('');
    const [description,setDescription] = React.useState<string>('');
    const [frequency,setFrequency] = React.useState<frequency>('daily');
    const [error,setError] = React.useState<string>('');
    const [displaySuccessMessage,setDisplaySuccessMessage] = React.useState<boolean>(false);
    const {user} = useAuth();
    const theme = useTheme();
    const router = useRouter();
    const handleSubmit = async ()=>{
        if (!user) return;
        try{
        await databases.createDocument(
            DATABASE_ID!,
            HABITSCOLLECTION_ID!,
            ID.unique(),
            { 
                user_id: user.$id,
                title,
                description,
                streak_count:0,
                last_completed: new Date().toISOString(),
                frequency,
                created_at: new Date().toISOString(),
            }
        );
        setDisplaySuccessMessage(true);
        setTitle('');
        setDescription('');

        setTimeout(() => {
        setDisplaySuccessMessage(false);
        router.back();   // move AFTER the delay
        }, 2000);

    }catch(error){
        if (error instanceof Error){
            setError(error.message);
            return;
        }
        setError("There is an error on creating the habit")
    }

    }
    return (
        <View style = {styles.container}>
            <TextInput label="Title" mode="outlined" onChangeText={setTitle} style = {styles.input}  />
            <TextInput label="Description" mode="outlined" onChangeText={setDescription} style = {styles.input}  />
            <View style = {styles.frequencyContainer}>
            <SegmentedButtons
                value={frequency} 
                onValueChange={(value)=> setFrequency(value as frequency)}
                buttons={frequencyOptions.map((freq)=>({
                    value: freq, label: freq.charAt(0).toUpperCase() + freq.slice(1),
                }))}
                />
            </View>
            <Button mode="contained" onPress={handleSubmit} disabled={!title || !description}>Add Habit</Button>
            {error ? <Text style={{color: theme.colors.error}}>{error}</Text> : null}
            {displaySuccessMessage ? <Text style = {styles.mess}>Habit added successfully!</Text> : null}

        </View>
     );
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        padding:16,
        backgroundColor:'#f5f5f5',
        justifyContent:"center"
    },
    input :{   
        marginBottom:16,
    },
    frequencyContainer :{
        marginBottom:24,
    },
    mess:{
        marginTop:16,
        textAlign:'center',
        fontSize:16,
        color: 'green',
    }

})