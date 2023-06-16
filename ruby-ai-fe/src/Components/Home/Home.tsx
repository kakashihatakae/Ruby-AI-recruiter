import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddEmail from "./AddEmail";
import { Paper, Typography } from "@mui/material";
import { PrevResponsesProps } from "../EmailDetails/PrevResponses";
import { useNavigate } from "react-router-dom";
import OnboardingModal from "../OnboardingModal";

const AddContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 80%;
  flex-direction: column;
  align-items: center;
`;

const PaperListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  const [campaign, setCampaign] = useState<PrevResponsesProps[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const navigate = useNavigate();

  const onPostClick = (campaign_id: number) => {
    navigate(`/email_details/${campaign_id}`);
  };

  useEffect(() => {
    const getCampaignData = async () => {
      try {
        let response = await fetch("http://127.0.0.1:5000/onboarding");
        const onboardingResponse = await response.json();
        if (onboardingResponse && onboardingResponse["show_onboarding"]) {
          setShowOnboarding(true);
        } else {
          response = await fetch("http://127.0.0.1:5000/get_all_campaigns");

          const campaign = await response.json();
          setCampaign(campaign["res"]);
        }
      } catch (error) {
        throw new Error("[Email Details]: Couldn't get email details");
      }
    };
    getCampaignData();
  }, []);

  return (
    <AddContainer>
      {showOnboarding && <OnboardingModal />}
      <PaperListContainer>
        {campaign.map((item) => (
          <Paper
            key={item.campaign_id}
            elevation={3}
            sx={{ p: 2, mb: 2, width: 1000 }}
            onClick={() => onPostClick(item.campaign_id)}
          >
            <Typography variant="h6">{item.title}</Typography>
          </Paper>
        ))}
      </PaperListContainer>
      <AddEmail />
    </AddContainer>
  );
}

export default Home;
