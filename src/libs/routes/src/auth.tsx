import { PageLogin } from "@pages";
import { LayoutAuth } from "@layouts";
import { paths } from "@config";

const { login, register, passwordReset } = paths.auth;

export const authRoutes = [
  {
    path: login,
    element: (
      <LayoutAuth
        title="auth.login.title"
        buttonText="Login"
        fetchApi="login"
        linkLeftLabel="Forgot password?"
        linkLeftPath={passwordReset}
        linkRightLabel="Register"
        linkRightPath={register}
      >
        <PageLogin />
      </LayoutAuth>
    ),
  },
];
