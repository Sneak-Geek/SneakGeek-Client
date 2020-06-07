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
  IconButton,
  Icon,
} from '@material-ui/core';
import CatalogDetailDialog from './CatalogDetailDialog';

const useStyles = makeStyles(() => ({
  content: {
    padding: 0,
  },
  title: {
    marginBottom: 15,
  },
}));

const CatalogTableContent = (props: {
  catalogs: Catalog[];
  onCatalogSelected: (c: Catalog) => void;
}): JSX.Element => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Ảnh cover</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Miêu tả</TableCell>
        <TableCell>Số sản phẩm</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
    {props.catalogs.map((c) => (
      <TableRow hover key={c._id}>
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
        <TableCell>
          <IconButton>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton onClick={() => props.onCatalogSelected(c)}>
            <Icon>preview</Icon>
          </IconButton>
        </TableCell>
      </TableRow>
    ))}
  </Table>
);

const CatalogTable = (): JSX.Element => {
  const [catalogs, setCatalogs] = useState(new Array<Catalog>());
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog>();
  const [dialogVisible, setDialogVisible] = useState(false);

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
          <CatalogTableContent
            catalogs={catalogs}
            onCatalogSelected={(c: Catalog) => {
              setSelectedCatalog(c);
              setDialogVisible(true);
            }}
          />
        </CardContent>
      </Card>
      <CatalogDetailDialog
        catalog={selectedCatalog}
        isVisible={dialogVisible}
        onClose={() => setDialogVisible(false)}
      />
    </div>
  );
};

export default CatalogTable;
