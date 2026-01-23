import React from "react";
import { KeyboardAvoidingView, Platform,View, StyleSheet } from "react-native";
import { Button, Text,TextInput } from "react-native-paper";
export default function AuthScreen(){
    const [isSignUp,setIsSignUp] = React.useState<boolean>(true);

    const handleAuth = async () => {
        // handle sign in or sign up logic here
    };

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev);
    };
    
    return( <KeyboardAvoidingView 
              behavior={Platform.OS ==='android' ? 'padding': 'height'}
              style={styles.container}>
              <View style={styles.content}>
                <Text style={styles.title} variant="headlineMedium"> 
                    {isSignUp ? "Create Account":"Welcome back"}</Text> 
                <TextInput 
                  style={styles.input}
                  label="Email"
                  autoCapitalize="none"
                  placeholder="bekishet@gmail.com"
                  keyboardType="email-address"
                  mode="outlined"
                    />
                
                <TextInput 
                  style={styles.input}
                  label="password"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  mode="outlined"
                />

                <Button mode="contained" style={styles.button} onPress={handleAuth}>
                    {isSignUp ? "Sign Up":"Sign In"}</Button>

                <Button mode="text" onPress={handleSwitchMode} style={styles.switchModeText}>
                    {isSignUp ? "Already have an account? Sign In":"Don't have an account? Sign Up"}</Button>
                
              </View>
            </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    content:{
        flex:1,
        padding:16,
        justifyContent:'center',

    },
    title:{
        textAlign:'center',
        marginBottom:24,
    },
    input:{
        marginBottom:16,
    },
    button:{
        marginTop:8,
    },
    switchModeText:{
        marginTop:15,
    }
})