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
            "name": "Balenciaga",
            "description": "Ola Hola",
            "action": "delete"
        }
    ]
    render() {
        return (
            <div className="resize">
                <Header as='h2'>
                    <Image circular src='./blcg.png' /> Catalog Name
                </Header>

                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Image</Table.HeaderCell>
                            <Table.HeaderCell>Sneaker</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{this.array[0].name}</Table.Cell>
                            <Table.Cell>No Action</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jamie</Table.Cell>
                            <Table.Cell>Approved</Table.Cell>
                            <Table.Cell>Requires call</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jill</Table.Cell>
                            <Table.Cell>Denied</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        <Table.Row warning>
                            <Table.Cell>John</Table.Cell>
                            <Table.Cell>No Action</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jamie</Table.Cell>
                            <Table.Cell positive>Approved</Table.Cell>
                            <Table.Cell warning>Requires call</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jill</Table.Cell>
                            <Table.Cell negative>Denied</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}