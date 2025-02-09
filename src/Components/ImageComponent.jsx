import React, { useState } from 'react';
import MoreIcon from "../assets/Icons/more.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from '../Context/AuthContext';
import Services from "../Services/ServiceHandler";

const ImageComponent = ({ handleSave, isSaved, image }) => {
    const [showMoreModal, setShowMoreModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const {profile,user} = useAuth();


    const handleMoreActions = (type) => {

        const handleDownload = async (imageUrl, imageName = "downloaded-image") => {
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = imageName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Clean up the object URL
                URL.revokeObjectURL(blobUrl);
            } catch (error) {
                console.error("Download failed", error);
            }
        };


        const saveImageToStorage = async() => {
                try {   
                        const form = {  
                            image_url: image.image_url,
                            user_id: user.id,
                            tags : image.tags,
                            description:image.description,
                            created_saved:"S",
                            visibility:"private"
                        }
                        const data = await Services.upsert("images",form,['user_id','image_url']);
                        alert("Saved");
                }catch(error) {
                    console.log(error);
                }
        }

        switch (type) {
            case "C": navigator.clipboard.writeText(image.url) //copy
                .then(() => alert("Image link copied to clipboard!"))  // Success message
                .catch(err => console.error("Failed to copy:", err));
                break;
            case "S": saveImageToStorage(image);
                break;     //Save
            case "D": handleDownload(image.url, image.name);
                break;           //Downlaod
            default: break;
        }

    }

    return (
        <div className="masonry-item">
            {!isLoaded && <Skeleton height={200} width="100%" borderRadius={8} />} {/* Skeleton */}

            <img src={image.image_url} alt="image" className={isLoaded ? "visible" : "hidden"} onLoad={() => setIsLoaded(true)} />
            <div className="masonry-action-btns">
                {/* <div className="masonry-action-top">
                    {!isSaved ?
                        <img className={"action-icon"} src={SaveIcon} onClick={handleSave}  name="save"  />
                        : <img className="action-icon" src={SaveIconFilled} onClick={handleSave} name="save"/>
                    }
                </div> */}

                <div className="masonry-action-footer">
                    {/* <img  className="action-icon" src={FileUploadIcon} alt="copy" onClick={() => setShowCopyModal(!showCopyModal)} /> */}
                    <img className="action-icon" src={MoreIcon} alt="more" onClick={() => setShowMoreModal(!showMoreModal)} />
                </div>

                {showMoreModal &&
                    <div className="show-more  d-flex justify-content-center align-items-center">
                        <ul className="d-flex justify-content-center  flex-column px-1 py-2 m-0" >
                            <li><a onClick={() => handleMoreActions("S")}>Save Image</a></li>
                            <li><a onClick={() => handleMoreActions("C")}>Copy Link</a></li>
                            <li><a onClick={() => handleMoreActions("D")}>Download Image</a></li>
                            {/* <li><a onClick={handleMoreActions("R")}>Report Pin</a></li> */}

                        </ul>
                    </div>}

                {/* {showCopyModal && 
                    <div className="show-more">
                        <ul className="d-flex justify-content-center flex-column p-2">
                            <li><a>Hide Pin</a></li>
                            <li><a>Download Image</a></li>
                            <li><a>Report Pin</a></li>
                        </ul>
                    </div>} */}

            </div>

        </div>


    )
}

export default ImageComponent;