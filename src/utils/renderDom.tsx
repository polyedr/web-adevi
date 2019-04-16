import * as React from 'react';

export interface IElement {
  id: string,
  key: string,
  children?: any,
}

const renderBlock = ({ id, key, children }) => (
  <div className="block" key={key} data-id={id}>
    {id}
    {children || null}
  </div>
);

const renderGroup = ({ id, key, children }) => (
  <div className="group" key={key} data-id={id}>
    {id}
    {children || null}
  </div>
);

const renderElem = ({ id, key, children }) => (
  <div className="elem" key={key} data-id={id}>
    {id}
    {children || null}
  </div>
);

const renderButton = ({ id, key, children }) => (
  <div className="button" key={key} data-id={id}>
    {id}
    {children || null}
  </div>
);

export const RENDERERS = {
  block: renderBlock,
  group: renderGroup,
  elem: renderElem,
  button: renderButton,
};
