module.exports = {
  extends: 'vtex',
  root: true,
  env: {
    node: true,
    browser: true,
  },
  globals: {
    window: true,
    $: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
}
