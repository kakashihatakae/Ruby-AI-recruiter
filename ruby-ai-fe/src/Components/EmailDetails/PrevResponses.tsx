import { Divider, List, Paper, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ScrollablePaper = styled(Paper)`
  max-height: 600px;
  overflow: auto;
  padding: 20px;
`;

export interface PrevResponsesProps {
  campaign_id: number;
  title: string;
  position: string;
  skills: string;
  expereince: string;
  location: string;
  responsibilities: string;
  email: {
    email: string;
    feedback: string;
  }[];
}

const PrevResponses = (campaign: PrevResponsesProps): React.ReactElement => {
  return (
    <>
      <Typography variant="h5">{campaign.title}</Typography>
      <Typography variant="body1">Position: {campaign.position}</Typography>
      <Typography variant="body1">Skills: {campaign.skills}</Typography>
      <Typography variant="body1">Experience: {campaign.expereince}</Typography>
      <Typography variant="body1">Location: {campaign.location}</Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Responsibilities: {campaign.responsibilities}
      </Typography>

      <ScrollablePaper>
        <List>
          {campaign.email.map((item, index) => (
            <>
              <Typography variant="h6">AI Response</Typography>
              <Typography
                variant="body1"
                color="primary"
                sx={{ marginBottom: 3 }}
              >
                {item.email}
              </Typography>
              <Typography variant="h6">User Feedback</Typography>
              <Typography variant="body1" color="secondary">
                {item.feedback}
              </Typography>
              {index !== campaign.email.length - 1 && (
                <Divider
                  variant="middle"
                  sx={{ marginTop: 4, marginBottom: 4 }}
                />
              )}
            </>
          ))}
        </List>
      </ScrollablePaper>
    </>
  );
};

export default PrevResponses;
