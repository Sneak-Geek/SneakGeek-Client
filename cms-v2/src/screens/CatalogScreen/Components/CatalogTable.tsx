import React, { useState, useEffect } from 'react';
import { Catalog, ObjectFactory, FactoryKeys, ICatalogService } from 'business';
import { getToken } from '../../../utilities';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Card,
  CardContent,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  content: {
    padding: 0,
  },
  title: {
    marginBottom: 15,
  },
}));

const CatalogTable = (): JSX.Element => {
  const [catalogs, setCatalogs] = useState(new Array<Catalog>());

  const fetchCatalogs = async () => {
    const catalogService = ObjectFactory.getObjectInstance<ICatalogService>(
      FactoryKeys.ICatalogService,
    );
    const token = getToken();
    const catalogs = await catalogService.getAllCatalogs(token);
    if (catalogs) {
      setCatalogs(catalogs);
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Typography variant={'h2'} className={classes.title}>
        Tất cả catalog
      </Typography>
      <Card>
        <CardContent className={classes.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ảnh đại diện</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Miêu tả</TableCell>
                <TableCell>Tổng sản phẩm</TableCell>
              </TableRow>
            </TableHead>
            {catalogs.map((c) => (
              <TableRow key={c._id}>
                <TableCell>
                  <Avatar src={c.coverImage} variant={'square'} sizes={'large'} />
                </TableCell>
                <TableCell>
                  <Typography variant={'body1'}>{c.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant={'body1'}>{c.description}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant={'body1'}>{c.products.length}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CatalogTable;
