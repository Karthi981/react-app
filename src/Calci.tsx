import { useReducer } from "react";

type CalculatorState = {
  display: string;
  result: number | null;
};

type CalculatorAction =
  | { type: "APPEND_NUMBER"; payload: string }
  | { type: "SET_OPERATOR"; payload: string }
  | { type: "CALCULATE_RESULT" }
  | { type: "CLEAR" };

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  switch (action.type) {
    case "APPEND_NUMBER":
      if (action.payload === "0" && state.display === "0") {
        return state;
      }
      if (action.payload === "." && state.display.includes(".")) {
        return state;
      }
      return {
        ...state,
        display:
          state.display === "0"
            ? action.payload
            : state.display + action.payload,
      };
    case "SET_OPERATOR":
      if (state.display.includes("+")) {
        return state;
      }
      return {
        ...state,
        display: state.display + action.payload,
        result: null,
      };
    case "CALCULATE_RESULT":
      return { display: "", result: null };
    case "CLEAR":
      return {
        display: "0",
        result: null,
      };
    default:
      return state;
  }
};

function Calci() {
  const [state, dispatch] = useReducer(calculatorReducer, {
    display: "0",
    result: null,
  });

  return (
    <>
      <div className="output">
        <div className="previous-operand">
          <h2>{state.display}</h2>
        </div>
        <div className="current-operand"></div>
      </div>
      <button onClick={() => dispatch({ type: "CLEAR" })}>C</button>
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
      <button onClick={() => dispatch({ type: "CALCULATE_RESULT" })}>=</button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "0" })}>
        0
      </button>
      <button onClick={() => dispatch({ type: "APPEND_NUMBER", payload: "." })}>
        .
      </button>
    </>
  );
}

export default Calci;
