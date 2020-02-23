import React from "react";
import {
  Table,
  Button,
  Icon,
  Menu,
  Segment,
  Dimmer,
  Loader,
  Header
} from "semantic-ui-react";
import "./style.css";
import { getAllCatalogs, ICatalogState, Catalog, NetworkRequestState } from "business";
import { connect } from "react-redux";
import { IAppState } from "../../store/IAppState";
import { Redirect } from "react-router-dom";

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

  private _popUpEditHandler() {}

  render() {
    const { error, isLoaded, items } = this.state;
    if (
      this.props.catalogState.state === NetworkRequestState.REQUESTING ||
      this.props.catalogState.state === NetworkRequestState.NOT_STARTED
    ) {
      return (
        <Segment>
          <Dimmer active>
            <Loader>Getting catalog...</Loader>
          </Dimmer>
        </Segment>
      );
    }

    if (
      !this.props.catalogState.catalogs &&
      this.props.catalogState.state === NetworkRequestState.FAILED
    ) {
      return <Header>Đã có lỗi xảy ra</Header>;
    }

    const { catalogs } = this.props.catalogState;

    return (
      <div className="view">
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>
                Description
                <Button
                  onClick={this._popUpEditHandler.bind(this)}
                  floated="right"
                  size="small"
                  compact
                  icon="small pencil alternate icon"
                ></Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {catalogs!.map(element => {
              return (
                <Table.Row>
                  <Table.Cell>{element.title}</Table.Cell>
                  <Table.Cell>{element.description}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Button floated="right" icon labelPosition="left" primary size="small">
                  <Icon name="user" /> Add new catalog
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
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
