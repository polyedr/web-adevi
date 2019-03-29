import * as React from 'react';

const styles = require("./styles.scss");

const valid_types = [
  "none",
  "primary",
  "confirm",
  "secondary",
];

interface IButtonProps {
  children?: any,
  type?: string,
  disabled?: boolean,
  onClick: (e: any) => void
}

const Button: React.FunctionComponent<IButtonProps> = ({ children, type, disabled, onClick }) => {
  let props: any = {
    onClick,
  };

  if (!type || valid_types.indexOf(type) == -1) type = "confirm";

  props.className = `${ styles.button } ${ styles[type] }`;

  if (disabled) props.disabled = "disabled";

  return (
    <button { ...props }>
      <span>
        {children}
      </span>
    </button>
  );
};

export default Button;
