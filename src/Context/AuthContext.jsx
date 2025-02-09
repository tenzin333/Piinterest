import React, { createContext, useContext, useEffect, useState } from "react";
import Services from "../Services/ServiceHandler";
import { supabase } from "../Services/ServiceHandler"; // adjust the import path as needed,
import {  useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the initial session (if it exists)
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getInitialSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
      navigate("/login"); // Redirect to login page
    } else {
      console.error("Logout Error:", error.message);
    }
  };


  // Fetch user profile after session is set
  useEffect(() => {
    if (session?.user) {
      getProfiles();
    }
  }, [session]); // Triggered when session changes

  const getProfiles = async () => {
    if(!session) return;
    try {
      const data = await Services.get("profiles", { user_id: session.user.id });
      let res = data[0];
      if(res.length>0){
        const temp = {
          bio: res.bio,
          email: res.email,
          name: res.display_name,
          avatar_url: res.avatar_url,
          avatarFile: null,
          user_id:res.user_id,
          id: res.id
        };
    
        setUserProfile(temp);
      }
    
    } catch (error) {
      console.log("data33 error", error);
    }
  };

 
  const user = session?.user || null;
  const profile = userProfile || null;


  return (
    <AuthContext.Provider value={{session,user,profile,handleLogout}}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
