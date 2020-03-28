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
    NewSellOrder: 'ProductNewSellOrder',
    SizeSelection: 'ProductSizeSelection',
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
      Main: 'SearchTabMain'
    },
    TransactionTab: {
      Name: 'TransactionTab',
      Main: 'TransactionTabMain'
    },
    AccountTab: {
      Name: 'AccountTab',
      Main: 'AccountTabMain',
      EditProfile: 'AccountTabEditProfile'
    }
  }
};

export default RouteNames;
