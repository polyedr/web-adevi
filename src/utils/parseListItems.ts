import { IListScreen } from '$redux/project/reducer';

export interface ISortableItem {
  id: string,
  type: string,
  // parent: string,
  children: string[],
}

export interface IListSortable {
  [x: string]: ISortableItem
}

type FnParseList = (items?: IListScreen[], parent?: string, list?: IListSortable) => IListSortable;


const itemId = ({ id, type }) => (`${type}${id}`);
const listChildren = ({ children }) => ((children && children.map(itemId)) || []);
const itemRoot = items => ({
  type: 'root',
  id: 'root',
  children: items.map(itemId) || [],
});


export const parseList: FnParseList = (items = []) => (
  items.reduce((obj, item) => ({
    ...obj,
    [itemId(item)]: {
      id: itemId(item),
      // parent,
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
  ...parseList(items),
});


type FnParseListRevers = (items: IListSortable, parent?: string) => IListScreen[];

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
