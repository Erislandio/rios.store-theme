module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'banner',
        'category',
        'checkout',
        'department',
        'footer',
        'header',
        'home',
        'landing page',
        'product',
        'search',
        'shelf',
        'shipping',
        'release',
        'hotfix',
      ],
    ],
  },
}
