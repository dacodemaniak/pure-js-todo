import transform from './ui/select/ui-select'
import { getNext } from './helpers/dom-traverser'

import './../css/_form.css';

/**
 * Set form fields
 */
const fields = new Map();
fields
  .set(
    'task-title',
    {
      element: document.querySelector('[name="task-title"'),
      required: true,
      message: 'Title field is required',
      tabindex: 1
    }
    
).set(
  'task-date',
  {
    element: document.querySelector('[name="task-title"'),
    required: true,
    message: 'Date field is required',
    tabindex: 2
  }
  
).set(
  'task-priority',
  {
    element: document.querySelector('[name="task-priority"'),
    required: true,
    message: 'You have to select a priority level',
    tabindex: 3
  }
)


// Toggle disabled attribute from form button
const toggleDisabledAttr = (state) => {
  state ? document.getElementById('manage-task').removeAttribute('disabled') : document.getElementById('manage-task').setAttribute('disabled', 'disabled')
}

const isDirty = (field, validateFormState) => {
  if (field.element.getAttribute('type') === 'text') {
    // Check for user input length
    if (field.element.value.toString().trim().length === 0) {
      console.log(`Text field ${field.element.getAttribute('name')} is empty`)
      return validateFormState && false
    }
  }

  if (field.element.getAttribute('type') === 'date') {
    // Check for user input length
    if (field.element.value.toString().trim().length === 0) {
      return validateFormState && false
    }

    try {
      const realDate = new Date(field.element.value)
    } catch (error) {
      return validateFormState && false
    }
  }

  // Neither text nor date... got a select HTML element
  if (field.element.selectedIndex === 0) {
    return validateFormState && false
  }
   return validateFormState
}

const validateForm = (event) => {
  // let's say that the form is correctly full filled
  let isFormValid = true

  fields.forEach((field, fieldName) => {
    // Only if the field is required
    if (field.required) {
      isFormValid = isDirty(field, isFormValid)
    }
  })
  // Then update the disabled attribut of the submit button
  toggleDisabledAttr(isFormValid)
}



const toggleErrorState = (event, hide=false) => {
  const element = event.target
  // Is element belonging to fields map ?
  const fieldName = element.getAttribute('name')
  console.log(`Field name processing : ${fieldName}`)
  const errorDiv = getNext(element, `[data-rel="${fieldName}"]`)
  if (fieldName && fields.get(fieldName)) {
    if (hide) {
      // Let's add hidden class to error div
      errorDiv.classList.add('d-none')
    } else {
      // Get the field definition from the fields collection
      const field = fields.get(fieldName)
      errorDiv.textContent = `${field.message}`
      errorDiv.classList.remove('d-none')
    }
  }
}

const todoFormManager = () => {
  transform()

  // Set events manager for keyup, change, focus and blur events
  document.getElementById('tsk-todo-form').addEventListener(
    'keyup',
    (event) => validateForm(event)
  )
  document.getElementById('tsk-todo-form').addEventListener(
    'change',
    (event) => validateForm(event)
  )
  
  // Focus and Blur on each field
  // Focus and Blur may be not available for some field control, so...
  // We need to use a workaround based on tabindex attribute
  // Specialized 'select" event for select control field

  let index = 1
  fields.forEach((field, name) => {
    const el = document.querySelector(`[tabindex="${index}"]`)
    el.addEventListener(
        'focus',
        (event) => {
          toggleErrorState(event, true)
        }
    )
    el.addEventListener(
        'blur',
        (event) => toggleErrorState(event)
    )      

    index++ 
  })
}

export default todoFormManager