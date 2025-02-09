import React from "react";
import ImageComponent from "./ImageComponent";

const PublicResults = ({ publicImages, isFetchingPublic }) => {
    if (isFetchingPublic) {
        return (
            <div className="spinner-square">
                <div className="square-1 square"></div>
                <div className="square-2 square"></div>
                <div className="square-3 square"></div>
            </div>
        );
    }

    return (
        <div className="masonry">
            {publicImages.map((image, index) => (
                <ImageComponent key={image.id || index} image={image} />
            ))}
        </div>
    );
};

export default PublicResults;
