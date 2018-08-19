import React from "react";
import UserHome from "./components/UserHome";
import Wrapper from "./components/Wrapper";
// import friends from "./friends.json";
import "./App.css";

const App = () => (
  <Wrapper>
    <UserHome>
      <div>
        This content is the p-Tag's content from the UserHome call in App.js 
      </div>
    </UserHome>
  </Wrapper>
);

export default App;
