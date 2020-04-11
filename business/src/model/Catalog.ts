import { Shoe } from "./Shoe";

export type Catalog = {
  showOnHomepagePriority: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
<<<<<<< HEAD
  products: Shoe[];
  coverImage?: string;
||||||| merged common ancestors
  products: Shoe[];
=======
  products: Shoe[] | string[];
>>>>>>> Implement fucntion to update authorization transaction status
};
