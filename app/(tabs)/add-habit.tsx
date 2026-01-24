
import React from "react";
import { View,StyleSheet } from "react-native";
import { SegmentedButtons, TextInput,Button } from "react-native-paper";

const frequencyOptions = ["daily", "weekly","monthly"];
type Frequency = (typeof frequencyOptions)[number];

export default  function AddHabitScreen(){  
    const [title,setTitle] = React.useState<string>('');
    const [description,setDescription] = React.useState<string>('');
    const [frequency,setFrequency] = React.useState<Frequency>('daily');
    return (
        <View style = {styles.container}>
            <TextInput label="Title" mode="outlined" onChangeText={setTitle} style = {styles.input}  />
            <TextInput label="Description" mode="outlined" onChangeText={setDescription} style = {styles.input}  />
            <View style = {styles.frequencyContainer}>
            <SegmentedButtons
                value={frequency} 
                onValueChange={(value)=> setFrequency(value as Frequency)}
                buttons={frequencyOptions.map((freq)=>({
                    value: freq, label: freq.charAt(0).toUpperCase() + freq.slice(1),
                }))}
                />
            </View>
            <Button mode="contained" >Add Habit</Button>
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

})