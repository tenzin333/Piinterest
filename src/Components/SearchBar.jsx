import React, { useState } from "react";
import CancelIcon from "../assets/Icons/cancel.svg"; // Ensure this path is correct

const SearchBar = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleClear = () => {
        setSearchText("");
        handleSearch(""); // Also clear search in the parent component
    };

    return (
        <div className="search-bar-container">
            <input 
                id="search"
                type="text" 
                placeholder="Search..." 
                className="form-control"  
                value={searchText} 
                onChange={(e) => {
                    const newSearchText = e.target.value; // Get the new value
                    setSearchText(newSearchText);  // Update the local state
                    handleSearch(newSearchText);  // Pass the updated value to the parent
                }}
            />
            {searchText && (  // Show clear icon only when there's text
                <img 
                    src={CancelIcon} 
                    alt="clear" 
                    className="clear-icon"  
                    onClick={handleClear} 
                />
            )}
        </div>
    );
};

export default SearchBar;
