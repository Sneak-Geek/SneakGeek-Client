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
} from '@material-ui/core';
import { Shoe, IShoeService, ObjectFactory, FactoryKeys } from 'business';
import { SearchInput } from '../../../shared';
import { getToken } from '../../../utilities';

const useStyles = makeStyles((theme: Theme) => ({
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
    const { shoes, count } = await shoeService.searchShoes(getToken(), keyword, 0);
    setState({ ...state, shoes, total: count });
  };

  const onSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const text = event.target.value;
    setState({ ...state, keyword: text });
    fetchShoes(text);
  };

  useEffect(() => {
    if (state.shoes.length === 0) {
      fetchShoes();
    }
  });

  return (
    <div>
      <Typography variant={'h2'} className={classes.title}>
        Tất cả sản phẩm
      </Typography>
      <Card>
        <CardContent className={classes.content}>
          <SearchInput onChange={onSearch} />
          <Typography variant={'body1'} className={classes.total}>
            {state.total} kết quả
          </Typography>
          <ProductTableContent shoes={state.shoes} classes={classes} />
        </CardContent>
      </Card>
      <TablePagination
        component={'div'}
        count={Math.ceil(state.total / 10)}
        page={state.currentPage}
        onChangePage={() => {}}
        rowsPerPageOptions={[10]}
        rowsPerPage={10}
        onChangeRowsPerPage={() => {}}
      />
    </div>
  );
};
