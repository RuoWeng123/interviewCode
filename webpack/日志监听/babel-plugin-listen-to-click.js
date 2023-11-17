// babel-plugin-listen-to-click.js
module.exports = function (babel) {
  const { types: t } = babel;

  return {
    visitor: {
      JSXElement(path, { opts }) {
        // 获取插件参数
        const options = opts[0] || {};

        // 遍历每个传递的规则
        options.forEach(rule => {
          if (rule.type === 'el' && path.node.openingElement.name.name === rule.value) {
            // 对指定元素添加 onclick 事件监听
            path.node.openingElement.attributes.push({
              type: 'JSXAttribute',
              name: {
                type: 'JSXIdentifier',
                name: 'onclick',
              },
              value: {
                type: 'JSXExpressionContainer',
                expression: {
                  type: 'StringLiteral',
                  value: 'console.log("Element clicked")',
                },
              },
            });
          } else if (rule.type === 'class') {
            // 对指定类名的元素添加 onclick 事件监听
            const classNameAttribute = path.node.openingElement.attributes.find(
              attr => attr.name.name === 'className'
            );

            if (classNameAttribute && classNameAttribute.value.value === rule.value) {
              path.node.openingElement.attributes.push({
                type: 'JSXAttribute',
                name: {
                  type: 'JSXIdentifier',
                  name: 'onclick',
                },
                value: {
                  type: 'JSXExpressionContainer',
                  expression: {
                    type: 'StringLiteral',
                    value: 'console.log("Element clicked")',
                  },
                },
              });
            }
          }
        });
      },
    },
  };
};
