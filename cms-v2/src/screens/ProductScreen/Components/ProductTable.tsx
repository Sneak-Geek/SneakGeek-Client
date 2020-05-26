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
} from '@material-ui/core';
import { Shoe, IShoeService, ObjectFactory, FactoryKeys } from 'business';
import { SearchInput } from '../../../shared';
import { getToken } from '../../../utilities';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) => ({
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
}));

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
    {props.shoes.map((shoe) => (
      <TableRow hover key={shoe._id}>
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

export const ProductTable = (): JSX.Element => {
  const classes = useStyles();
  const shoeService: IShoeService = ObjectFactory.getObjectInstance(FactoryKeys.IShoeService);
  const [state, setState] = useState<{
    currentPage: number;
    shoes: Shoe[];
    total: number;
    keyword: string;
  }>({
    shoes: [],
    currentPage: 0,
    total: 0,
    keyword: '',
  });

  const fetchShoes = async (keyword: string = state.keyword) => {
    const { shoes, count } = await shoeService.searchShoes(
      getToken(),
      keyword,
      state.currentPage,
    );
    setState({ ...state, shoes, total: count });
  };

  const onKeywordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const text = event.target.value;
    setState({ ...state, keyword: text, currentPage: 0 });
    fetchShoes(text);
  };

  const onChangePage = (_: any, page: number) => {
    setState({ ...state, currentPage: page });
    fetchShoes();
  };

  useEffect(() => {
    if (state.shoes.length === 0) {
      fetchShoes();
    }
  });

  return (
    <div className={classes.root}>
      <Typography variant={'h2'} className={classes.title}>
        Tất cả sản phẩm
      </Typography>
      <Card>
        <CardContent className={classes.content}>
          <SearchInput onChange={onKeywordChange} />
          <Typography variant={'body1'} className={classes.total}>
            {state.total} kết quả
          </Typography>
          <ProductTableContent shoes={state.shoes} classes={classes} />
        </CardContent>
      </Card>
      <TablePagination
        component={'div'}
        count={state.total}
        page={state.currentPage}
        onChangePage={onChangePage}
        rowsPerPageOptions={[10]}
        rowsPerPage={10}
        onChangeRowsPerPage={() => {}}
      />
      <Fab color={'primary'} aria-label={'add'} className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
};
