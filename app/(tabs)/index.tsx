import { Text, View,StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Button } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";

const go = () => {
  router.push("/auth");
}

export default function Index() {
  const {signOut} = useAuth();
  return (
    <View style={styles.view}>
      <Text>This is home page</Text>
      <Button onPress={signOut} icon="logout">Sign Out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",  
  },
  navButton:{
    width:90,
    height:20,
    backgroundColor:'coral',
    borderRadius:8,
    textAlign:'center'
  },
})



