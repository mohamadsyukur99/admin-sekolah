import { writable } from 'svelte/store'
import { buildValidator } from './validate.js'

export const createFieldValidator =(...validators)=> {
  const { subscribe, set } = writable({ dirty: false, valid: false, message: null })
  const validator = buildValidator(validators)

  const action =(node, binding)=> {
    const validate =(value, dirty)=> {
      const result = validator(value, dirty)
      set(result)
    }
    
    validate(binding, false)

    return {
      update (value) {
        validate(value, true)
      }
    }
  }

  return [ { subscribe }, action ]
}