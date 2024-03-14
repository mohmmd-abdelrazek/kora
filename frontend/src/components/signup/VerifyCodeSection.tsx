interface VerifyCodeSectionProps {
  code: string;
  onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: () => void;
}

const VerifyCodeSection: React.FC<VerifyCodeSectionProps> = ({ code, onCodeChange, onVerify }) => (
  <div className="flex items-center justify-between gap-4">
    <input
      type="text"
      placeholder="Verification Code"
      value={code}
      onChange={onCodeChange}
      className="mt-1 block w-full flex-grow rounded-lg border-gray-300 shadow focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
    />
    <button
      type="button"
      onClick={onVerify}
      className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow hover:shadow-md"
    >
      Verify Code
    </button>
  </div>
);

export default VerifyCodeSection;
