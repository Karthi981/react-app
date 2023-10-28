import React, { useState, useEffect } from "react";
import Button from "./components/Button";

interface Item {
  id: number;
  text: string;
  selected: boolean;
}

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<{
    input: string;
    items: Item[];
    filteredItems: Item[];
  }>({
    input: "",
    items: [],
    filteredItems: [],
  });
  const { input, items, filteredItems } = todos;

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClick();
  };
  const handleClick = () => {
    if (input.trim() !== "") {
      let value: Item[] = [];
      value.push({ id: Date.now(), text: input, selected: false });
      setTodos({
        items: [...items, ...value],
        input: "",
        filteredItems: [...filteredItems, ...value],
      });
    }
  };
  const removeTodo = (index: number) => {
    const updatedTodos = [...items];
    updatedTodos.splice(index, 1);
    setTodos((prevItems: { input: string; items: Item[] }) => ({
      ...prevItems,
      items: updatedTodos,
      filteredItems: updatedTodos,
    }));
  };
  const onFilter = (isChange: boolean, ifselected?: boolean) => {
    if (isChange === true) {
      const filtered = items.filter((item) => item.selected === ifselected);
      setTodos((prevItems: { input: string; items: Item[] }) => ({
        ...prevItems,
        filteredItems: filtered,
      }));
    } else {
      setTodos((prevItems: { input: string; items: Item[] }) => ({
        ...prevItems,
        filteredItems: items,
      }));
    }
  };

  useEffect(() => {
    setTodos((prevItems: { input: string; items: Item[] }) => ({
      ...prevItems,
      filteredItems: items,
    }));
  }, [items]);

  const handleCheckboxChange = (id: number) => {
    let selectedItem: Item[] = items.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setTodos((prevItems: { input: string; items: Item[] }) => ({
      ...prevItems,
      items: selectedItem,
      filteredItems: selectedItem,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(
      (prevItems: { input: string; items: Item[]; filteredItems: Item[] }) => ({
        ...prevItems,
        input: e.target.value,
      })
    );
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="row">
          <div className="col-sm p-2">
            <form onSubmit={(e) => handleForm(e)}>
              <label>
                <input
                  autoComplete="false"
                  id={todos.input}
                  name={todos.input}
                  placeholder="Add to Do Item"
                  type="text"
                  value={input}
                  className="form-control"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  style={{ backgroundColor: "white" }}
                ></input>
              </label>
            </form>
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
      <ul>
        {filteredItems.map((todo, index) => (
          <div className="container" key={todo.id}>
            <div className="container" style={{ width: 1300 }}>
              <div className="row">
                <div className="col">
                  <div className="form-check" key={todo.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      checked={todo.selected}
                      onChange={() => handleCheckboxChange(todo.id)}
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
                      key={todo.id}
                      type="button"
                      className="btn-close btn-close-white"
                      aria-label="Close"
                      onClick={() => removeTodo(index)}
                    ></button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>

      <div className="container">
        <div className="row">
          <div className="col-sm p-2">
            <Button onClick={() => onFilter(true, false)}>Active</Button>
          </div>
          <div className="col-sm p-2">
            <Button onClick={() => onFilter(false)}>All</Button>
          </div>
          <div className="col-sm p-2">
            <Button onClick={() => onFilter(true, true)}>Completed</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
