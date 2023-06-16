import { Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const AddEmail = () => {
  const history = useNavigate();

  const handleOpen = () => {
    history("/add_email");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New Campaign
      </Button>
    </div>
  );
};

export default AddEmail;
