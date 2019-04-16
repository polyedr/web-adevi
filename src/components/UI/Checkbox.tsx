import * as React from 'react';

const styles = require('./styles.scss');

interface ICheckbox {
  name: string,
  label?: string,
  disabled?: boolean,
  onChange: (event) => void,
}

let Ceckbox = (props: ICheckbox) => {
  const { name, label, onChange } = props;

  return (
    <label
      className={styles.checkbox}
      htmlFor={name}
    >
      <input
        name={name}
        type="checkbox"
        onChange={onChange}
      />
      <span>
        {label}
      </span>
    </label>
  );
};

export default Ceckbox = React.memo(Ceckbox);
