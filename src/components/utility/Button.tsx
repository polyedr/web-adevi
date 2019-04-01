import * as React from 'react';

const styles = require('./styles.scss');

const validTypes = [
  'none',
  'primary',
  'confirm',
  'secondary',
];

interface IButtonProps {
  children?: any,
  type?: string,
  disabled?: boolean,
  onClick: (e: any) => void
}

const Button: React.FunctionComponent<IButtonProps> = ({
  children, type, disabled, onClick,
}) => {
  const props: any = {
    onClick,
  };

  if (!type || validTypes.indexOf(type) === -1) {
    type = 'confirm';
  }

  props.className = `${styles.button} ${styles[type]}`;

  if (disabled) props.disabled = 'disabled';

  return (
    <button type="button" {...props}>
      <span>
        {children}
      </span>
    </button>
  );
};

export default Button;
