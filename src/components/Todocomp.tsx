interface Props {
  items: string[];
  onClick: () => void;
  Id: number[];
  onChange: () => void;
}

const ToDoComp = ({ items, onClick, onChange }: Props) => {
  return (
    <div className="container">
      <ul>
        {items.map((todo, index) => (
          <div className="container" style={{ width: 1300 }}>
            <div className="row">
              <div className="col">
                <div className="form-check">
                  <input
                    onChange={onChange}
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  ></input>
                </div>
              </div>
              <div className="col">
                <li key={index} className="list-group-item">
                  <p className="text-light"> {todo}</p>
                </li>
              </div>

              <div className="col">
                <span>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Close"
                    onClick={() => onClick}
                  ></button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ToDoComp;
