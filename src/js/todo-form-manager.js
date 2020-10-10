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
      message: 'Title field is required'
    }
    
).set(
  'task-date',
  {
    element: document.querySelector('[name="task-title"'),
    required: true,
    message: 'Date field is required'
  }
  
).set(
  'task-priority',
  {
    element: document.querySelector('[name="task-priority"'),
    required: true,
    message: 'You have to select a priority level'
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
    isFormValid = isDirty(field, isFormValid)
  })
  toggleDisabledAttr(isFormValid)
}

// Get next sibling element matching selector
const getNext = (element, selector) => {
  let el = element.nextSibling
  let compareEl = document.querySelector(selector)
  while (el) {
    console.log(`Found element ${el.nodeName}`)
    if (el === compareEl) {
      return el
    }
    el = el.nextSibling
  }
  
  return null
}

const toggleErrorState = (event, hide=false) => {
  console.log('toggleErrorState')
  const element = event.target
  // Is element belonging to fields map ?
  const fieldName = element.getAttribute('name')
  const errorDiv = getNext(element, '[class="form-error"]')
  if (fieldName && fields.get(fieldName)) {
    if (hide) {
      // Let's add hidden class to error div
      errorDiv.classList.add('d-none')
    } else {
      console.log(`Toggling error div`)
      errorDiv.textContent = 'Error was found'
      error.classList.remove('d-none')
    }
  }
}

const todoFormManager = () => {
  console.log('todoFormManager')

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
  fields.forEach((field, name) => {
    field.element.addEventListener(
      'focus',
      (event) => toggleErrorState(event, true)
    )
    field.element.addEventListener(
      'blur',
      (event) => toggleErrorState(event)
    )    
  })
  
}

export default todoFormManager