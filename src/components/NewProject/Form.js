import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import _ from 'lodash';

const projectEnumsQuery = gql`
  query projectEnumsQuery {
    danmakufuVersions: __type(name: "DanmakufuVersionEnum"){
      enumValues {
        name
        description
      }
    }
    categories: __type(name: "CategoryEnum"){
      enumValues {
        name
        description
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewProjectForm = ({
  isSubmitting,
  uploading,
}) => {
  const { data } = useQuery(projectEnumsQuery);
  const classes = useStyles();

  const danmakufuVersions = _.get(data, 'danmakufuVersions.enumValues', []);
  const categories = _.get(data, 'categories.enumValues', []);

  return (
    <Form className={classes.form}>
      <Field
        label="Title"
        name="title"
        component={TextField}
        required
      />

      <Field
        label="Description"
        name="description"
        multiline
        component={TextField}
      />

      <Field
        label="Category"
        select
        name="category"
        component={TextField}
      >
        {
          _.map(categories, version => (
            <MenuItem key={version.name} value={version.name}>
              {version.description}
            </MenuItem>
          ))
        }
      </Field>

      <Field
        label="Danmakufu Version"
        select
        name="danmakufuVersion"
        component={TextField}
      >
        {
          _.map(danmakufuVersions, version => (
            <MenuItem key={version.name} value={version.name}>
              {version.description}
            </MenuItem>
          ))
        }
      </Field>

      <Field
        label="signedBlobId"
        name="signedBlobId"
        type="hidden"
      />

      <Button
        variant="contained"
        color="primary"
        disabled={isSubmitting || uploading}
        type="submit"
        className={classes.submit}
        fullWidth
      >
        Create
      </Button>
    </Form>
  );
};

NewProjectForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  uploading: PropTypes.bool.isRequired,
};

export default NewProjectForm;
