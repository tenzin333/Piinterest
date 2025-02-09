
import React from "react";
import ImageComponent from "./ImageComponent";
import "../Styles/spinnerStyles.css";

const SearchComponent = ({ searchedData, isSearching, hasNoResults }) => {
    if (isSearching) {
        return (
            <div className="spinner-square">
                <div className="square-1 square"></div>
                <div className="square-2 square"></div>
                <div className="square-3 square"></div>
            </div>
        );
    }

    if (hasNoResults) {
        return (
            <div className="large-center-text">
                <p>No results found !</p>
            </div>
        );
    }

    return (
        <div className="masonry">
            {searchedData.map((image, index) => (
                <ImageComponent key={image.id || index} image={image} />
            ))}
        </div>
    );
};

export default SearchComponent;
