import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact, selectContacts } from "../../redux/contactsSlice";
import styles from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]+$/, "Only letters are allowed")
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^[0-9]{3}-[0-9]{2}-[0-9]{2}$/, "Format: 000-00-00")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    if (
      contacts.some(
        (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      alert(`${values.name} is already in contacts!`);
      return;
    }

    dispatch(addContact({ id: nanoid(), ...values }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label htmlFor="name">Name</label>
        <Field type="text" id="name" name="name" className={styles.input} />
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label htmlFor="number">Phone number</label>
        <Field type="text" id="number" name="number" className={styles.input} />
        <ErrorMessage name="number" component="div" className={styles.error} />

        <button type="submit" className={styles.submitButton}>
          Add to contacts
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
