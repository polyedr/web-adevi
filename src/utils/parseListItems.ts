import { TListElement } from '$redux/project/reducer';

export type TListItem = {
  id: string,
  type: string,
  parent: string,
  children: string[],
}

export type TList = {
  [x: string]: TListItem
}

type FnParseList = (items?: TListElement[], parent?: string, list?: TList) => TList;


const itemId = ({ id, type }) => (`${type}${id}`);
const listChildren = ({ children }) => ((children && children.map(itemId)) || []);
const itemRoot = items => ({
  parent: '-1',
  type: 'root',
  id: 'root',
  children: items.map(itemId) || [],
});


export const parseList: FnParseList = (items = [], parent = 'root') => (
  items.reduce((obj, item) => ({
    ...obj,
    [itemId(item)]: {
      id: itemId(item),
      parent,
      type: item.type,
      children: listChildren(item),
    },
    ...(
      (
        item.children && item.children.length > 0
        && parseList(item.children, itemId(item))
      ) || {}),
  }), {})
);

export const getList: FnParseList = (items = []) => ({
  root: itemRoot(items),
  ...parseList(items, 'root'),
});


type FnParseListRevers = (items: TList, parent?: string) => TListElement[];

export const getListRevers: FnParseListRevers = (listItems, parent = 'root') => (
  listItems[parent].children.map((item) => {
    if (listItems[item].children) {
      return ({
        id: Number(listItems[item].id.replace(listItems[item].type, '')),
        type: listItems[item].type,
        children: getListRevers(listItems, item),
      });
    }

    return ({
      id: Number(listItems[item].id.replace(listItems[item].type, '')),
      type: listItems[item].type,
      children: [],
    });
  })
);
