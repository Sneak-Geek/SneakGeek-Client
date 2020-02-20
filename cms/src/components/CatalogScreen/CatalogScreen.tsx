import React from "react";
import { Table, Button, Icon, Menu } from 'semantic-ui-react'
import './style.css'

type Props = {};

type State = {
    error: any,
    isLoaded: boolean,
    items: object[]
};

export class CatalogScreen extends React.Component<Props, State> {
    a = [
        {
            "showOnHomepagePriority": 0,
            "descriptions": "Fall Running Hype 2020",
            "_id": "5e4ce6afaffda89450be8d36",
            "createdAt": "2020-02-19T07:41:35.540Z",
            "updatedAt": "2020-02-19T07:41:35.540Z",
            "title": "catalogue1",
            "products": [
                "507f1f77bcf86cd799439011"
            ]
        },
        {
            "showOnHomepagePriority": 0,
            "descriptions": "Autumn Elegant 2020",
            "_id": "5e4ce6b6affda89450be8d37",
            "createdAt": "2020-02-19T07:41:42.188Z",
            "updatedAt": "2020-02-19T07:41:42.188Z",
            "title": "catalogue2",
            "products": [
                "507f1f77bcf86cd799439011"
            ]
        }
    ]
    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/v1/catalogue")
            .then(res => res.json())
            .then(
                (catalogs) => {
                    this.setState({
                        isLoaded: true,
                        items: catalogs
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    popUpEditHandler = () => {
        console.log('Accessed');
    }

    render() {
        const { error, isLoaded, items } = this.state;
        console.log(error, isLoaded, items);
        return (
            <div className="view">
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description
                            <Button onClick={this.popUpEditHandler} floated='right' size='small' compact
                                    icon='small pencil alternate icon'
                                ></Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.a.map((element) => {
                            return (
                                <Table.Row>
                                    <Table.Cell>{element.title}</Table.Cell>
                                    <Table.Cell>{element.descriptions}
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    primary
                                    size='small'
                                >
                                    <Icon name='user' /> Add new catalog
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }

}