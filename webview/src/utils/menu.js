export const MenuTree = [
  {
    id: 1000,
    icon: 'laptop',
    name: '微端生成',
    router: '/builder',
  },
  {
    id: 2000,
    icon: 'system',
    name: '系统管理',
    children: [
      {
        id: 2001,
        icon: 'user',
        name: '用户管理',
      },
      {
        id: 2002,
        icon: 'system',
        name: '日志查看',
      },
    ],
  },
];

export function queryMenuNode(tree, id) {
  for (let i = 0; i < tree.length; i += 1) {
    const item = tree[i];

    if (item.id === id) {
      return {
        id: item.id,
        icon: item.icon,
        name: item.name,
        router: item.router,
        child: null,
      };
    }

    if (item.children && item.children.length) {
      const childNode = queryMenuNode(item.children, id);
      if (childNode != null) {
        return {
          id: item.id,
          icon: item.icon,
          name: item.name,
          router: item.router,
          child: childNode,
        };
      }
    }
  }

  return null;
}
