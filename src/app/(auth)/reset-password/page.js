import PasswordResetForm from "./components/PasswordResetForm";

const PasswordResetPage = ({ searchParams }) => {
  return <PasswordResetForm token={searchParams.token} />;
};

export default PasswordResetPage;
