import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button } from '../../design/styled-components';
import { Tag } from '../../shared/interfaces/tag.interface';
import * as IdeaApi from '../idea-api';
import DifficultyRatingField from '../components/DifficultyRatingField';
import IdeaTagField from '../components/IdeaTagField';
import InputField from '../../shared/form/InputField';
import TextareaField from '../../shared/form/TextareaField';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(200, 'Too Long!')
    .required('Please enter a title'),
  description: Yup.string().required('Please enter a description'),
  tags: Yup.array().required('Please select at least one tag')
});

export default function IdeaCreate() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string>('');

  async function getTagsFromApi() {
    try {
      setTags(await IdeaApi.getTags());
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    getTagsFromApi();
  }, []);

  return (
    <FormContainer>
      <Title>Use your imagination!</Title>
      <Formik
        initialValues={{
          title: '',
          description: '',
          difficulty: 1,
          tags: []
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {() => (
          <StyledForm>
            <InputField name="title" label="title" placeholder="Moderate" />
            <TextareaField
              label="description"
              name="description"
              placeholder="Describe your idea"
            />
            <DifficultyRatingField name="difficulty" />
            <IdeaTagField tags={tags} name="tags" />
            <SubmitButton>send</SubmitButton>
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

const SubmitButton = styled(Button).attrs({ type: 'submit' })`
  margin-top: ${props => props.theme.spacing.md};
  text-transform: uppercase;
`;
