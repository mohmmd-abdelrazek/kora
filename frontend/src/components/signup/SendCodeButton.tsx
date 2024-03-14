interface SendCodeButtonProps {
  onClick: () => void;
}

const SendCodeButton: React.FC<SendCodeButtonProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow hover:shadow-md"
  >
    Send Verification Code
  </button>
);

export default SendCodeButton;
