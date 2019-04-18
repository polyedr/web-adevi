interface IOptions {
  label: string,
  value: string,
};

export const optionsUIMenu: IOptions[] = [
  { label: 'Block', value: 'block' },
  { label: 'Group', value: 'group' },
  { label: 'Element', value: 'elem' },
  { label: 'Input', value: 'input' },
  { label: 'Button', value: 'button' },
  { label: 'HyperLine', value: 'hyperLine' },
  // { label: 'Text', value: 'text' },
  // { label: 'RadioButton', value: 'radioButton' },
  // { label: 'Checkbox', value: 'checkbox' },
  // { label: 'Sign in', value: 'signIn' },
  // { label: 'Sign up', value: 'signUp' },
  // { label: '+Custom', value: 'custom' },
];
