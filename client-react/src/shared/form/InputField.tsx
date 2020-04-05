import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { Error, StyledField, StyledLabel } from '../../design/styled-components';

type Props = { label: string; name: string } & InputHTMLAttributes<HTMLInputElement>;
export default function InputField({ label, name, ...props }: Props) {
  const [field, meta] = useField(name);

  return (
    <>
      <StyledLabel htmlFor={name} spaceBottom>
        {label}
      </StyledLabel>
      <StyledInput {...field} {...props} />
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </>
  );
}

const StyledInput = styled.input`
  ${StyledField};
`;
