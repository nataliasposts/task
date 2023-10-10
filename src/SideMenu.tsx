import React, { useState } from "react";

type MenuItem = {
  title: string;
  subItems?: Array<string>;
};

type MenuConfig = Array<MenuItem>;

type SideMenuProps = {
  menuConfig: MenuConfig;
};

const SideMenu: React.FC<SideMenuProps> = ({ menuConfig }) => {
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  const handleButtonClick = (title: string) => {
    if (expandedTitle === title) {
      setExpandedTitle(null);
    } else {
      setExpandedTitle(title);
    }
  };

  return (
    <div className="menu-wrapper">
      {menuConfig.map((item) => (
        <div
          key={item.title}
          data-testid={`first-level-${item.title.toLowerCase()}`}
        >
          {item.title}
          {item.subItems && item.subItems.length > 0 && (
            <button
              data-testid={`button-${item.title.toLowerCase()}`}
              onClick={() => handleButtonClick(item.title)}
            >
              {expandedTitle === item.title ? "Hide" : "Expand"}
            </button>
          )}
          {expandedTitle === item.title && item.subItems && (
            <ul data-testid={`ul-${item.title.toLowerCase()}`}>
              {item.subItems.map((subItem) => (
                <li
                  key={subItem}
                  data-testid={`li-${item.title.toLowerCase()}-${subItem.toLowerCase()}`}
                >
                  {subItem}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
