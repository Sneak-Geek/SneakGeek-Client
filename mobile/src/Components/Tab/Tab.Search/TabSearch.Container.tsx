//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { connect } from "react-redux";
import TabSearch from "./TabSearch";
import { IAppState } from "../../../Store";
import { NavigationActions } from "react-navigation";
import { RouteNames } from "../../../Navigation";
import { Shoe } from "../../../Reducers";
import { searchShoes } from "../../../Actions";

const mapStateToProps = (state: IAppState) => {
  return {
    shoes: state.AppContentState.shoes,
    searchResult: state.AppContentState.shoesSearchResult
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  onShoeClick: (isForSell: boolean, shoe: Shoe) => {
    const navAction = NavigationActions.navigate({
      routeName: isForSell ? RouteNames.SellDetail : RouteNames.ShoeDetail,
      params: isForSell ? { shoeForSell: shoe } : { shoe }
    });
    dispatch(navAction);
  },
  search: (keyword: string) => {
    dispatch(searchShoes(keyword));
  }
});

export const TabSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabSearch);
