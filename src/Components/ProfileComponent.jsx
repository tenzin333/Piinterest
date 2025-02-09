import React, { useEffect, useState } from "react";
import { Tab, Tabs, Col } from "react-bootstrap";
import ProfileImg from "../assets/Icons/profile.svg";
import { useAuth } from "../Context/AuthContext";
import PenIcon from "../assets/Icons/pen.svg";
import Services from "../Services/ServiceHandler";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "../Context/ThemeContext";

const ProfileComponent = () => {
    const { user, profile } = useAuth();
    const [userProfile, setUserProfile] = useState(profile || {});
    const [initialUserProfile, setInitialUserProfile] = useState(profile || {});
    const [editProfile, setEditProfile] = useState(false);
    const [tabData, setTabData] = useState([]);
    const [activeTab, setActiveTab] = useState("C");
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingGallery, setLoadingGallery] = useState(true);
    const {darkMode} = useTheme();
  
    useEffect(() => {
        if (profile && JSON.stringify(profile) !== JSON.stringify(userProfile)) {
            setUserProfile(profile);
            setInitialUserProfile(profile);
        }
        setTimeout(() => setLoadingProfile(false), 1000);
    }, [profile]);

   
    useEffect(() => {
        if (!user) return;
        getTabData();
    }, [activeTab, user]);

    // ✅ Optimize: Only call API if data has changed
    const handleAction = () => {
        if (!editProfile) {
            setEditProfile(true);
        } else {
            if (JSON.stringify(userProfile) !== JSON.stringify(initialUserProfile)) {
                addUserInfoToServer();
            }
            setEditProfile(false);
        }
    };

    const addUserInfoToServer = async () => {
        try {
            const path = `${userProfile.user_id}/avatar/${userProfile.avatarFile ? userProfile.avatarFile.name : userProfile.avatar_url.split('/').pop().split('?')[0].replace(/\.[^/.]+$/, '')}`;
            
            const res1 = await Services.uploadImage("private_images", userProfile.avatarFile ?? userProfile.avatar_url, path,true);
            const res2 = await Services.getSignedUrl("private_images", path);

            const data = [{
                avatar_url: res2,
                email: userProfile.email,
                user_id: userProfile.user_id,
                display_name: userProfile.name,
                bio: userProfile.bio
            }];
            
            await Services.upsert("profiles", data, ["user_id"]);
            setEditProfile(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getTabData = async () => {
        setLoadingGallery(true);
        try {
            const data = await Services.get("images", {
                user_id: user?.id,
                created_saved: activeTab
            });
            setTabData(data);
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => setLoadingGallery(false), 1000);
    };

    const handleChooseFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setUserProfile(prev => ({
                ...prev,
                avatar_url: imageUrl,
                avatarFile: selectedFile
            }));
        }
    };

    return (
        <>
            <div className="container-profile-center">
                <h4 style={{color:"black"}}>User Profile</h4>
                <div className="profile-container">
                    {/* Profile Image */}
                    {loadingProfile ? (
                        <Skeleton circle height={200} width={200} />
                    ) : (
                        <img
                            className="profile-picture"
                            alt="avatar"
                            style={{ borderRadius: "100%" }}
                            src={userProfile?.avatar_url ?? user.user_metadata.avatar_url ?? ProfileImg}
                            width="150px"
                            height="150px"
                        />
                    )}

                    {editProfile && (
                        <div className="upload-profile-container">
                            <input type="file" style={{ display: "none" }} onChange={handleChooseFile} id="file-input" />
                            <label htmlFor="file-input">
                                <img alt="pen" src={PenIcon} width="40px" height="40px" />
                            </label>
                        </div>
                    )}

                    <div className="user-info">
                        {loadingProfile ? (
                            <>
                                <Skeleton width={150} height={20} />
                                <Skeleton width={200} height={20} />
                                <Skeleton width={250} height={20} />
                            </>
                        ) : editProfile ? (
                            <>
                                <input type="text" name="name" placeholder="Username" value={userProfile?.name ?? ""} 
                                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))} />
                                <p>{userProfile?.email ?? user.email}</p>
                                <input type="text" name="bio" placeholder="Bio" value={userProfile?.bio ?? ""} 
                                    onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))} />
                            </>
                        ) : (
                            <>
                                <p><b>{userProfile?.name ?? user.user_metadata.name}</b></p>
                                <p>{userProfile?.email ?? user.email}</p>
                                <p>{userProfile?.bio}</p>
                            </>
                        )}

                        <div className="d-flex align-items-center gap-3 mt-5">
                            <button onClick={handleAction}>{editProfile ? "Save" : "Edit"}</button>
                            <button onClick={() => setEditProfile(false)}>{editProfile ? "Cancel" : "Share"}</button>
                        </div>
                    </div>
                </div>
            </div>

            <Col md={12}>
                <Tabs defaultActiveKey="C" className="d-flex justify-content-center align-items-center mx-2 my-3 tab-container" onSelect={setActiveTab}>
                    <Tab eventKey="C" title="My Images">
                        {loadingGallery ? <GallerySkeleton /> : tabData.length > 0 ? <Gallery tabData={tabData} /> : <NoData />}
                    </Tab>
                    <Tab eventKey="S" title="Saved">
                        {loadingGallery ? <GallerySkeleton /> : tabData.length > 0 ? <Gallery tabData={tabData} /> : <NoData />}
                    </Tab>
                </Tabs>
            </Col>
        </>
    );
};

// 🔹 **Reusable Gallery Component**
const Gallery = ({ tabData }) => (
    <div className="gallery-container">
        {tabData.map((item, index) => (
            <GalleryImage key={item.id + index} imageUrl={item.image_url} altText={`Gallery Image ${index}`} />
        ))}
    </div>
);

// 🔹 **Gallery Image Component with Skeleton Loader**
const GalleryImage = ({ imageUrl, altText }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="gallery-item">
            {!isLoaded && <Skeleton height={200} width="100%" borderRadius={8} />}
            <img src={imageUrl} alt={altText} className={isLoaded ? "visible" : "hidden"}  onLoad={() => setIsLoaded(true)} />
        </div>
    );
};

// 🔹 **Skeleton for Gallery Grid**
const GallerySkeleton = () => (
    <div className="gallery-container">
        {Array(6).fill().map((_, index) => (
            <Skeleton key={index} height={200} width="100%" borderRadius={8} />
        ))}
    </div>
);

// 🔹 **No Data Component**
const NoData = () => <p className="text-center mt-5"><b>No Data Found :(</b></p>;

export default ProfileComponent;
