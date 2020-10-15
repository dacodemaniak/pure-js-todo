import { getNext, parentByTag } from './../../helpers/dom-traverser.js'

import './css/select.css'

/**
 * Transform simple HTML select / option control to a full ui select
 */
const toButton = (element, parentSelect) => {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('active')
  buttonDiv.classList.add('item-selector')

  // Get content for the first select item
  const optionTextContainer = document.createElement('div')
  optionTextContainer.classList.add('item-option')
  optionTextContainer.classList.add('text')
  optionTextContainer.textContent = element.innerHTML

  // Create the open/close icon
  const openCloseIcon = document.createElement('div')
  openCloseIcon.classList.add('item-option')
  openCloseIcon.classList.add('icon')
  openCloseIcon.classList.add('close')
  openCloseIcon.textContent = '>'

  buttonDiv.appendChild(optionTextContainer)
  buttonDiv.appendChild(openCloseIcon)

  return buttonDiv
}

const toUi = (element) => {
  const ui = document.createElement('div')
  ui.setAttribute('tabindex', element.getAttribute('tabindex'))
  ui.setAttribute('name', element.getAttribute('name'))
  // Sets some CSS classes to the ul element freshly created
  ui.classList.add('ui-select')

  // Next create a UL element in DOM
  const ul = document.createElement('ul')
 
  // Gets all option from the "original" element and create all the li corresponding
  if (element.hasChildNodes()) {
    const options = element.childNodes
    let index = 0
    options.forEach((option) => {
      if (option.nodeName === 'OPTION') {
        
        // Make the first li visible : add a specific CSS class to do that
        if (index === 0) {
          ui.appendChild(toButton(option, element))
        } else {
          const li = document.createElement('li')
          // Create the option text container
          const optionTextContainer = document.createElement('div')
          optionTextContainer.classList.add('item-option')
          optionTextContainer.classList.add('text')
          optionTextContainer.textContent = option.innerHTML

          // Set the content of the freshly li from the text content of the original option
          li.appendChild(optionTextContainer)
          li.setAttribute('data-value', option.getAttribute('value'))

          // Then append the li as child of the ul
          ul.appendChild(li)
        }

        index++
      }
    })
  }
  ui.appendChild(ul)
  return ui
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
        // Replace old html structure with the new one
        parentDiv.removeChild(select)
        parentDiv.removeChild(errorDiv)
        parentDiv.appendChild(uiSelect)
        parentDiv.appendChild(errorDiv)

        // Place event listener on the button div
      }
    })
  })
}

export default transform