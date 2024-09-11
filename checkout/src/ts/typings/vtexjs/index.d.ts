interface VtexJs {
  /**
   * @see https://github.com/vtex/vtex.js/tree/master/docs/checkout
   */
  checkout: VtexJsCheckout
}

interface Window {
  $: JQueryStatic
  vtexjs: VtexJs
}

declare const vtexjs: VtexJs
