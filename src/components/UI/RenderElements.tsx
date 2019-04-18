import * as React from 'react';

export interface IElement {
  key: string,
  id: string,
  children?: any,
}

type TRenderElement = (args: IElement) => React.ReactNode;

const renderBlock: TRenderElement = ({ id, key, children }) => (
  <div className="block" key={key} data-id={id}>
    {id}
    {children || null}
  </div>
);

const renderGroup: TRenderElement = ({ id, key, children }) => (
  <div className="group" key={key} data-id={id}>
    {id}
    {children || null}
  </div>
);

const renderElem: TRenderElement = ({ id, key, children }) => (
  <div className="elem" key={key} data-id={id}>
    {id}
    {children || null}
  </div>
);

const renderButton: TRenderElement = ({ id, key, children }) => (
  <button
    key={key}
    className="button"
    data-id={id}
    type="button"
  >
    Button
    {children || null}
  </button>
);

const renderHyperLine: TRenderElement = ({ id, key, children }) => (
  <a
    key={key}
    className="hyperLink"
    data-id={id}
    href="javascript:void(0);"
  >
    HyperLink
    {children || null}
  </a>
);

const renderInput: TRenderElement = ({ id, key, children }) => (
  <div
    key={key}
    data-id={id}
    className="input"
  >
    <input type="text" placeholder="input" />
    {children || null}
  </div>
);

export const RENDERERS = {
  block: renderBlock,
  group: renderGroup,
  elem: renderElem,
  button: renderButton,
  input: renderInput,
  hyperLine: renderHyperLine,
};
