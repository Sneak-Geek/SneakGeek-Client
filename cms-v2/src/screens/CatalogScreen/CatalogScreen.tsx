import React from 'react';
import { Switch, Route } from 'react-router';
import { CatalogTable, CatalogEdit } from './Components';

const CatalogScreen = (): JSX.Element => {
  return (
    <div>
      <Switch>
        <Route exact path={'/catalogs'} component={CatalogTable} />
        <Route
          path={'/catalogs/:catalogId/edit'}
          render={(props: any) => <CatalogEdit {...props} isEditMode={true} />}
        />
        <Route
          path={'/catalogs/new'}
          render={(props: any) => <CatalogEdit {...props} isEditMode={false} />}
        />
      </Switch>
    </div>
  );
};

export default CatalogScreen;
