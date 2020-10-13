// Get next sibling element matching selector
const getNext = (element, selector) => {
  let el = element.nextSibling
  let compareEl = document.querySelector(selector)
  
  while (el) {
    if (el === compareEl) {
      return el
    }
    el = el.nextSibling
  }
  
  return null
}

const parentByTag = (el, tag) => {
  const parentEl = el.parentNode
  while(parentEl) {
    if (parentEl.nodeName === tag.toUpperCase()) {
      return parentEl
    }
    parentEl = parentEl.parentNode
  }
  return null
}

export const getNext = getNext
export const parentByTag = parentByTag