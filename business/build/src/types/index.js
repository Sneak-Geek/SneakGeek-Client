//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
export var ApiRequestState;
(function (ApiRequestState) {
    ApiRequestState[ApiRequestState["NOT_STARTED"] = 0] = "NOT_STARTED";
    ApiRequestState[ApiRequestState["REQUESTING"] = 1] = "REQUESTING";
    ApiRequestState[ApiRequestState["SUCCESS"] = 2] = "SUCCESS";
    ApiRequestState[ApiRequestState["CANCELED"] = 3] = "CANCELED";
    ApiRequestState[ApiRequestState["FAILED"] = 4] = "FAILED";
})(ApiRequestState || (ApiRequestState = {}));
