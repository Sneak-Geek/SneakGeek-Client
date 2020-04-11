import React from "react";
import { Table, Header, Grid, Form, TextArea, Button, Segment, Modal, Image, Label } from "semantic-ui-react";
import "./style.css";
import {
  ShoeAuthentication, FactoryKeys, SettingsKey
} from "business";
import { History } from "history";
import { TrackingStatusEnum } from "../SneakersCheckingScreen";
import { ObjectFactory, IShoeAuthenticationTransactionService, ISettingsProvider } from "business";

type Props = {
  history: History;
  location: any;
};

type State = {
  shoeAuthentication: ShoeAuthentication,
  description: string
};

export class AuthAndRepSneakerScreen extends React.Component<Props, State> {
  private readonly _shoeAuthenticationTransactionService = ObjectFactory.getObjectInstance<IShoeAuthenticationTransactionService>(FactoryKeys.IShoeAuthenticationTransactionService);

  private readonly _settingProvider = ObjectFactory.getObjectInstance<ISettingsProvider>(FactoryKeys.ISettingsProvider);

  constructor(props: Props) {
    super(props);
    this.state = {
      shoeAuthentication: this.props.location.state.shoeAuthentication,
      description: ""
    };
  }

  private _renderModalOfImages(image: string) {
    return (<Modal trigger={<Image size='big' src={image} />}>
      <Modal.Content>
        <Image size='huge' src={image} wrapped />
      </Modal.Content>
    </ Modal >);
  }

  render(): JSX.Element {
    return (
      <>
        <Header as="h2">Báo cáo chất lượng giày</Header>
        <Grid columns={2} padded='vertically'>
          <Grid.Column width="10">
            <Segment>
              <Table celled>
                {this._renderTableHeader()}
                {this._renderTableBody()}
              </Table>
            </Segment>
            <Header as="h3">
              Ảnh tình trạng giày
            </Header>
            <Segment>
              {
                <Grid columns='equal'>
                  {this.state.shoeAuthentication.images.map((image: string) => {
                    return (
                      <Grid.Column>
                        {this._renderModalOfImages(image)}
                      </Grid.Column>
                    );
                  })
                  }
                </Grid>
              }
            </Segment>
          </Grid.Column>
          <Grid.Column width="5">
            {this._renderCheckerInput()}
          </Grid.Column>
        </Grid>
      </>
    );
  }

  private async _updateAuthenticationStatus(status: number) {
    const token = this._settingProvider.getValue(SettingsKey.CurrentAccessToken);
    console.log(this.state.description);
    switch (status) {
      case 1:
        try {
          await this._shoeAuthenticationTransactionService.updateAuthenticationStatus(token, this.state.shoeAuthentication.transactionId, TrackingStatusEnum.APPROVED_BY_SNEAKGEEK, this.state.description);
        }
        catch (error) {
          alert("Error in updating authentication status!")
        }
        break;
      case -1:
        try {
          await this._shoeAuthenticationTransactionService.updateAuthenticationStatus(token, this.state.shoeAuthentication.transactionId, TrackingStatusEnum.REJECTED_BY_SNEAKGEEK, this.state.description);
        }
        catch (error) {
          alert("Error in updating authentication status!")
        }
        break;
      default:
        break;
    }
    this.props.history.push(`/shoe-authentication/`);
  }

  private _handleInputChange(event: any, data: any) {
    const { value } = data;
    this.setState({ description: value });
  }

  private _renderCheckerInput() {
    return (
      <>
        <Form>
          <Form.Field>
            <TextArea onChange={(event, data) => { this._handleInputChange(event, data) }} placeholder='Mô tả tình trạng giày nếu không đạt tiêu chuẩn...' style={{ minHeight: 400 }} />
          </Form.Field>
          <Button onClick={() => this._updateAuthenticationStatus(1)} floated="right" type='submit' color="blue">Xác nhận </Button>
          <Button onClick={() => this._updateAuthenticationStatus(0)} floated="right" type='submit'>Huỷ</Button>
          <Button onClick={() => this._updateAuthenticationStatus(-1)} floated="right" type='submit' color="brown">Chưa đạt</Button>
        </Form>

      </>
    );
  }

  private _renderTableHeader() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Trạng thái</Table.HeaderCell>
          <Table.HeaderCell>Mã chuyển hàng</Table.HeaderCell>
          <Table.HeaderCell>Ảnh giày</Table.HeaderCell>
          <Table.HeaderCell>Tên giày</Table.HeaderCell>
          <Table.HeaderCell>Hãng giày</Table.HeaderCell>
          <Table.HeaderCell>Mới/Cũ</Table.HeaderCell>
          <Table.HeaderCell>Ngày tạo đơn hàng</Table.HeaderCell>
          <Table.HeaderCell>Cỡ giày</Table.HeaderCell>
          <Table.HeaderCell>Tình trạng giày</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  private _renderShoeAuthStatus(shoeAuthentication: ShoeAuthentication) {
    if (shoeAuthentication.status === TrackingStatusEnum.DELIVERED_TO_SNEAKGEEK) {
      return (<Label color="yellow" circular empty />);
    } else if (shoeAuthentication.status === TrackingStatusEnum.APPROVED_BY_SNEAKGEEK) {
      return (<Label color="green" circular empty />);
    } else if (shoeAuthentication.status === TrackingStatusEnum.REJECTED_BY_SNEAKGEEK) {
      return (<Label color="red" circular empty />);
    } else {
      return (<Label color="black" circular empty />);
    }
  }

  private _renderTableBody(): React.ReactNode {
    const shoeAuthentication = this.state.shoeAuthentication;
    if (shoeAuthentication)
      return (
        <Table.Row>
          <Table.Cell textAlign="center" verticalAlign="middle">{this._renderShoeAuthStatus(shoeAuthentication)}</Table.Cell>
          <Table.Cell>{shoeAuthentication.trackingId}</Table.Cell>
          <Table.Cell>
            {""}
            <img className="image" src={shoeAuthentication.imageUrl} />
          </Table.Cell>
          <Table.Cell>{shoeAuthentication.title}</Table.Cell>
          <Table.Cell>{shoeAuthentication.brand}</Table.Cell>
          <Table.Cell>{shoeAuthentication.isNew ? "Mới" : "Cũ"}</Table.Cell>
          <Table.Cell>{shoeAuthentication.uploadDate}</Table.Cell>
          <Table.Cell>{shoeAuthentication.size}</Table.Cell>
          <Table.Cell>{}</Table.Cell>
        </Table.Row>
      );
    else
      return <></>;
  }
}
