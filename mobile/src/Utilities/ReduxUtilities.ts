//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export function pending(action: string | object) {
  return `${action}_PENDING`;
}

export function fulfilled(actionName: string | object) {
  return `${actionName}_FULFILLED`;
}

export function rejected(actionName: string | object) {
  return `${actionName}_REJECTED`;
}
