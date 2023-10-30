import { useEffect, useMemo, useCallback, useState } from "react";
import CalciButton from "./components/CalciButton";

type CalculatorState = {
  currentOperand: string;
  previousOperand?: string;
  operation?: string;
};

function Calci() {
  const [state, setState] = useState<CalculatorState>({
    currentOperand: "Welcome",
    previousOperand: "Hello",
    operation: "",
  });

  function evaluate(state: CalculatorState) {
    const { currentOperand, previousOperand, operation } = state;
    if (previousOperand == undefined) {
      return "";
    }
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) && isNaN(current)) {
      return "";
    }
    let computation = 0;
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
    }
    return computation.toString();
  }

  const selectOperator = useCallback(
    (operand: string) => {
      if (state.currentOperand == "" && state.previousOperand == "") {
        return;
      } else if (state.currentOperand!.includes("+" || "-" || "/" || "*")) {
        return;
      } else if (state.currentOperand == "") {
        setState({ ...state, operation: operand });
      } else if (state.previousOperand == "") {
        setState({
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: "",
          operation: operand,
        });
      } else {
        setState({
          ...state,
          currentOperand: "",
          operation: operand,
          previousOperand: evaluate(state),
        });
      }
    },
    [state]
  );
  const clear = useCallback(() => {
    setState({
      ...state,
      currentOperand: "",
      previousOperand: "",
      operation: "",
    });
  }, []);

  // Use a callback to delete the last character
  const deleteCharacter = useCallback(() => {
    setState({ ...state, currentOperand: state.currentOperand.slice(0, -1) });
  }, [state.currentOperand]);

  const appendNumber = (digit: string) => {
    if (digit === "0" && state.currentOperand === "0") {
      return;
    }
    if (digit === "." && state.currentOperand!.includes(".")) {
      return;
    }
    setState({
      ...state,
      currentOperand:
        state.currentOperand === "0" ? digit : state.currentOperand + digit,
    });
  };

  useMemo(() => {
    if (
      state.currentOperand == "" ||
      state.previousOperand == "" ||
      state.operation == ""
    ) {
      return;
    }
    setState({
      ...state,
      currentOperand: evaluate(state),
      operation: "",
      previousOperand: state.currentOperand,
    });
  }, [state.currentOperand, state.previousOperand, state.operation]);
  useEffect(() => {
    state.currentOperand = "";
    state.previousOperand = "";
  }, []);

  return (
    <>
      <div className="output">
        <div className="previous-operand">
          {state.previousOperand}
          {state.operation}
        </div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={clear}>
        C
      </button>
      <CalciButton onClick={deleteCharacter} digit="DEL"></CalciButton>
      <CalciButton onClick={() => selectOperator("/")} digit="/"></CalciButton>
      <CalciButton onClick={() => selectOperator("*")} digit="*"></CalciButton>
      <button onClick={() => appendNumber("7")}>7</button>
      <button onClick={() => appendNumber("8")}>8</button>
      <button onClick={() => appendNumber("9")}>9</button>
      <button onClick={() => selectOperator("-")}>-</button>
      <button onClick={() => appendNumber("4")}>4</button>
      <button onClick={() => appendNumber("5")}>5</button>
      <button onClick={() => appendNumber("6")}>6</button>
      <button onClick={() => selectOperator("+")}>+</button>
      <button onClick={() => appendNumber("1")}>1</button>
      <button onClick={() => appendNumber("2")}>2</button>
      <button onClick={() => appendNumber("3")}>3</button>
      <button className="span-two">=</button>
      <button onClick={() => appendNumber("0")}>0</button>
      <button onClick={() => appendNumber(".")}>.</button>
    </>
  );
}

export default Calci;
