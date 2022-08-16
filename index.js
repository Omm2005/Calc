


class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement) {
      this.prevOperandTextElement = prevOperandTextElement
      this.currOperandTextElement = currOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currOperand = ''
      this.prevOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currOperand = this.currOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currOperand.includes('.')) return
      this.currOperand = this.currOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currOperand === '') return
      if (this.prevOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.prevOperand = this.currOperand
      this.currOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.prevOperand)
      const current = parseFloat(this.currOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '/':
          computation = prev / current
          break
        default:
          return
      }
      this.currOperand = computation
      this.operation = undefined
      this.prevOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currOperandTextElement.innerText =
        this.getDisplayNumber(this.currOperand)
      if (this.operation != null) {
        this.prevOperandTextElement.innerText =
          `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
      } else {
        this.prevOperandTextElement.innerText = ''
      }
    }
  }
  
  
var numberButton = document.querySelectorAll("[data-number]");
var operationButton = document.querySelectorAll("[ data-operation]");
var equalButton = document.querySelector("[ data-equal]");
var deleteButton = document.querySelector("[data-delete]");
var allClearButton = document.querySelector("[data-allClear]");
var prevOperandTextElement = document.querySelector("[data-prevOperand]");
var currOperandTextElement = document.querySelector("[data-currOperand]");

var calculator = new Calculator(prevOperandTextElement , currOperandTextElement)
  
  numberButton.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
 operationButton.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })