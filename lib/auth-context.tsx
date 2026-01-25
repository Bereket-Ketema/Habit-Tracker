import React from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
    // define auth context properties here
    user: Models.User<Models.Preferences> | null;
    isLoadingUser: boolean;
    signIn: (email: string, password: string) => Promise<string | null>;
    signUp: (email: string, password: string) => Promise<string | null>;
    signOut?: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
export default function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = React.useState<Models.User<Models.Preferences> | null>(null);

    const [isLoadingUser, setIsLoadingUser] = React.useState<boolean>(true);

    React.useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        try {
            const session = await account.get();
            setUser(session); 
        } catch (error) {
            setUser(null);
        } finally{
            setIsLoadingUser(false);
        }
    };


    const signUp = async (email: string, password: string) => {
        // implement sign up logic
        try{
            await account.create(ID.unique(), email, password);
            await signIn(email, password);
            return null;// no error if we return null
        }
        catch (error) {
            if (error instanceof Error) {
                return error.message;
            }

            return "An unknown error occurred during sign Up.";
        }
    };

    const signIn = async (email: string, password: string) => {
    try {
        // 👇 kill any existing session first
        try {
            await account.deleteSession("current");
        } catch (e) {
            // ignore if no session exists
        }

        // 👇 now create new session
        await account.createEmailPasswordSession(email, password);
        const session = await account.get();
        setUser(session);

        return null;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
        return "An unknown error occurred during sign in.";
    }
};


    const signOut = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        }
        catch (error) {
            console.log("Error signing out:", error);
        }
    };

    return <AuthContext.Provider value={{ user,isLoadingUser, signUp, signIn,signOut}}>
                {children}
            </AuthContext.Provider>;
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}