import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const Input = styled.input.attrs({ required: true, maxLength: 10 })`
  background-color: blue;
`;

function App() {
  return (
    <Father as='header'>
      <Input />
    </Father>
  );
}

export default App;
