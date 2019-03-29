import * as React from "react";
import Button from "$components/utilities/Button";
import classNames from "classnames";

const styles = require("./styles.scss");

interface IModalProps {
  title: string,
  confirmText?: string,
  cancelText?: string,
  onConfirm?: () => void,
  onClose: () => void,
  children?: any,
  confirmDisabled?: boolean
};

const Modal: React.FunctionComponent<IModalProps> = ({ title, confirmText, cancelText, onConfirm, onClose, children, confirmDisabled }) => {
  return (
    <div className={styles.modal__wrapper}>
      <div
        className={styles.modal__backdrop}
        onClick={() => onConfirm ? null : onClose()}
      />
      <div className={classNames(styles.modal__inner, cancelText || (confirmText && onConfirm) ? styles.hasActions : "")}>
        <div className={styles.modal__header}>
          <h3 className={styles.title}>
            {title}
          </h3>
          <Button
            type="none"
            onClick={() => onClose()}
          >
            <i className="material-icons">close</i>
          </Button>
        </div>
        <div className={styles.modal__body}>
          {children}
        </div>
        <div className={styles.modal__actions}>
          {
            cancelText && (
              <Button
                type="cancel"
                onClick={() => {
                  onClose();
                  return true;
                }}>
                {cancelText}
              </Button>
            )
          }
          {
            confirmText && onConfirm && (
              <Button
                type={cancelText ? `confirm` : `primary`}
                disabled={!!confirmDisabled}
                onClick={() => {
                  onConfirm && onConfirm();
                  return true;
                }}>
                {confirmText}
              </Button>
            )
          }
        </div>
      </div>
    </div>
  );
}
export default Modal;
