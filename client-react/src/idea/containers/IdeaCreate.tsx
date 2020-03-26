import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from '../../design/styled-components';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(200, 'Too Long!')
    .required('Please enter a title'),
  description: Yup.string().required('Please enter a description'),
  difficulty: Yup.number()
    .min(1)
    .max(5)
    .required('Required')
});

export default function IdeaCreate() {
  return (
    <FormContainer>
      <Title>Use your imagination!</Title>
      <Formik
        initialValues={{
          title: '',
          description: '',
          difficulty: 1
        }}
        validationSchema={validationSchema}
        onSubmit={values => {}}
      >
        {() => (
          <StyledForm>
            <StyledInput name="title" placeholder="Title" />
            <ErrorMessage name="title" render={msg => <Error>{msg}</Error>} />
            <StyledTextArea
              name="description"
              as="textarea"
              placeholder="Description"
            />
            <ErrorMessage
              name="description"
              render={msg => <Error>{msg}</Error>}
            />
            <SubmitButton>Send</SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
  );
}

const FormContainer = styled.section`
  max-width: 700px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: Sen;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledField = styled(Field)`
  border-radius: 3px;
  border: 1px solid ${props => props.theme.color.font};
  margin-bottom: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSize.lg};
`;

const StyledInput = styled(StyledField)``;

const StyledTextArea = styled(StyledField)`
  resize: none;
  height: 15rem;
`;

const Error = styled.p`
  margin-top: -${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  color: red;
`;

const SubmitButton = styled(Button).attrs({ type: 'submit' })``;
