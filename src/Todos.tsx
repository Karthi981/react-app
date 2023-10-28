import React, { useState } from "react";
import Button from "./components/Button";

interface Item {
  id: number;
  text: string;
  selected: boolean;
}

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<{ input: string; items: Item[] }>({
    input: "",
    items: [],
  });
  const { input, items } = todos;
  const handleClick = () => {
    if (input.trim() !== "") {
      let value: Item[] = [];
      value.push({ id: Date.now(), text: input, selected: false });
      setTodos({ items: [...items, ...value], input: "" });
    }
  };
  const removeTodo = (index: number) => {
    const updatedTodos = [...items];
    updatedTodos.splice(index, 1);
    setTodos((prevItems: { input: string; items: Item[] }) => ({
      ...prevItems,
      items: updatedTodos,
    }));
  };
  const onFilter = (ifselected: boolean) => {
    const filteredItems = items.filter((item) => item.selected === ifselected);
    setTodos((prevItems: { input: string; items: Item[] }) => ({
      ...prevItems,
      items: filteredItems,
    }));
  };
  const handleCheckboxChange = (id: number) => {
    let selectedItem: Item[] = items.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setTodos((prevItems: { input: string; items: Item[] }) => ({
      ...prevItems,
      items: selectedItem,
    }));
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="row">
          <div className="col-sm p-2">
            <div className="form-group " style={{ width: 860 }}>
              <input
                autoComplete="false"
                id={todos.input}
                name={todos.input}
                placeholder="Add to Do Item"
                type="text"
                value={input}
                className="form-control"
                onChange={(e) => {
                  setTodos((prevItems: { input: string; items: Item[] }) => ({
                    ...prevItems,
                    input: e.target.value,
                  }));
                }}
                style={{ backgroundColor: "white" }}
              ></input>
            </div>
          </div>
          <div className="col-sm p-2">
            <button
              onClick={handleClick}
              type="button"
              style={{ width: 200 }}
              className="btn btn-secondary"
            >
              Add ToDo
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <ul>
          {items.map((todo, index) => (
            <div className="container" style={{ width: 1300 }}>
              <div className="row">
                <div className="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      onChange={() => handleCheckboxChange(todo.id)}
                      id={
                        todo.selected == true
                          ? "flexCheckChecked"
                          : "flexCheckDefault"
                      }
                    ></input>
                  </div>
                </div>
                <div className="col">
                  <li key={todo.id} className="list-group-item">
                    <p className="text-light"> {todo.text}</p>
                  </li>
                </div>

                <div className="col">
                  <span>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      aria-label="Close"
                      onClick={() => removeTodo(index)}
                    ></button>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm p-2">
            <Button onClick={() => onFilter(false)}>Active</Button>
          </div>
          <div className="col-sm p-2">
            <Button>All</Button>
          </div>
          <div className="col-sm p-2">
            <Button onClick={() => onFilter(true)}>Completed</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
