import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// 로그인 된 상태에서만 보여지도록 하는 Private라우트 컴포넌트
// 첫번째로 children props를 가져오고, 나머지매개변수로 나머지 모든 props를 컴포넌트로 가져옴
// App.js에서 PrivateRoute 하위에 들어가는 것은 Dashboard이므로 children은 Dashboard.
const PrivateRoute = ({ children, ...rest }) => {
  // const isUser = false;
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  return (
    <Route
      {...rest}
      render={() => {
        // 삼항연산자, isUser가 true일 경우, 대시보드화면으로, false일 경우 login페이지로 리다이렉트
        return isUser ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
