import React from "react";
import { Table, Header, Grid, Search } from "semantic-ui-react";
import { ShoeAuthentication } from "business";
import { Link } from "react-router-dom";
import { History } from "history";

type Props = {
  history: History
};

type State = {
  shoeAuthentications?: ShoeAuthentication[];
  isLoading: boolean;
  value: string;
  searchResults: object[];
  searchTextInput: string;
};

export class SneakersCheckingScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTextInput: "",
      searchResults: [],
      isLoading: false,
      value: "",
      shoeAuthentications: [
        {
          title: "Balenciaga",
          imageUrl:
            "https://stockx.imgix.net/Nike-Kobe-4-Protro-Draft-Day-Hornets-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1552673057",
          brand: "string",
          size: 102,
          isNew: false,

          images: ["https://stockx.imgix.net/Air-Jordan-1-Retro-High-Satin-Black-Toe-W.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1557337703", "https://stockx.imgix.net/Nike-Air-Max-1-Bordeaux-Desert-Sand.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1557802469", "https://stockx.imgix.net/Air-Foamposite-Pro-Gucci-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1559767909", "https://stockx.imgix.net/Air-Foamposite-Pro-White-Gucci-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1555964877", "https://stockx.imgix.net/Nike-Kobe-4-Protro-Carpe-Diem.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1557452514", "https://stockx.imgix.net/Nike-Kobe-4-Protro-Draft-Day-Hornets-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1552673057"],
          condition: {},
          trackingID: "1e8kdd12jKl",
          status: "Chờ xét duyệt",
          uploadDate: "17-01-2020 8PM UTC"
        },
        {
          title: "Gucci",
          imageUrl:
            "https://stockx.imgix.net/Nike-Zoom-Fly-3-White-Black.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1561165977",
          brand: "string",
          size: 102,
          isNew: true,
          images: ["string", "string"],
          condition: {},
          trackingID: "1kd0239dj0",
          status: "Chờ xét duyệt",
          uploadDate: "17-01-2020 8PM UTC"
        },
        {
          title: "Yeezy",
          imageUrl:
            "https://stockx.imgix.net/Nike-SB-Nike-Air-Force-2-Low-Team-Red-Obsidian.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1560959207",
          brand: "string",
          size: 102,
          isNew: false,
          images: ["string", "string"],
          condition: {},
          trackingID: "2od09023dd",
          status: "Chờ xét duyệt",
          uploadDate: "17-01-2020 8PM UTC"
        },
        {
          title: "Yeezy",
          imageUrl:
            "https://stockx.imgix.net/Nike-SB-Nike-Air-Force-2-Low-Team-Red-Obsidian.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1560959207",
          brand: "string",
          size: 102,
          isNew: false,
          images: ["string", "string"],
          condition: {},
          trackingID: "oopp0011nn",
          status: "Đạt tiêu chuẩn",
          uploadDate: "17-01-2020 8PM UTC"
        },
        {
          title: "Yeezy",
          imageUrl:
            "https://stockx.imgix.net/Nike-SB-Nike-Air-Force-2-Low-Team-Red-Obsidian.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1560959207",
          brand: "string",
          size: 102,
          isNew: false,
          images: ["string", "string"],
          condition: {},
          trackingID: "39jxnd12s",
          status: "Đạt tiêu chuẩn",
          uploadDate: "17-01-2020 8PM UTC"
        },
        {
          title: "Yeezy",
          imageUrl:
            "https://stockx.imgix.net/Nike-SB-Nike-Air-Force-2-Low-Team-Red-Obsidian.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1560959207",
          brand: "string",
          size: 102,
          isNew: false,
          images: ["string", "string"],
          condition: {},
          trackingID: "oloaf9320jdsd020",
          status: "Đạt tiêu chuẩn",
          uploadDate: "17-01-2020 8PM UTC"
        },
        {
          title: "Yeezy",
          imageUrl:
            "https://stockx.imgix.net/Nike-SB-Nike-Air-Force-2-Low-Team-Red-Obsidian.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1560959207",
          brand: "string",
          size: 102,
          isNew: false,
          images: ["string", "string"],
          condition: {},
          trackingID: "Omd03mla021",
          status: "Chưa đạt tiêu chuẩn",
          uploadDate: "17-01-2020 8PM UTC"
        },
        {
          title: "Yeezy",
          imageUrl:
            "https://stockx.imgix.net/Nike-SB-Nike-Air-Force-2-Low-Team-Red-Obsidian.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1560959207",
          brand: "string",
          size: 102,
          isNew: false,
          images: ["string", "string"],
          condition: {},
          trackingID: "AA2ncdj918Fl0",
          status: "Chưa đạt tiêu chuẩn",
          uploadDate: "17-01-2020 8PM UTC"
        }
      ]
    };
  }

  render(): JSX.Element {
    return (
      <div>
        <Header as="h2">Check giày</Header>
        {this._renderSearchReviewProducts()}
        <Table celled selectable>
          {this._renderTableHeader()}
          {this._renderTableBody(this.state.shoeAuthentications)}
        </Table>
      </div>
    );
  }

  private _handleSearchChange(event: any, data: any) {
    const { value } = data;
    this.setState({ isLoading: true, searchTextInput: value });
    //TO DO: Need to Implement a Searching Algorithm
    const results = this.state.shoeAuthentications!.map((shoeAu: ShoeAuthentication) => {
      return {
        image: shoeAu.imageUrl,
        ...shoeAu,
        title: shoeAu.trackingID
      };
    });
    this.setState({ isLoading: false, searchResults: results });
  }

  private _linkToAuthAndRepSneakerScreen(data: ShoeAuthentication) {
    //TO DO: Link to a new screen that allow admins to shoe authentication
    this.props.history.push(`/shoe-authentication/${data.trackingID}`, {
      shoeAuthentication: data
    });
  }

  private _onSearchSelect(event: any, data: any) {
    const { result } = data;
    this._linkToAuthAndRepSneakerScreen(data);
  }

  private _renderSearchReviewProducts() {
    return (
      <Grid>
        <Grid.Column width={5}>
          <Search
            fluid
            placeholder="Nhập mã chuyển hàng"
            loading={this.state.isLoading}
            onSearchChange={this._handleSearchChange.bind(this)}
            onResultSelect={this._onSearchSelect.bind(this)}
            results={this.state.searchResults}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }

  private _renderTableHeader() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Mã chuyển hàng</Table.HeaderCell>
          <Table.HeaderCell>Ảnh giày</Table.HeaderCell>
          <Table.HeaderCell>Tên giày</Table.HeaderCell>
          <Table.HeaderCell>Hãng giày</Table.HeaderCell>
          <Table.HeaderCell>Mới/Cũ</Table.HeaderCell>
          <Table.HeaderCell>Ngày tạo đơn hàng</Table.HeaderCell>
          <Table.HeaderCell>Trạng thái</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  private _renderTableBody(shoeAuthentications?: ShoeAuthentication[]) {
    if (shoeAuthentications)
      return (
        <Table.Body>
          {shoeAuthentications.map((shoeAuthentication: ShoeAuthentication) => {
            return (
              <Table.Row warning={shoeAuthentication.status === "Chờ xét duyệt"} positive={shoeAuthentication.status === "Đạt tiêu chuẩn"} negative={shoeAuthentication.status === "Chưa đạt tiêu chuẩn"}
                onClick={() => {
                  if (shoeAuthentication.status === "Chờ xét duyệt")
                    this._linkToAuthAndRepSneakerScreen(shoeAuthentication);
                }}
              >
                <Table.Cell>{shoeAuthentication.trackingID}</Table.Cell>
                <Table.Cell>
                  {" "}
                  <img className="image" src={shoeAuthentication.imageUrl} />
                </Table.Cell>
                <Table.Cell>{shoeAuthentication.title}</Table.Cell>
                <Table.Cell>{shoeAuthentication.brand}</Table.Cell>
                <Table.Cell>{shoeAuthentication.isNew ? "Mới" : "Cũ"}</Table.Cell>
                <Table.Cell>{shoeAuthentication.uploadDate}</Table.Cell>
                <Table.Cell>{shoeAuthentication.status}</Table.Cell>
              </Table.Row>
            );
          })
          }
        </Table.Body >
      );
    else return <></>;
  }
}
