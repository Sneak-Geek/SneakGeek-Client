//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export type SellOrder = {
  shoeId: string;
  shoeSize?: string;
  shoeCondition?: string;
  boxCondition?: string;
  isShoeTainted?: boolean;
  isOutSoleWorn?: boolean;
  isInsoleWorn?: boolean;
  isHeavilyTorn?: boolean;
  otherDetail?: string;
  price?: number;
  sellDuration?: { duration: number; unit: string };
  shoePictures?: string[];
};
