import React from "react";
import { Table, Header, Grid, Form, TextArea, Button, Segment, Modal, Image, Label } from "semantic-ui-react";
import "./style.css";
import {
  ShoeAuthentication
} from "business";
import { History } from "history";

type Props = {
  history: History;
  location: any;
};

type State = {
  shoeAuthentication: ShoeAuthentication,
};

export class AuthAndRepSneakerScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      shoeAuthentication: this.props.location.state.shoeAuthentication,

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

  private _renderCheckerInput() {
    return (
      <>
        <Form>
          <Form.Field>
            <TextArea placeholder='Mô tả tình trạng giày nếu không đạt tiêu chuẩn...' style={{ minHeight: 400 }} />
          </Form.Field>
          <Button floated="right" type='submit' color="blue">Xác nhận </Button>
          <Button floated="right" type='submit'>Huỷ</Button>
          <Button floated="right" type='submit' color="brown">Chưa đạt</Button>
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
    if (shoeAuthentication.status === "Chờ xét duyệt") {
      return (<Label color="yellow" circular empty />);
    } else if (shoeAuthentication.status === "Đạt tiêu chuẩn") {
      return (<Label color="green" circular empty />);
    } else {
      return (<Label color="red" circular empty />);
    }
  }

  private _renderTableBody(): React.ReactNode {
    const shoeAuthentication = this.state.shoeAuthentication;
    if (shoeAuthentication)
      return (
        <Table.Row>
          <Table.Cell textAlign="center" verticalAlign="middle">{this._renderShoeAuthStatus(shoeAuthentication)}</Table.Cell>
          <Table.Cell>{shoeAuthentication.trackingID}</Table.Cell>
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
