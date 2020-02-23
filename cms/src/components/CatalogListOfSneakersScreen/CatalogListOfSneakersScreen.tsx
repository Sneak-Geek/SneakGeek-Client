import React from "react";
import { Header, Image, Table, Icon } from 'semantic-ui-react';
import './CatalogListOfSneakers.css';

type Props = {};

type State = {
    error: any,
    isLoaded: boolean,
    items: object[]
};

export class CatalogListOfSneakersScreen extends React.Component<Props, State> {
    array = [
        {
            "_id": "5e1fcf7c211ec4001b26cf82",
            "brand": "Nike",
            "category": "Air Max 1",
            "colorway": [
                "Bordeaux",
                "Desert Sand-Deep Burgundy-Bordeaux"
            ],
            "description": "",
            "gender": "men",
            "releaseDate": "2019-12-09T07:59:59.000Z",
            "name": "Bordeaux Desert Sand",
            "title": "Air Max 1 Bordeaux Desert Sand",
            "styleId": "875844-602",
            "imageUrl": "https://stockx.imgix.net/Nike-Air-Max-1-Bordeaux-Desert-Sand.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1557802469"
        },
        {
            "_id": "5e1fcf7c211ec4001b26eb25",
            "brand": "Jordan",
            "category": "Air Jordan One",
            "colorway": [
                "Black",
                "White-University Red"
            ],
            "description": "",
            "gender": "women",
            "releaseDate": "2019-09-01T06:59:59.000Z",
            "name": "Satin Black Toe (W)",
            "title": "Jordan 1 Retro High Satin Black Toe (W)",
            "styleId": "CD0461-016",
            "imageUrl": "https://stockx.imgix.net/Air-Jordan-1-Retro-High-Satin-Black-Toe-W.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1557337703"
        }
    ]
    render() {
        return (
            <div className="resize">
                <Header as='h2'>
                    <img src={"/blcg.png"} />
                    Catalog Name
                </Header>

                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Image</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Brand</Table.HeaderCell>
                            <Table.HeaderCell>Gender</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>StyleId</Table.HeaderCell>
                            <Table.HeaderCell>ReleaseDate</Table.HeaderCell>
                            <Table.HeaderCell>ID</Table.HeaderCell>


                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <img className="image" src={"/blcg.png"} />
                            </Table.Cell>
                            <Table.Cell>No Action</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <img className="image" src={"/blcg.png"} />
                            </Table.Cell>
                            <Table.Cell>No Action</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <img className="image" src={"/blcg.png"} />
                            </Table.Cell>
                            <Table.Cell>No Action</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}