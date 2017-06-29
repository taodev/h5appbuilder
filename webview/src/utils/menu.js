export const MenuTree = [
  {
    id: 1000,
    icon: 'laptop',
    name: '游戏管理',
    router: '/app',
    children: [
      {
        id: 1001,
        icon: 'laptop',
        name: '微端生成',
        router: '/app/builder',
      },
    ],
  },
  {
    id: 2000,
    icon: 'file',
    name: '系统管理',
    router: '/system',
    children: [
      {
        id: 2001,
        icon: 'user',
        name: '用户管理',
        router: '/system/users',
      },
      {
        id: 2002,
        icon: 'user',
        name: '日志查看',
        router: '/system/log',
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
