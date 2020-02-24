//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import React from "react";
import { Table, Button, Icon, Segment, Dimmer, Loader, Header } from "semantic-ui-react";
import "./style.css";
import { getAllCatalogs, ICatalogState, Catalog, NetworkRequestState } from "business";
import { connect } from "react-redux";
import { IAppState } from "../../store/IAppState";

type Props = {
  getAllCatalogs: () => void;
  catalogState: {
    state: NetworkRequestState;
    error?: any;
    catalogs?: Catalog[];
  };
};

type State = {
  error: any;
  isLoaded: boolean;
  items: object[];
};

export class UnconnectedCatalogScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    function isEmpty(obj: any) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  public componentDidMount() {
    this.props.getAllCatalogs();
  }

  render() {
    const { catalogState } = this.props;
    if (
      catalogState.state === NetworkRequestState.REQUESTING ||
      catalogState.state === NetworkRequestState.NOT_STARTED
    ) {
      return (
        <Segment>
          <Dimmer active>
            <Loader>Getting catalog...</Loader>
          </Dimmer>
        </Segment>
      );
    }

    if (catalogState.catalogs && catalogState.state === NetworkRequestState.FAILED) {
      return <Header>Đã có lỗi xảy ra</Header>;
    }

    const { catalogs } = catalogState;

    return (
      <div className="view">
        <Header as="h2">Quản lý catalog</Header>
        <Table celled stripped>
          {this._renderTableHeader()}
          {this._renderTableBody(catalogs)}
          {this._renderTableFooter()}
        </Table>
      </div>
    );
  }

  private _renderTableHeader(): JSX.Element {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  private _renderTableBody(catalogs?: Catalog[]): JSX.Element {
    return (
      <Table.Body>
        {catalogs!.map(element => {
          return (
            <Table.Row>
              <Table.Cell collapsing>{element.title}</Table.Cell>
              <Table.Cell>{element.description}</Table.Cell>
              <Table.Cell collapsing>
                <Button
                  onClick={() => {}}
                  floated={"right"}
                  size={"small"}
                  compact
                  icon={"eye"}
                />
              </Table.Cell>
              <Table.Cell collapsing>
                <Button
                  onClick={() => {}}
                  floated={"right"}
                  size={"small"}
                  compact
                  icon={"small pencil alternate icon"}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    );
  }

  private _renderTableFooter(): JSX.Element {
    return (
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="4">
            <Button floated="right" icon labelPosition="left" primary size="small">
              <Icon name="plus" /> Add new catalog
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    );
  }
}

export const CatalogScreen = connect(
  (state: IAppState) => ({
    catalogState: state.CatalogState.catalogState
  }),
  (dispatch: Function) => ({
    getAllCatalogs: () => dispatch(getAllCatalogs())
  })
)(UnconnectedCatalogScreen);
