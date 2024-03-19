import { InputFieldProps } from "@/src/types/signup";

const InputField = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
}: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    />
  </div>
);

export default InputField;
