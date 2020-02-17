//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from "react";
import { Sticky, Menu, Icon, Sidebar, Segment, Header, Image } from "semantic-ui-react";

type State = {
  isMenuVisible: boolean;
};

export class HomeScreen extends React.Component<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isMenuVisible: true
    };
  }

  public render(): JSX.Element {
    return (
      <div style={{ height: "100vh", display: "flex", flexFlow: "column nowrap" }}>
        <Sticky>
          <Menu attached={"top"} tabular={true}>
            <Menu.Item onClick={() => this.setState({ isMenuVisible: !this.state.isMenuVisible })}>
              <Icon name={"sidebar"} />
            </Menu.Item>
          </Menu>
        </Sticky>
        <Sidebar.Pushable as={Segment}>
          {this._renderSideMenu()}
          {this._renderMainContent()}
        </Sidebar.Pushable>
      </div>
    );
  }

  private _renderSideMenu(): JSX.Element {
    return (
      <Sidebar
        as={Menu}
        animation={"push"}
        inverted={false}
        vertical={true}
        visible={this.state.isMenuVisible}
        width={"wide"}>
        <Menu.Item link>
          Quản lý catalog
          <Icon name={"clipboard list"} />
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Quản lý sản phẩm</Menu.Header>
          <Menu.Menu>
            <Menu.Item link>
              <Icon name="shopping cart" />
              Sản phẩm từ snkg
            </Menu.Item>
            <Menu.Item>
              <Icon name="tasks" />
              Yêu cầu từ khách hàng
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Sidebar>
    );
  }

  private _renderMainContent(): JSX.Element {
    return (
      <Sidebar.Pusher>
        <Segment basic>
          <Header as="h3">Application Content</Header>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      </Sidebar.Pusher>
    );
  }
}
