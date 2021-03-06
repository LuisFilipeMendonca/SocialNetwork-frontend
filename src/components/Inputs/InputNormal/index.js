import React from 'react';

import { Input } from './styled';

const InputNormal = ({ id, type, input, value, displayValue, ...rest }) => {
  return (
    <Input
      id={id}
      type={type}
      {...input}
      {...rest}
      value={type === 'file' ? displayValue : value}
    />
  );
};

export default InputNormal;
