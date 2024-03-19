import SignupForm from "@/src/components/signup/SignupForm";
import { Link } from "@/src/navigation";

const Signup = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create an Account
        </h2>
        <SignupForm />
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            href="/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
