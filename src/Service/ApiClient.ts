//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import axios from "axios";

const ApiClient = axios.create({
  baseURL: __DEV__ ? `http://192.168.0.12:3000/api/v1` : "http://13.58.201.133:8080/api/v1/",
  timeout: 10000
});

export default ApiClient;
