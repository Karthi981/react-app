interface Props {
  digit: string;
  onClick?: () => void;
}

function CalciButton({ digit, onClick }: Props) {
  return <button onClick={onClick}>{digit}</button>;
}

export default CalciButton;
