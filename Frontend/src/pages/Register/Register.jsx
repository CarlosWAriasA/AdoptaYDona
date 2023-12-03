// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";

import RegistrationForm from "../../components/register/RegisterForm";

// eslint-disable-next-line react/prop-types
export default function Register({ setShowSidebar }) {
  useEffect(() => {
    setShowSidebar(false);
  }, [setShowSidebar]);

  return (
    <div>
      <RegistrationForm setShowSidebar={setShowSidebar}></RegistrationForm>
    </div>
  );
}
