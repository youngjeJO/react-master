import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState('');

  const inputValue = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
    console.log(event.currentTarget.value);
  };

  const onSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('hello', value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={inputValue} type='text' placeholder='user name' />
        <button>log in</button>
      </form>
    </div>
  );
}

export default App;
