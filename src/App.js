import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [evalString, setEvalString] = useState('');
  const [currentOperation, setCurrentOperation] = useState('');
  const [negative, setNegative] = useState(false);

  const handleNumber = (value) => {
    console.log(value);
    if (
      currentOperation === 'NaN' ||
      currentOperation === 'Infinity' ||
      currentOperation === '-Infinity'
    ) {
      setEvalString('');
      setCurrentOperation(value);
      return;
    }

    if (negative === true && value === '0' && currentOperation.length === 2) {
      return;
    }

    if (
      currentOperation.length === 1 &&
      currentOperation[0] === '0' &&
      value === '0'
    ) {
      return;
    }
    if (
      currentOperation.length === 1 &&
      currentOperation[0] === '0' &&
      value !== '0'
    ) {
      setCurrentOperation(value);
      return;
    }
    setCurrentOperation(currentOperation + value);
  };

  const handleEvaluate = () => {
    const numArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (currentOperation.length === 0 || evalString.length === 0) {
      return;
    }
    if (evalString[evalString.length - 1] === '=') {
      return;
    }

    if (negative === true) {
      let ans = 0;
      if (currentOperation[currentOperation.length - 1] === '-') {
        ans = eval(evalString + currentOperation + '1)');
        setEvalString(evalString + currentOperation + '1)' + '=');
      } else {
        ans = eval(evalString + currentOperation + ')');
        setEvalString(evalString + currentOperation + ')' + '=');
      }
      setCurrentOperation(ans.toString());
      setNegative(false);
      return;
    }
    const ans = eval(evalString + currentOperation);
    setEvalString(evalString + currentOperation + '=');
    setCurrentOperation(ans.toString());
    console.log(ans);
  };

  const handleMathOperation = (value) => {
    console.log(value);
    if (
      currentOperation === 'NaN' ||
      currentOperation === 'Infinity' ||
      currentOperation === '-Infinity'
    ) {
      setEvalString('');
      setCurrentOperation('');
      return;
    }
    if (evalString[evalString.length - 1] === '=') {
      setEvalString(currentOperation + value);
      setCurrentOperation('');
      return;
    }
    if (currentOperation.length === 0) {
      return;
    }
    if (negative === true) {
      if (currentOperation[currentOperation.length - 1] === '-') {
        setEvalString(evalString + currentOperation + '1)' + value);
      } else {
        setEvalString(evalString + currentOperation + ')' + value);
      }
      setCurrentOperation('');
      setNegative(false);
      return;
    }
    setEvalString(evalString + currentOperation + value);
    setCurrentOperation('');
  };

  const handlePoint = () => {
    console.log('.');
    if (currentOperation.length === 0) {
      setCurrentOperation('0.');
      return;
    }
    if (currentOperation.includes('.')) {
      return;
    }
    if (negative === true && currentOperation.length === 2) {
      setCurrentOperation(currentOperation + '0.');
      return;
    }
    setCurrentOperation(currentOperation + '.');
  };

  const handleClear = () => {
    console.log('clear');
    setEvalString('');
    setCurrentOperation('0');
  };

  const handleBack = () => {
    console.log('back');
    if (currentOperation.length === 0) {
      return;
    }
    if (negative === true && currentOperation.length === 2) {
      setCurrentOperation('');
      setNegative(false);
      return;
    }
    setCurrentOperation(currentOperation.slice(0, -1));
  };

  const handleKeyEvent = (e) => {
    e.preventDefault();
    const key = e.key;
    if (
      key === '1' ||
      key === '2' ||
      key === '3' ||
      key === '4' ||
      key === '5' ||
      key === '6' ||
      key === '7' ||
      key === '8' ||
      key === '9' ||
      key === '0'
    )
      handleNumber(key);
    if (key === '+' || key === '-' || key === '*' || key === '/')
      handleMathOperation(key);
    if (key === '.') handlePoint();
    if (key === 'Enter') handleEvaluate();
    if (key === ' ') handleClear();
    if (key === 'Backspace') handleBack();
    //console.log(e.keyCode);
    //console.log(key);
  };

  const handleNegative = () => {
    console.log('negative');

    if (
      currentOperation.length !== 0 &&
      (currentOperation[currentOperation.length - 1] === '0' ||
        currentOperation[currentOperation.length - 1] === '1' ||
        currentOperation[currentOperation.length - 1] === '2' ||
        currentOperation[currentOperation.length - 1] === '3' ||
        currentOperation[currentOperation.length - 1] === '4' ||
        currentOperation[currentOperation.length - 1] === '5' ||
        currentOperation[currentOperation.length - 1] === '6' ||
        currentOperation[currentOperation.length - 1] === '7' ||
        currentOperation[currentOperation.length - 1] === '8' ||
        currentOperation[currentOperation.length - 1] === '9' ||
        currentOperation[currentOperation.length - 1] === ')' ||
        (currentOperation[currentOperation.length - 1] === '-' &&
          currentOperation[currentOperation.length - 2] === '(') ||
        currentOperation === 'NaN' ||
        currentOperation === 'Infinity' ||
        currentOperation === '-Infinity')
    ) {
      return;
    }
    setCurrentOperation(currentOperation + '(-');
    setNegative(true);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
    };
  }, [currentOperation, evalString]);

  return (
    <div className='App'>
      <div className='calculator'>
        <div className='calculator-display' id='display'>
          <div className='calculator-display-eval'>{evalString}</div>
          <div className='calculator-display-current'>{currentOperation}</div>
        </div>
        <div className='button-area'>
          <button id='clear' value='AC' onClick={() => handleClear()}>
            AC
          </button>
          <button id='clear' value='AC' onClick={() => handleClear()}></button>
          <button id='back' value='<=' onClick={() => handleBack()}>
            {'<='}
          </button>
          <button
            id='divide'
            value='/'
            onClick={(e) => handleMathOperation(e.target.value)}
          >
            /
          </button>
          <button
            id='seven'
            value='7'
            onClick={(e) => handleNumber(e.target.value)}
          >
            7
          </button>
          <button
            id='eight'
            value='8'
            onClick={(e) => handleNumber(e.target.value)}
          >
            8
          </button>
          <button
            id='nine'
            value='9'
            onClick={(e) => handleNumber(e.target.value)}
          >
            9
          </button>
          <button
            id='multiply'
            value='*'
            onClick={(e) => handleMathOperation(e.target.value)}
          >
            *
          </button>
          <button
            id='four'
            value='4'
            onClick={(e) => handleNumber(e.target.value)}
          >
            4
          </button>
          <button
            id='five'
            value='5'
            onClick={(e) => handleNumber(e.target.value)}
          >
            5
          </button>
          <button
            id='six'
            value='6'
            onClick={(e) => handleNumber(e.target.value)}
          >
            6
          </button>
          <button
            id='subtract'
            value='-'
            onClick={(e) => handleMathOperation(e.target.value)}
          >
            -
          </button>

          <button
            id='one'
            value='1'
            onClick={(e) => handleNumber(e.target.value)}
          >
            1
          </button>
          <button
            id='two'
            value='2'
            onClick={(e) => handleNumber(e.target.value)}
          >
            2
          </button>
          <button
            id='three'
            value='3'
            onClick={(e) => handleNumber(e.target.value)}
          >
            3
          </button>
          <button
            id='add'
            value='+'
            onClick={(e) => handleMathOperation(e.target.value)}
          >
            +
          </button>
          <button id='negative' value='+-' onClick={() => handleNegative()}>
            {'+-'}
          </button>

          <button
            id='zero'
            value='0'
            onClick={(e) => handleNumber(e.target.value)}
          >
            0
          </button>
          <button id='decimal' value='.' onClick={() => handlePoint()}>
            .
          </button>
          <button id='equals' value='=' onClick={() => handleEvaluate()}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
