import React from "react";
import { Container } from "react-bootstrap";
import { useSearch } from "../Context/SearchContext";
import ImageComponent from "./ImageComponent";

const MainComponent = () => {
    const { publicImages, isFetchingPublic } = useSearch();
    return (
        <Container className="main-content">
            {
                isFetchingPublic ?
                    (<div className="spinner-square">
                        <div className="square-1 square"></div>
                        <div className="square-2 square"></div>
                        <div className="square-3 square"></div>
                    </div>
                    ) :
                    (<div className="masonry">
                        {publicImages.map((image, index) => (
                            <ImageComponent key={image.id || index} image={image} />
                        ))}
                    </div>
                    )
            }
        </Container>
    );
};

export default MainComponent;
