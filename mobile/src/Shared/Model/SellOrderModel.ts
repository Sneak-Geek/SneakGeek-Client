//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export type Transaction = {
  shoeId: string;
  shoeSize?: string;
  shoeCondition?: string;
  boxCondition?: string;
  isShoeTainted?: boolean;
  isOutSoleWorn?: boolean;
  isInsoleWorn?: boolean;
  isHeavilyTorn?: boolean;
  otherDetail?: string;
  currentPrice?: number;
  sellDuration?: { duration: number; unit: string };
  sellDeadline?: Date;
  shoePictures?: string[];
  createdAt?: Date;
};
