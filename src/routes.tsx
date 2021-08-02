import { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NewBet } from "./pages/NewBet";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
import { Recovery } from "./pages/Recovery";

import { authActions } from "./store/auth";

type RootState = {
  auth: {
    isLoggedIn: boolean;
  };
};

type LoginType = {
  email?: string | null;
  password?: string | null;
};

export function Routes({ email, password }: LoginType) {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  email = localStorage.getItem("email");
  password = localStorage.getItem("password");

  const userVerified = email && password;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function autoLogin() {
    if (userVerified) dispatch(authActions.login({ email, password }));
  }

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return (
    <>
      <Switch>
        {isLoggedIn && (
          <>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/reset_password" component={ResetPassword} />
            <Route path="/new_bet" component={NewBet} />
            <Route path="/dashboard" component={Dashboard} />
          </>
        )}
        
        <Route path="/recovery" component={Recovery} />

        {location.pathname !== "/reset_password" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/" ? (
          <Route path="/*">Conteudo indisponivel</Route>
        ) : (
          <>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/reset_password" component={ResetPassword} />
            <Route path="/register" component={Register} />
          </>
        )}
      </Switch>
    </>
  );
}
