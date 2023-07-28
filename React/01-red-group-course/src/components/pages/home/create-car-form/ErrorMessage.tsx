import React, {FC} from 'react';
import styles from "./CreateCarForm.module.scss";

const ErrorMessage: FC<{error?: string}> = ({error}) => {
    if (!error) return null
    return (<p className={styles.error}>Name is required</p>);
};

export default ErrorMessage;
