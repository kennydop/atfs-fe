import Loader from "./Loader";

export default function Button({
  children,
  loading,
  className = "",
  disabled,
  onClick,
  ...props
}) {
  return (
    <button
      className={`h-10 w-full px-4 py-2 
      ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-primary text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 cursor-pointer"
      }
        rounded-md shadow-sm ${className}`}
      {...props}
      onClick={
        disabled || loading
          ? undefined
          : onClick === null || onClick === undefined
          ? undefined
          : (e) => {
              e.preventDefault();
              onClick();
            }
      }
      disabled={disabled || loading}
    >
      {loading ? <Loader /> : children}
    </button>
  );
}
