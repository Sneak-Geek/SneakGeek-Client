const RouteNames = {
  Auth: {
    Name: 'Authentication',
    Login: 'Login',
    EmailSignUp: 'EmailSignUp',
    EmailLogin: 'EmailLogin',
    ForgotPassword: 'ForgotPassword',
  },
  Product: {
    Name: 'Product',
    ProductDetail: 'ProductDetail',
    NewReview: 'ProductNewReview',
    AllReviews: 'ProductAllReviews'
  },
  Tab: {
    Name: 'Tabs',
    HomeTab: {
      Name: 'HomeTab',
      Main: 'HomeTabMain',
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
