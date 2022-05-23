import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Sun = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
`;

const Circle = styled(Sun)`
  border-radius: 50px;
`;

function App() {
  return (
    <Father>
      <Sun bgColor='teal'>
        <Text>hello</Text>
      </Sun>
      <Sun bgColor='tomato'>
        <Text>world</Text>
      </Sun>
      <Circle bgColor='gray'></Circle>
    </Father>
  );
}

export default App;
