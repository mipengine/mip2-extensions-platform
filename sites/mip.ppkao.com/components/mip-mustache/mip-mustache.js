/**
 * @file Mustache template
 * @author zeloat1203@gmail.com
 */
import './index.less'

export default class MIPMustache extends MIP.CustomElement {
  build () {
    'use strict'
    // 引入html-sanitizer
    let sanitizer = require('./sanitizer')
    let mustache = require('./mustache')
    let templates = require('templates')
    let Mustache = templates.inheritTemplate()

    Mustache.prototype.cache = function (templateHTML) {
      mustache.parse(templateHTML)
    }
    Mustache.prototype.render = function (templateHTML, data) {
      let html = mustache.render(templateHTML, data)
      return sanitizer(html)
    }
    return Mustache
  }
}
