export type TListItem = {
  parent: string,
  type: string,
  id: string,
  children: string[],
}

export type TList = {
  [x: string]: TListItem
}

export type TListElement = {
  id: number,
  type: string,
  children: TListElement[],
}

type FnParseList = (items?: TListElement[], parent?: string, list?: TList) => TList;


const itemId = ({ id, type }) => (`${type}${id}`);
const itemChildrens = ({ children }) => ((children && children.map(itemId)) || []);
const itemRoot = items => ({
  parent: '-1',
  type: 'root',
  id: 'root',
  children: items.map(itemId) || [],
});


export const parseList: FnParseList = (items = [], parent = 'root') => {
  const result: TList = items.reduce((obj, item) => ({
    ...obj,
    [itemId(item)]: {
      id: itemId(item),
      parent,
      type: item.type,
      children: itemChildrens(item),
    },
    ...(
      (
        item.children && item.children.length > 0
        && parseList(item.children, itemId(item))
      ) || {}),
  }), {});

  return result;
};

export const getList: FnParseList = (items = []) => ({
  root: itemRoot(items),
  ...parseList(items, 'root'),
});
