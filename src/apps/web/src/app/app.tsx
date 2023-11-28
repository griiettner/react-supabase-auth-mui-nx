import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useAuth } from '@hooks';
import { Router } from '@routes';


const StyledApp = styled.div`
  // Your style here
`;

export function App() {
//   const { dispatch, ...state } = useAuth();
// console.log('rest', state);
//   useEffect(() => {
//     dispatch.login({ email: 'paulo@nited.ai', password: '123456' });
//   }, []);

//   useEffect(() => {
//     dispatch.session();
//   }, []);

  return (
    <StyledApp>
      {/* {state?.data?.user && (
        <button onClick={dispatch.logout}>Logout</button>
      )}*/}
      <Router />
    </StyledApp>
  );
}

export default App;
