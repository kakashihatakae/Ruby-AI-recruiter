import { Button, Container, Modal, TextField, styled } from "@mui/material";
import React, { useState } from "react";

const ModalContainer = styled(Container)`
  margin-top: 20vh;
  background-color: #fff;
  border-color: white;
  padding: 2rem;
  border-radius: 10px;
`;

const OnboardingModal = (): React.ReactElement => {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    company_name: "",
    company_motto: "",
    company_mission: "",
    brand_voice: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission logic here
    try {
      await fetch("http://127.0.0.1:5000/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      throw new Error("[Onboarding]: Not able to POST onboarding info");
    }

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Modal open={open} onClose={handleClose}>
        <ModalContainer
          maxWidth="sm"
          style={{
            marginTop: "20vh",
            backgroundColor: "#fff",
            padding: "2rem",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              name="company_name"
              label="Company Name"
              fullWidth
              value={formData.company_name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="company_motto"
              label="Motto"
              fullWidth
              value={formData.company_motto}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="company_mission"
              label="Mission"
              multiline
              rows={4}
              fullWidth
              value={formData.company_mission}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default OnboardingModal;
