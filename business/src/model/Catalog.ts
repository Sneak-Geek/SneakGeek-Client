import { Shoe } from "./Shoe";

export type Catalog = {
  showOnHomepagePriority: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  products: Shoe[];
  coverImage?: string;
};
