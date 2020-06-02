import React from 'react';
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  CardMedia,
} from '@material-ui/core';
import { History } from 'history';
import { Shoe } from 'business';

type Props = {
  history: History;
  isEditMode: boolean;
};

const ProductEdit = (props: Props): JSX.Element => {
  // const shoe: Shoe = props.history.state.shoe;

  return (
    <div>
      <Card>
        <CardActionArea>
          {/* <CardMedia component={'img'} alt={'Shoe image'} height={200} image={shoe.imageUrl} /> */}
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ProductEdit;
