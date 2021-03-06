import { useReducer } from 'react';

const inputChangeHandler = (state, target) => {
  const updatedInputs = [...state];
  const inputIdx = updatedInputs.findIndex((input) => input.id === target.id);

  if (target.type === 'file') {
    const validatorValue = updatedInputs[inputIdx].validator(target.files);
    updatedInputs[inputIdx].isValid = validatorValue.isValid;
    updatedInputs[inputIdx].isTouched = true;

    if (!validatorValue.isValid) {
      updatedInputs[inputIdx].errorMsg = validatorValue.errorMsg;
    } else {
      updatedInputs[inputIdx].displayValue = URL.createObjectURL(
        target.files[0]
      );
      updatedInputs[inputIdx].value = { ...target.files[0] };
    }
  } else {
    updatedInputs[inputIdx].value = target.value;
  }

  return updatedInputs;
};

const inputBlurHandler = (state, target) => {
  if (target.type === 'file') return state;

  const updatedInputs = [...state];
  const inputIdx = updatedInputs.findIndex((input) => input.id === target.id);

  const validatorValue = updatedInputs[inputIdx].validator(target);

  if (!validatorValue.isValid) {
    updatedInputs[inputIdx].errorMsg = validatorValue.errorMsg;
  }

  updatedInputs[inputIdx].isValid = validatorValue.isValid;
  updatedInputs[inputIdx].isTouched = true;

  return updatedInputs;
};

const inputFocusHandler = (state, target) => {
  const updatedInputs = [...state];
  const inputIdx = updatedInputs.findIndex((input) => input.id === target.id);

  updatedInputs[inputIdx].isValid = false;
  updatedInputs[inputIdx].isTouched = false;
  updatedInputs[inputIdx].errorMsg = '';

  return updatedInputs;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return inputChangeHandler(state, action.payload);
    case 'INPUT_BLUR':
      return inputBlurHandler(state, action.payload);
    case 'INPUT_FOCUS':
      return inputFocusHandler(state, action.payload);
    default:
      return state;
  }
};

const useFormInputs = (initialInputs) => {
  const [formInputs, dispatch] = useReducer(
    reducer,
    initialInputs.map((input) => ({ ...input }))
  );

  const changeHandler = (target) =>
    dispatch({ type: 'INPUT_CHANGE', payload: target });

  const blurHandler = (target) =>
    dispatch({ type: 'INPUT_BLUR', payload: target });

  const focusHandler = (target) =>
    dispatch({ type: 'INPUT_FOCUS', payload: target });

  return { formInputs, changeHandler, blurHandler, focusHandler };
};

export default useFormInputs;
