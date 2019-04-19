import * as React from 'react';
import classNames from 'classnames';

const styles = require('./styles.scss');

type IOptions = {
  name: string,
  label: string,
  value: number,
  disabled?: boolean,
}

interface IRadioButton {
  name: string,
  value: any,
  options: IOptions[],
  label?: string,
  disabled?: boolean,
  onChange: (e) => void,
}

const RadioButtons: React.FunctionComponent<IRadioButton> = (props) => {
  const {
    value, name, onChange, label, options, disabled = false,
  } = props;

  return (
    <div className={classNames(styles.radiobuttonGroup, label ? styles.hasLabel : '', disabled ? styles.disabled : '')}>
      {label && (
        <span className="label">
          { label }
        </span>
      )}
      {options.map((o:IOptions) => (
        <label key={o.name} htmlFor={o.name}>
          <input
            type="radio"
            value={o.value}
            name={name}
            id={o.name}
            checked={value === o.value}
            onChange={onChange}
            disabled={(o.disabled || disabled)}
          />
          <span>
            { o.label }
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
