var assert = require('assert')

var el = require('./')

assert.equal(el('img', {
  src: 'img.jpg',
  alt: ''
}), '<img src="img.jpg" alt="">')

assert.equal(el('img', {
  class: {
    yes: 'yes',
    no: false
  },
  src: 'img.jpg',
  alt: ''
}), '<img class="yes" src="img.jpg" alt="">')

assert.equal(el('a', {
  class: [
    'a',
    'b',
    'c'
  ],
  href: '#',
  title: ''
}), '<a class="a b c" href="#" title=""></a>')

console.log('Tests pass!')