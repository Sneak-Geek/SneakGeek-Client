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
}));

export const ProductTable = (): JSX.Element => {
  const classes = useStyles();
  const shoeService: IShoeService = ObjectFactory.getObjectInstance(FactoryKeys.IShoeService);

  const fetchShoes = async () => {
    const { shoes, count } = await shoeService.searchShoes(getToken(), '', 0);
    setState({ ...state, shoes, total: count });
  };

  const [state, setState] = useState<{
    currentPage: number;
    shoes: Shoe[];
    total: number;
  }>({
    shoes: [],
    currentPage: 0,
    total: 0,
  });

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
          <SearchInput onChange={() => {}} />
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
            {state.shoes.map((shoe) => (
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
                  <Typography variant="body1">
                    {shoe.colorway.map((c) => (
                      <Chip
                        clickable
                        label={c}
                        key={c}
                        className={classes.chip}
                        color={'inherit'}
                      />
                    ))}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{shoe.category}</Typography>
                </TableCell>
                <TableCell className={classes.action}>
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
        </CardContent>
      </Card>
      <TablePagination
        component={'div'}
        count={state.total / 10}
        page={state.currentPage}
        onChangePage={() => {}}
        rowsPerPageOptions={[10]}
        rowsPerPage={10}
        onChangeRowsPerPage={() => {}}
      />
    </div>
  );
};
