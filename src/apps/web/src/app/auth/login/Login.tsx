import { Helmet } from 'react-helmet-async';
import { PageLogin } from '@pages';

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>

      <PageLogin />
    </>
  );
}
