export var NetworkRequestState;
(function (NetworkRequestState) {
    NetworkRequestState[NetworkRequestState["NOT_STARTED"] = 0] = "NOT_STARTED";
    NetworkRequestState[NetworkRequestState["REQUESTING"] = 1] = "REQUESTING";
    NetworkRequestState[NetworkRequestState["SUCCESS"] = 2] = "SUCCESS";
    NetworkRequestState[NetworkRequestState["FAILED"] = 3] = "FAILED";
})(NetworkRequestState || (NetworkRequestState = {}));
