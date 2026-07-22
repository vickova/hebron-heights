// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
//   ReactNode,
// } from "react";

// const USER_KEY = "hhg_user";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   [key: string]: unknown;
// }

// interface AuthResponse {
//   ok: boolean;
//   data?: any;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<AuthResponse>;
//   signUp: (
//     name: string,
//     email: string,
//     password: string
//   ) => Promise<AuthResponse>;
//   signOut: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// function extractToken(data: any) {
//   return data?.token ?? null;
// }

// function extractUser(data: any): User | null {
//   return data?.user ?? null;
// }

// function persistUser(user: User | null) {
//   if (typeof window === "undefined") return;

//   if (user) {
//     localStorage.setItem(USER_KEY, JSON.stringify(user));
//   } else {
//     localStorage.removeItem(USER_KEY);
//   }
// }

// interface ProviderProps {
//   children: ReactNode;
// }

// export function HHGAuthProvider({ children }: ProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   /**
//    * Load persisted user after hydration
//    */
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem(USER_KEY);

//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const applyAuth = (token: string | null, userData: User | null) => {
//     setToken(token);
//     setUser(userData);
//     persistUser(userData);
//   };

//   const signIn = async (email: string, password: string) => {
//     const res = await hhgApi.signIn(email, password);

//     if (res.ok) {
//       applyAuth(
//         extractToken(res.data),
//         extractUser(res.data)
//       );
//     }

//     return res;
//   };

//   const signUp = async (
//     name: string,
//     email: string,
//     password: string
//   ) => {
//     const res = await hhgApi.signUp(name, email, password);

//     if (res.ok) {
//       applyAuth(
//         extractToken(res.data),
//         extractUser(res.data)
//       );
//     }

//     return res;
//   };

//   const signOut = () => {
//     applyAuth(null, null);
//   };

//   const value = useMemo(
//     () => ({
//       user,
//       loading,
//       signIn,
//       signUp,
//       signOut,
//     }),
//     [user, loading]
//   );

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useHHGAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error(
//       "useHHGAuth must be used within HHGAuthProvider"
//     );
//   }

//   return context;
// }