import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform,View, StyleSheet } from "react-native";
import { Button, Text,TextInput,useTheme } from "react-native-paper";
export default function AuthScreen(){
    const [isSignUp,setIsSignUp] = React.useState<boolean>(true);
    const [email,setEmail] = React.useState<string>('');
    const [password,setPassword] = React.useState<string>('');
    const [error,setError] = React.useState<string>('');
    
    const theme = useTheme();
    const router = useRouter();

    const {signIn, signUp} = useAuth();

    const handleAuth = async () => {
        // handle sign in or sign up logic here
        if (!email || !password) {
            //alert("Please enter email and password");
            setError("Please enter email and password.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        //setError('Wrong credentials. Please try again.');

        if (isSignUp) {
            const error = await signUp(email, password);
            if (error) {
                setError(error);
            }
        } else {
            const error = await signIn(email, password);
            if (error) {
                setError(error);
                //setError('Wrong credentials. Please try again.');
            }
            else{
                router.replace("/");
            }
        }
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
                  onChangeText={setEmail}
                    />
                
                <TextInput 
                  style={styles.input}
                  label="password"
                  autoCapitalize="none"
                  mode="outlined"
                  secureTextEntry
                  onChangeText={setPassword}
                />

                {error ? <Text style={{color: theme.colors.error}}>{error}</Text> : null}

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
    },
})