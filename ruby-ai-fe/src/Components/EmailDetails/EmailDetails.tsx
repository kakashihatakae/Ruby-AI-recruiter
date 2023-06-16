import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrevResponses, { PrevResponsesProps } from "./PrevResponses";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 20px;
  width: 80%;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
`;

function EmailDetails() {
  const { campaignId } = useParams();
  console.log(campaignId);
  const [campaign, setCampaign] = useState<PrevResponsesProps>();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:5000/get_better_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaign_id: campaignId, feedback: feedback }),
      });
    } catch (error) {
      throw new Error("[Onboarding]: Not able to POST onboarding info");
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_campaign/${campaignId}`
      );
      const campaign = await response.json();
      setCampaign(campaign.campaign);
    } catch (error) {
      throw new Error("[Email Details]: Couldn't get email details");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value);
  };

  useEffect(() => {
    const getCampaignData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/get_campaign/${campaignId}`
        );
        const campaign = await response.json();
        console.log(campaign.campaign);
        setCampaign(campaign.campaign);
      } catch (error) {
        throw new Error("[Email Details]: Couldn't get email details");
      }
    };
    getCampaignData();
  }, []);

  return (
    <Container>
      {campaign ? (
        <PrevResponses {...campaign} />
      ) : (
        <Typography>Please Reload page</Typography>
      )}
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <TextField
            name="feedback"
            label="Feedback"
            value={feedback}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ marginRight: 4 }}
          />
          <Button type="submit">Submit</Button>
        </FormContainer>
      </form>
    </Container>
  );
}

export default EmailDetails;
