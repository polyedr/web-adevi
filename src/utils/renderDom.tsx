import * as React from 'react';

export interface IElement {
  id: string,
  key: string,
  children?: any,
}

const renderBlock = ({ id, key, children }) => (
  <div className="block" key={key} data-id={id}>
    {`block - ${id}`}
    {children || null}
  </div>
);

const renderGroup = ({ id, key, children }) => (
  <div className="group" key={key} data-id={id}>
    {`group - ${id}`}
    {children || null}
  </div>
);

const renderElem = ({ id, key, children }) => (
  <div className="el" key={key} data-id={id}>
    {`el - ${id}`}
    {children || null}
  </div>
);

export const RENDERERS = {
  block: renderBlock,
  group: renderGroup,
  elem: renderElem,
};
