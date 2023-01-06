export default function Button({ children, onClick }) {
  return (
    <button
      className="text-white bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded active:outline-none focus:outline-none"
      onClick={() => {
        onClick()
      }}
      onTouchEnd={() => {
        onClick()
      }}
    >
      {children}
    </button>
  );
}