import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  makeStyles,
  Theme,
  Chip,
  Icon,
  IconButton,
  TablePagination,
  Fab,
  withStyles,
} from '@material-ui/core';
import { Shoe, IShoeService, ObjectFactory, FactoryKeys } from 'business';
import { SearchInput } from '../../../shared';
import { getToken } from '../../../utilities';
import AddIcon from '@material-ui/icons/Add';

const ProductTableContent = (props: { shoes: Shoe[]; classes: any }): JSX.Element => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>Title</TableCell>
        <TableCell>Brand</TableCell>
        <TableCell>Colorway</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
    {props.shoes.map((shoe, index) => (
      <TableRow hover key={`${index}${shoe._id}`}>
        <TableCell>
          <Avatar src={shoe.imageUrl} variant={'rounded'} sizes={'large'} />
        </TableCell>
        <TableCell>
          <Typography variant="body1">{shoe.title}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{shoe.brand}</Typography>
        </TableCell>
        <TableCell>
          {shoe.colorway.map((c) => (
            <Chip
              clickable
              label={c}
              key={c}
              className={props.classes.chip}
              color={'inherit'}
            />
          ))}
        </TableCell>
        <TableCell>
          <Chip clickable label={shoe.category} />
        </TableCell>
        <TableCell className={props.classes.action}>
          <IconButton>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton>
            <Icon>arrow_forward</Icon>
          </IconButton>
        </TableCell>
      </TableRow>
    ))}
  </Table>
);

type Props = {
  classes: any;
};

type State = {
  currentPage: number;
  shoes: Shoe[];
  total: number;
  keyword: string;
};

class ProductTable extends React.Component<Props, State> {
  private shoeService: IShoeService = ObjectFactory.getObjectInstance(FactoryKeys.IShoeService);

  state = {
    shoes: [],
    currentPage: 0,
    total: 0,
    keyword: '',
  };

  public componentDidMount() {
    this.fetchShoes();
  }

  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant={'h2'} className={classes.title}>
          Tất cả sản phẩm
        </Typography>
        <Card>
          <CardContent className={classes.content}>
            <SearchInput onChange={this.onKeywordChange.bind(this)} />
            <Typography variant={'body1'} className={classes.total}>
              {this.state.total} kết quả
            </Typography>
            <ProductTableContent shoes={this.state.shoes} classes={classes} />
          </CardContent>
        </Card>
        <TablePagination
          component={'div'}
          count={this.state.total}
          page={this.state.currentPage}
          onChangePage={this.onChangePage.bind(this)}
          rowsPerPageOptions={[20]}
          rowsPerPage={20}
          onChangeRowsPerPage={() => {}}
        />
        <Fab color={'primary'} aria-label={'add'} className={classes.fab}>
          <AddIcon />
        </Fab>
      </div>
    );
  }

  private async fetchShoes(keyword: string = this.state.keyword) {
    const { shoes, count } = await this.shoeService.searchShoes(
      getToken(),
      keyword,
      this.state.currentPage,
    );
    this.setState({ shoes, total: count });
  }

  private onKeywordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    this.setState({ keyword: text, currentPage: 0 });
    this.fetchShoes(text);
  }

  private onChangePage(_: any, page: number) {
    this.setState({ shoes: [], currentPage: page });
    this.fetchShoes();
  }
}

export default withStyles((theme: Theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  chip: {
    marginLeft: 5,
    marginTop: 2,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginBottom: 15,
  },
  total: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  fab: {
    display: 'flex',
    position: 'fixed',
    bottom: 50,
    right: 50,
  },
}))(ProductTable);
