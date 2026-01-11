```
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../Services/ServiceHandler";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";

const Login = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { darkMode } = useTheme();

    useEffect(() => {
        if (user) navigate("/home");
    }, [user, navigate]);

    const redirectUrl = import.meta.env.MODE === "production"
        ? process.env.REACT_APP_REDIRECT_URL // 🔴 Replace with your Netlify URL
        : "/home";

    console.log("Redirecting to:", redirectUrl); // Debugging

    return (
        <div className="container-center">
            <Card className="center-card">
                <Auth 
                    supabaseClient={supabase}
                    providers={["google", "facebook"]}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: darkMode 
                                    ? { background: "#000", inputText: "#fff", inputBackground: "#222", inputBorder: "#555" }
                                    : { background: "#fff", inputText: "#000", inputBackground: "#f0f0f0", inputBorder: "#ccc" }
                            }
                        },
                        style: {
                            button: {
                                backgroundColor: darkMode ? "#d3ede2" : "#d3ede2", 
                                color: "#000",
                                border: "none",
                                borderRadius: "20px",
                                padding: "10px 15px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: "pointer"
                            },
                            button_hover: {
                                backgroundColor: darkMode ? "#c0b06b" : "#0056b3"
                            }
                        }
                    }}
                    socialLayout="vertical"
                    redirectTo={redirectUrl} // ✅ Dynamic redirect URL
                />
            </Card>
        </div>
    );
};

export default Login;
```