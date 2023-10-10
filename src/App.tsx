import React from "react";
import { StrictMode } from "react";
import SideMenu from "./SideMenu";
import StyledApp from "./StyledApp";

const menuConfig = [
  {
    title: "Home",
  },
  {
    title: "Services",
    subItems: ["Cooking", "Cleaning"],
  },
  {
    title: "Contact",
    subItems: ["Phone", "Mail"],
  },
];

const App: React.FC = () => {
  return (
    <StrictMode>
      <StyledApp>
        <div className="container">
          <h1>Side Menu</h1>
          <SideMenu menuConfig={menuConfig} />
        </div>
      </StyledApp>
    </StrictMode>
  );
};

export default App;
