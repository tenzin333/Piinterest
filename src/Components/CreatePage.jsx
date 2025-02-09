import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import uploadFile from "../assets/Icons/file-upload.svg";
import TagComponent from "./TagComponent";
import { useAuth } from "../Context/AuthContext";
import Services from "../Services/ServiceHandler";

const CreatePage = () => {
    const { profile } = useAuth();
    const [localImgData, setLocalImgData] = useState({});
    const [formData, setFormData] = useState({
        description: "",
        tags: [],
        visibility: "private",
        image_url: ""
    });

    const handleSave = async (event) => {
        event.stopPropagation();
        event.preventDefault();

        try {
            const imgUrl = await generateImgUrl();

            const data = {
                tags: formData.tags,
                image_url: imgUrl,
                description: formData.description,
                user_id: profile.user_id,
                created_saved: "C",
                visibility: formData.visibility
            };

            const res = await Services.upsert("images", data, ["user_id", "image_url"]);
            alert("Saved");
        } catch (error) {
            alert(error);
            console.log(error);
        }


    };

    const generateImgUrl = async () => {
        let bucket = formData.visibility === "public" ? "public_images" : "private_images";
        let url;
        let path;
   
        if (bucket === "public_images") {
            path = `images/${Date.now()}_${localImgData.imageFile.name}`;
            await Services.uploadImage(bucket, localImgData.imageFile, path, true);

            url = await Services.getImageUrl(bucket, path);
        } else {
            path = `${profile.user_id}/${bucket}/images/${Date.now()}_${localImgData.imageFile.name}`;
            await Services.uploadImage(bucket, localImgData.imageFile, path, true);
            url = await Services.getSignedUrl(bucket, path);
        }

        return url;
    };

    const handleChooseFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setLocalImgData({
                imageFile: selectedFile,
                name: selectedFile.name,
                imageUrl: URL.createObjectURL(selectedFile)
            });
        }
    };

    return (
        <Container md={12} className="main-content">
            <div>
                <h3>Create Pix</h3>
            </div>
            <Card className="d-flex justify-content-evenly flex-row" style={{borderRadius:"30px"}}>
                <div className="d-flex justify-content-center flex-column align-items-center m-3">
                    <div className="drop-files-area">
                        <label htmlFor="file-upload" className="upload-label">
                            <span className="upload-icon">
                                <img src={uploadFile} alt="Upload Icon" />
                            </span>
                            <p>Drop files here or click to upload</p>
                        </label>
                    </div>

                    {/* Image preview with proper alignment */}
                    {localImgData.imageUrl && (
                        <div className="image-preview-container mt-2">
                            <img
                                src={localImgData.imageUrl}
                                alt="Preview"
                                className="image-preview"
                            />
                        </div>
                    )}

                    <button style={{ backgroundColor: "#eb4242", color: "white" }} onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
                <div style={{ width: "40%" }}>
                    <div className="d-flex justify-content-center flex-column gap-2 my-3">
                        <span className="d-flex flex-column gap-2">
                            <label htmlFor="desc"><b>Description</b></label>
                            <textarea
                                placeholder="Add a detailed description"
                                style={{ width: "100%" }}
                                value={formData.description}
                                name="description"
                                id="description"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </span>

                        <span className="d-flex flex-column gap-2">
                            <label htmlFor="visibility"><b>Visibility</b></label>
                            <select
                                id="visibility"
                                value={formData.visibility}
                                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </span>

                        <span className="d-flex flex-column gap-2">
                            <label htmlFor="tags"><b>Tags</b></label>
                            <TagComponent formData={formData} setFormData={setFormData} />
                        </span>

                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleChooseFile}
                            className="file-input"
                        />
                    </div>
                </div>
            </Card>
        </Container>
    );
};

export default CreatePage;
