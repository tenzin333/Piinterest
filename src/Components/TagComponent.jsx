import React, { useState } from "react";

const TagInput = ({ formData, setFormData }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent form submission
      if (!formData.tags.includes(inputValue.trim())) {
        // setFormData([...data,tags: [...(form)  inputValue.trim()]]); // Add new tag
        setFormData({
            ...formData,
            tags:[...(formData.tags || []),inputValue.trim()]
        })
      }
      setInputValue(""); // Reset input
    }
  };

  const handleRemoveTag = (index) => {
    setFormData({
        ...formData,  
        tags: formData.tags.filter((_, i) => i !== index) // ✅ No semicolon inside the object
    });
  };

  return (
    <div className="tag-input-wrapper"> {/* Scoped Wrapper */}
    <div className="tag-input-container">
      <input
        type="text"
        className="tag-input-field"
        placeholder="Add a tag and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
      />
       <div className="tags">
        {formData.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button onClick={() => handleRemoveTag(index)}>×</button>
          </span>
        ))}
      </div>
    </div>
  </div>
  );
};

export default TagInput;
