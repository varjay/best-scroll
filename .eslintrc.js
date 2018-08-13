module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  //采用recommended的配置，采用vue文件的插件，essential模式
  extends:  [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  //使用babel-eslint
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2016,
    sourceType: 'module'
  },
  // 可以在rules添加自定义规则
  rules: {
    // 第一个值为类型，0为取消，1为warn，2为error
    // 缩进为2个空格
    indent: ['error', 2],
    // 使用单引号
    quotes: ['error', 'single'],
    // 结尾从不加分号
    semi: ['error', 'never'],
    // 只能使用'==='
    eqeqeq: ['error', 'always'],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-unused-vars': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
