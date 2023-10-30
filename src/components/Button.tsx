import { memo } from "react";

interface Props {
  children: string;
  onClick?: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      style={{ width: 200 }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
