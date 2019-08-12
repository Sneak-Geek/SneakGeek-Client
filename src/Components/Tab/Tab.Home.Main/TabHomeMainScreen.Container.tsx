//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import { IAppState } from "../../../Store";
import { TabHomeMainScreen } from "./TabHomeMainScreen";
import { fetchShoes, displayModal } from "../../../Actions";
import { RouteNames } from "../../../Navigation";
import { Shoe } from "../../../Reducers";
import { NavigationActions } from "react-navigation";
import { ModalTypes } from "../../Modal/ModalTypes";

const mapStateToProps = (state: IAppState) => {
  return {
    shoes: state.AppContentState.shoes
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchShoes: () => dispatch(fetchShoes()),
    navigateToShoeDetail: (shoe: Shoe) => {
      const navConfig = {
        routeName: RouteNames.Tabs.HomeTab.ShoeDetailScreen,
        params: { shoe }
      };
      dispatch(NavigationActions.navigate(navConfig));
    },
    viewShoesByBrand: (brand: string) => {
      dispatch(displayModal({ modalType: ModalTypes.ShoesByBrand, data: { brand } }));
      dispatch(
        NavigationActions.navigate({
          routeName: RouteNames.Modal
        })
      );
    }
  };
};

export const TabHomeMainScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHomeMainScreen);
