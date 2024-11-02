import Button from '../Button/Button';
import formCss from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IoMdPersonAdd } from 'react-icons/io';
import { useId } from 'react';
import * as Yup from 'yup';
import { useMask } from '@react-input/mask';
import { addContact } from '../../redux/contactsOps';
import { useDispatch } from 'react-redux';

const testSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short name!')
    .max(50, 'Too long name!')
    .required('Name is required'),
  number: Yup.string()
    .matches(/^[+\d]?(?:[\d-.()\s]*)$/, 'Must be a valid phone number')
    .min(12, 'Number must be 10 digits long')
    .max(12, 'Number must be 10 digits long')
    .required('Phone is required'),
});

const ContactForm = () => {
  const nameId = useId();
  const numId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const { name, number } = values;
    const newContact = { name, number };
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  const inputRef = useMask({
    mask: '___-___-____',
    replacement: { _: /\d/ },
  });

  return (
    <div className={formCss.formWrapper}>
      <div className={formCss.circles}>
        <i
          className={formCss.circle}
          style={{ '--clr': 'var(--gradient-color-first)' }}
        ></i>
        <i
          className={formCss.circle}
          style={{ '--clr': 'var(--gradient-color-second)' }}
        ></i>
        <i
          className={formCss.circle}
          style={{ '--clr': 'var(--gradient-color-fourth)' }}
        ></i>
      </div>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={testSchema}
      >
        <Form className={formCss.form}>
          <label className={formCss.formLabel} htmlFor={nameId}>
            Name
          </label>
          <Field
            type="text"
            className={formCss.formInput}
            id={nameId}
            name="name"
            placeholder="Olesia V"
          ></Field>
          <ErrorMessage name="name" component="p" className={formCss.error} />

          <label className={formCss.formLabel} htmlFor={numId}>
            Number
          </label>
          <Field name="number">
            {({ field }) => (
              <input
                {...field}
                ref={inputRef}
                type="text"
                className={formCss.formInput}
                id={numId}
                placeholder="000-000-0000"
              />
            )}
          </Field>
          <ErrorMessage name="number" component="p" className={formCss.error} />
          <Button>
            <IoMdPersonAdd size="16" />
            Add contact
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
