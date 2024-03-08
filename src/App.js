import React from "react";
import { Dashboard, SignIn, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    // <AuthWrapper>
    <Router>
      {/* Switch는 <Route>와 일치하는 첫번째 child를 렌더링함. 따라서 전체 컴포넌트를 Switch안에 넣음*/}
      <Switch>
        {/* 대시보드 path , exact는 오직 url이 일치해야만한다는 뜻.*/}
        <PrivateRoute path="/" exact={true}>
          <Dashboard></Dashboard>
        </PrivateRoute>

        {/* 로그인 path */}
        <Route path="/login">
          <SignIn></SignIn>
        </Route>

        {/* 에러페이지 = 규정된 path가 아닌 모든경우에 적용 */}
        <Route path="*">
          <Error></Error>
        </Route>
      </Switch>
    </Router>
    // </AuthWrapper>
  );
}

export default App;
