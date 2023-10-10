import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SideMenu from "./SideMenu";
import React from "react";

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

describe("SideMenu component", () => {
  it("renders the correct number of menu items", () => {
    const { getAllByTestId } = render(<SideMenu menuConfig={menuConfig} />);
    const menuItems = getAllByTestId(/first-level-.*/);
    expect(menuItems.length).toBe(menuConfig.length);
  });

  it("renders the correct title for each menu item", () => {
    const { getByTestId } = render(<SideMenu menuConfig={menuConfig} />);
    menuConfig.forEach((item) => {
      const menuItem = getByTestId(`first-level-${item.title.toLowerCase()}`);
      if (menuItem.firstChild) {
        expect(menuItem.firstChild.textContent).toBe(item.title);
      }
    });
  });

  it("displays a button for menu items with subItems", () => {
    const { getByTestId } = render(<SideMenu menuConfig={menuConfig} />);
    const servicesButton = getByTestId("button-services");
    const contactButton = getByTestId("button-contact");
    expect(servicesButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
  });

  it("displays a submenu for a menu item when the button is clicked", () => {
    const { getByTestId } = render(<SideMenu menuConfig={menuConfig} />);
    const servicesButton = getByTestId("button-services");
    fireEvent.click(servicesButton);
    const servicesSubmenu = getByTestId("ul-services");
    expect(servicesSubmenu).toBeInTheDocument();
  });

  it("hides a submenu when a different menu item is clicked", () => {
    const { getByTestId } = render(<SideMenu menuConfig={menuConfig} />);
    const servicesButton = getByTestId("button-services");
    fireEvent.click(servicesButton);
    const servicesSubmenu = getByTestId("ul-services");
    const contactButton = getByTestId("button-contact");
    fireEvent.click(contactButton);
    const contactSubmenu = getByTestId("ul-contact");
    expect(servicesSubmenu).not.toBeInTheDocument();
    expect(contactSubmenu).toBeInTheDocument();
  });

  it("correctly displays the Expand/Hide text on the button", () => {
    const { getByTestId } = render(<SideMenu menuConfig={menuConfig} />);
    const servicesButton = getByTestId("button-services");
    expect(servicesButton.textContent).toBe("Expand");
    fireEvent.click(servicesButton);
    const cookingSubmenuItem = getByTestId("li-services-cooking");
    expect(servicesButton.textContent).toBe("Hide");
    expect(cookingSubmenuItem).toBeInTheDocument();
    fireEvent.click(servicesButton);
    expect(servicesButton.textContent).toBe("Expand");
    expect(cookingSubmenuItem).not.toBeInTheDocument();
  });

  it("does not display a submenu for a menu item with no subItems", () => {
    const { queryByTestId } = render(
      <SideMenu
        menuConfig={[
          {
            title: "Home",
          },
          {
            title: "Services",
            subItems: ["Cooking", "Cleaning"],
          },
          {
            title: "Contact",
          },
        ]}
      />,
    );
    const homeSubmenu = queryByTestId("ul-home");
    const contactButton = queryByTestId("button-contact");
    expect(homeSubmenu).not.toBeInTheDocument();
    expect(contactButton).not.toBeInTheDocument();
  });
});
