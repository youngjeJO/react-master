import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  font-size: 24px;
  color: ${(props) => props.theme.textColor};
`;

interface StateInterface {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<{ coinId: string }>();
  const state = useLocation().state as StateInterface;

  console.log(state.name);

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'not found'}</Title>
      </Header>
      {loading ? <Loader>loading</Loader> : null}
    </Container>
  );
}

export default Coin;
