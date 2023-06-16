import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import NewEmail from "./Components/NewEmail/NewEmail";
import EmailDetails from "./Components/EmailDetails/EmailDetails";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <>
      <OuterContainer>
        <Router>
          <Link to="/">Home</Link>
          <Routes>
            <Route path="/add_email" Component={NewEmail} />
            <Route path="/" Component={Home} />
            <Route path="/email_details/:campaignId" Component={EmailDetails} />
          </Routes>
        </Router>
      </OuterContainer>
    </>
  );
}

export default App;
