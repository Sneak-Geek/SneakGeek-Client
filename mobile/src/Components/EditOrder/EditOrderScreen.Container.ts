// !
// ! Copyright (c) 2019 - SneakGeek. All rights reserved
// !

import { connect } from "react-redux";
import { EditOrderScreen } from "./EditOrderScreen";
import { IAppState } from "../../Store";
import { RouteNames } from "../../Navigation";
import { NavigationActions } from "react-navigation";
import { SellOrder } from "../../Shared/Model";

const mapStateToProps = (_state: IAppState) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  navigateToTrackingSell: (sellOrder: SellOrder) => {
    const navConfig = {
      routeName: RouteNames.TrackingSell,
      params: { sellOrder }
    };
    dispatch(NavigationActions.navigate(navConfig));
  }
});

export const EditOrderScreenContainer = connect(mapStateToProps, mapDispatchToProps)(EditOrderScreen);
