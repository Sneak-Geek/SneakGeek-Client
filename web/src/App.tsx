import React from "react";
import "./App.css";
import { Menu, Image, Header } from "semantic-ui-react";

export default class App extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <div>
        <Menu size={"massive"}>
          <Menu.Menu position={"left"}>
            <Menu.Item>
              <img src="/snkg.png" />
            </Menu.Item>
            <Menu.Item link>
              <Header as={"h3"}>News</Header>
            </Menu.Item>
            <Menu.Item link>
              <Header as={"h3"}>App</Header>
            </Menu.Item>
            <Menu.Item link>
              <Header as={"h3"}>Help</Header>
            </Menu.Item>
          </Menu.Menu>

          <Menu.Menu position={"right"}>
            <Menu.Item link>
              <Header as={"h3"}>Search</Header>
            </Menu.Item>
            <Menu.Item link>
              <Header as={"h3"}>Login</Header>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div className={"ui footer form-page"}>
          <Menu inverted secondary>
            <Menu.Item href={"robots.txt"}>
              <Header as={"h5"}>Privacy policies</Header>
            </Menu.Item>
            <Menu.Item href={"robots.txt"}>
              <Header as={"h5"}>Terms of use</Header>
            </Menu.Item>
            <Menu.Item href={"robots.txt"}>
              <Header as={"h5"}>Support</Header>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}
