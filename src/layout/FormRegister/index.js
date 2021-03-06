import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Form from '../../components/Form';
import Input from '../../components/Inputs';

import useFormInputs from '../../hooks/useFormInputs';

import { registerInputs } from '../../constants/Inputs';
import FormBuilder from '../../helpers/FormBuilder';
import { register } from '../../store/actions/Auth';

const FormRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    formInputs,
    changeHandler,
    blurHandler,
    focusHandler,
  } = useFormInputs(registerInputs);

  const inputs = formInputs.map((input) => (
    <Input
      key={input.id}
      input={input}
      changeHandler={changeHandler}
      blurHandler={blurHandler}
      focusHandler={focusHandler}
    />
  ));

  const submitHandler = (e) => {
    e.preventDefault();

    const formBuilder = new FormBuilder(formInputs);

    if (!formBuilder.isFormValid()) return;

    dispatch(register(formBuilder.buildFormObj(), history));
  };

  return (
    <Form
      title="Register"
      subtitle="Fill all the fields to create your account"
      aditionalContent={<Link to="/login">Switch to Login</Link>}
      submitHandler={submitHandler}
    >
      {inputs}
    </Form>
  );
};

export default FormRegister;
