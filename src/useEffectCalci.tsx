import { useReducer, useEffect, useMemo } from "react";

type CalculatorState = {
  currentOperand: string;
  previousOperand?: string;
  operation?: string;
};

type CalculatorAction =
  | { type: "APPEND_NUMBER"; payload: string }
  | { type: "SET_OPERATOR"; payload: string }
  | { type: "CALCULATE_RESULT" }
  | { type: "CLEAR" }
  | { type: "DELETE" };

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
) => {
  switch (action.type) {
    case "APPEND_NUMBER":
      if (action.payload === "0" && state.currentOperand === "0") {
        return state;
      }
      if (action.payload === "." && state.currentOperand!.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand:
          state.currentOperand === "0"
            ? action.payload
            : state.currentOperand + action.payload,
      };
    case "SET_OPERATOR":
      if (state.currentOperand == "" && state.previousOperand == "") {
        return state;
      }
      if (state.currentOperand!.includes("+" || "-" || "/" || "*")) {
        return state;
      }
      if (state.currentOperand == "") {
        return {
          ...state,
          operation: action.payload,
        };
      }
      if (state.previousOperand == "") {
        return {
          ...state,
          currentOperand: "",
          previousOperand: state.currentOperand,
          operation: action.payload,
        };
      }
      return {
        ...state,
        currentOperand: "",
        operation: action.payload,
        previousOperand: evaluate(state),
      };
    case "CALCULATE_RESULT":
      if (
        state.currentOperand == "" ||
        state.previousOperand == "" ||
        state.operation == ""
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        operation: "",
        previousOperand: "",
      };
    case "CLEAR":
      return {
        ...state,
        currentOperand: "",
        previousOperand: "",
        operation: "",
      };
    case "DELETE":
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    default:
      return state;
  }
};

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

function Calci() {
  const [state, dispatch] = useReducer(calculatorReducer, {
    currentOperand: "",
    previousOperand: "",
    operation: "",
  });
  let result = "";
  useEffect(() => {}, [state]);

  return (
    <>
      <div className="output">
        <div className="previous-operand">
          {state.previousOperand}
          {state.operation}
        </div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: "CLEAR" })}>
        C
      </button>
      <button onClick={() => dispatch({ type: "DELETE" })}>Del</button>
      <button onClick={() => dispatch({ type: "SET_OPERATOR", payload: "/" })}>
        /
      </button>
      <button onClick={() => dispatch({ type: "SET_OPERATOR", payload: "*" })}>
        *
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "7" })}>
        7
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "8" })}>
        8
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "9" })}>
        9
      </button>
      <button onClick={() => dispatch({ type: "SET_OPERATOR", payload: "-" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "4" })}>
        4
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "5" })}>
        5
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "6" })}>
        6
      </button>
      <button onClick={() => dispatch({ type: "SET_OPERATOR", payload: "+" })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "1" })}>
        1
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "2" })}>
        2
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "3" })}>
        3
      </button>
      <button
        className="span-two"
        onClick={() => dispatch({ type: "CALCULATE_RESULT" })}
      >
        =
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "0" })}>
        0
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "." })}>
        .
      </button>
      <div>{result}</div>
    </>
  );
}

export default Calci;
