import React ,{ useState, Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Button from './components/Button'
import Display from './components/Display'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: '',
  values: [0, 0],
  current: 0
}



export default () => {
  
  
  const [state, setState] = useState({...initialState})

  setOperation = (operation) => {
    
     if(state.current === 0){
     setState({...state, displayValue: state.displayValue, operation, clearDisplay: true, current: 1})
     
   } else{
     const equals = operation === '='
     const values = [...state.values]
     try {
       values[0] = eval(`${values[0]} ${state.operation} ${values[1]}`)
     } catch(e){
        values[0] = state.values[0]
     }
      values[1]=0
      setState({...state, displayValue: `${values[0]}`, operation: equals ? null : operation, clearDisplay: true, current: equals ? 0 : 1, values})

   }
  }
  addDigit = (n) => {

    const clearDisplay = state.clearDisplay || state.displayValue === '0'

    if(n === '.' && !clearDisplay && state.displayValue.includes('.')){
      return
    }

    const currentValue = clearDisplay ? '' : state.displayValue 
    const displayValue = currentValue + n
    setState({...state, displayValue})
   
    
    if(n !== '.'){
      const newValue = parseFloat(displayValue)
      const values = [...state.values]
      values[state.current] = newValue
      setState({...state, displayValue, values, clearDisplay: false  })
    }
  }
  

  clearMemory = () => {
    setState({...state, ...initialState})
    
  }

  return(
    <View style={styles.container}>
        <Display value={state.displayValue} />
        <View style={styles.buttons}>
            <Button label='AC' triple onClick={this.clearMemory} />
            <Button label='/' operation onClick={f=>this.setOperation('/')} />
            <Button label='7' onClick={f=>this.addDigit('7') }/>
            <Button label='8' onClick={f=>this.addDigit('8')} />
            <Button label='9' onClick={f=>this.addDigit('9')} />
            <Button label='*' operation onClick={f=>this.setOperation('*')}/>
            <Button label='4' onClick={f=>this.addDigit('4')} />
            <Button label='5' onClick={f=>this.addDigit('5')} />
            <Button label='6' onClick={f=>this.addDigit('6')} />
            <Button label='-' operation onClick={f=>this.setOperation('-')} />
            <Button label='1' onClick={f=>this.addDigit('1')} />
            <Button label='2' onClick={f=>this.addDigit('2')} />
            <Button label='3' onClick={f=>this.addDigit('3')} />
            <Button label='+' operation onClick={f=>this.setOperation('+')} />
            <Button label='0' double onClick={f=>this.addDigit('0')} />
            <Button label='.' onClick={f=>this.addDigit('.')} />
            <Button label='=' operation onClick={f=>this.setOperation('=')} />
        </View>
    </View>
  )
   
}

