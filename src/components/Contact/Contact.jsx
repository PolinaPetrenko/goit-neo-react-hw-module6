import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import styles from "./Contact.module.css";
import { FaPhoneAlt, FaUser } from "react-icons/fa";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <li className={styles.contactItem}>
      <div className={styles.contactData}>
        <span className={styles.contactName}>
          <FaUser className={styles.contactIcon} /> {name}
        </span>
        <span className={styles.contactNumber}>
          <FaPhoneAlt className={styles.phoneIcon} /> {number}
        </span>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
