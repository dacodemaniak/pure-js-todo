import { getNext, parentByTag } from './../../helpers/dom-traverser.js'

import './css/select.css'

/**
 * Transform simple HTML select / option control to a full ui select
 */

const toUi = (element) => {
  // First create a UL element in DOM
  const ul = document.createElement('ul')

  // Replace tabindex, so... it will be available for the form manager
  ul.setAttribute('tabindex', element.getAttribute('tabindex'))
  ul.setAttribute('name', element.getAttribute('name'))
  
  // Sets some CSS classes to the ul element freshly created
  ul.classList.add('ui-select')

  // Gets all option from the "original" element and create all the li corresponding
  if (element.hasChildNodes()) {
    const options = element.childNodes
    let index = 0
    options.forEach((option) => {
      if (option.nodeName === 'OPTION') {
        const li = document.createElement('li')
        // Make the first li visible : add a specific CSS class to do that
        if (index === 0) {
          li.classList.add('active')
          li.classList.add('item-selector')
        }
        // Create the option text container
        const optionTextContainer = document.createElement('div')
        optionTextContainer.classList.add('item-option')
        optionTextContainer.classList.add('text')
        optionTextContainer.textContent = option.innerHTML

        // Create the open/close icon
        const openCloseIcon = document.createElement('div')
        openCloseIcon.classList.add('item-option')
        openCloseIcon.classList.add('icon')
        openCloseIcon.classList.add('close')
        openCloseIcon.textContent = '>'

        // Set the content of the freshly li from the text content of the original option
        li.appendChild(optionTextContainer)
        li.appendChild(openCloseIcon)

        li.setAttribute('data-value', option.getAttribute('value'))

        // Then append the li as child of the ul
        ul.appendChild(li)
        
        index++
      }
    })
  }
  return ul
}

const transform = () => {
  // First take out all forms
  const forms = [...document.getElementsByTagName('form')]
  
  // Then walk though all forms to find select controls with tsk-form-control class
  forms.forEach((form) => {
    // For each form, extract only select fields
    const selectFields = [...form.getElementsByTagName('select')].filter((el) => el.classList.contains('tsk-form-control'))
    
    // Now we can really operate transformation on each selectFields found
    selectFields.forEach((select) => {
      const errorDiv = getNext(select, `[data-rel="${select.getAttribute('name')}"]`)
      const uiSelect = toUi(select)
      
      // Find parent div of this select
      const parentDiv = parentByTag(select, 'div')
      if (parentDiv) {
        parentDiv.removeChild(select)
        parentDiv.removeChild(errorDiv)
        parentDiv.appendChild(uiSelect)
        parentDiv.appendChild(errorDiv)
      }
    })
  })
}

export default transform