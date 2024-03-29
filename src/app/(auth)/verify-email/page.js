import VerifyEmailCard from "./components/VerifyEmailCard";

const SignUpPage = ({ searchParams }) => {
  const { error, token, success } = searchParams;
  return <VerifyEmailCard error={error} token={token} success={success} />;
};

export default SignUpPage;
