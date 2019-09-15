//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export type Shoe = {
  _id: string;
  brand: string;
  category: string;
  colorway: string[];
  name: string;
  description?: string;
  imageUrl?: string;
  shoe: string;
  urlKey: string;
  title: string;

  // indexing Shoe purpose only
  [key: string]: any;
};
