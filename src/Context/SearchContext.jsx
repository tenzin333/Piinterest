import React, { createContext, useContext, useEffect, useState } from "react";
import Services from "../Services/ServiceHandler";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
    const [searchedData, setSearchedData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasNoResults, setHasNoResults] = useState(false);
    const [publicImages, setPublicImages] = useState([]);
    const [isFetchingPublic, setIsFetchingPublic] = useState(false);
    const {user}  = useAuth();
    const navigate = useNavigate();

    // Fetch Public Images (Only Once)
    useEffect(() => {
        getPublicImages();
    }, []);

    const getPublicImages = async () => {
        setIsFetchingPublic(true);
        try {
            const data = await Services.get("images",{visibility:"public"});
            let temp = data.slice(1);
            setPublicImages(temp);  
        } catch (error) {
            console.log(error);
        }
        setIsFetchingPublic(false);
    };

    const handleSearch = async (searchedText) => {
        try {
            const trimmedText = searchedText.trim();
            if (!trimmedText) {
                navigate("/")
                setSearchedData([]);
                setHasNoResults(false);
                return;
            }
            navigate(`/search?q=${trimmedText}`); 
            setIsSearching(true);
         
            const data = await Services.getWithFilterOnArray(
                trimmedText,
                user ? "private" : "public",
                user ? user.id : null  // Pass `null` if no user
            );
            
            setSearchedData(data);
            setHasNoResults(data.length == 0);
        } catch (error) {
            console.log(error);
        }
        setIsSearching(false);
    };

    return (
        <SearchContext.Provider value={{ handleSearch, searchedData, isSearching, hasNoResults, publicImages, isFetchingPublic }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
