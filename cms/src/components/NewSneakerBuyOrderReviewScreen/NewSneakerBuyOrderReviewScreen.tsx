//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from "react";
import { Header } from "semantic-ui-react";

type Props = {}

type State = {}

export class NewSneakerBuyOrderReviewScreen extends React.Component<Props, State>{

  public constructor(props: any) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <>
        <Header as="h2">
          Duyệt đơn mua
        </Header>
      </>
    );
  }

}