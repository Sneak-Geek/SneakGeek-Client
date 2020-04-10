const RouteNames = {
  Auth: {
    Name: 'Authentication',
    AuthCheck: 'AuthCheck',
    Login: 'Login',
    EmailSignUp: 'EmailSignUp',
    EmailLogin: 'EmailLogin',
    ForgotPassword: 'ForgotPassword',
  },
  Product: {
    Name: 'Product',
    ProductDetail: 'ProductDetail',
    NewReview: 'ProductNewReview',
    AllReviews: 'ProductAllReviews',
  },
  Order: {
    Name: 'Order',
    NewSellOrder: 'NewSellOrder',
    SizeSelection: 'OrderSizeSelection',
    BuyConfirmation: 'OrderBuyConfirmation',
    Payment: 'OrderPayment',
  },
  Tab: {
    Name: 'Tabs',
    HomeTab: {
      Name: 'HomeTab',
      Main: 'HomeTabMain',
      SeeMore: 'HomeTabSeeMore'
    },
    SearchTab: {
      Name: 'SearchTab',
      Main: 'SearchTabMain',
      ProductRequest: 'ProductRequest'
    },
    TransactionTab: {
      Name: 'TransactionTab',
      Main: 'TransactionTabMain',
      Buy: 'TransactionBuyOrder',
      Sell: 'TransactionSellOrder',
      Detail: 'TransactionDetail'
    },
    AccountTab: {
      Name: 'AccountTab',
      Main: 'AccountTabMain',
      EditProfile: 'AccountTabEditProfile'
    }
  }
};

export default RouteNames;
