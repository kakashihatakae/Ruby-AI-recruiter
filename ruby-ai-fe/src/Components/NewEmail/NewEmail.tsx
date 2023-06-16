import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewEmail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    position: "",
    responsibilities: "",
    skills: "",
    experience: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/create_campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const id = await response.json();
      navigate(`/email_details/${id.campaign_id}`);
    } catch (error) {
      throw new Error("[Onboarding]: Not able to POST onboarding info");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="position"
        label="Position"
        value={formData.position}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="skills"
        label="Skills"
        value={formData.skills}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="experience"
        label="Experience"
        value={formData.experience}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="location"
        label="Location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Responsibilities"
        name="responsibilities"
        multiline
        rows={15}
        value={formData.responsibilities}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Create Email
      </Button>
    </form>
  );
};

export default NewEmail;
