import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useHeaderLogic(onChangeForm) {
  const navigate = useNavigate();
  const [haveAccount, setHaveAccount] = useState("Don't have an account?");
  const [pageStatus, setPageStatus] = useState("Sign-in");
  const [isHaveAccountDisabled, setIsHaveAccountDisabled] = useState(false);
  const [switchUser, setSwitchUser] = useState("user");

  useEffect(() => {
    if (typeof onChangeForm === "function") {
      onChangeForm(switchUser);
    }
  }, [onChangeForm, switchUser]);

  const handleSignInClick = () => {
    if (pageStatus === "sign-up") {
      navigate("/signup");
      setHaveAccount("Already a user?");
      setPageStatus("log-in");
    } else {
      navigate("/");
      setHaveAccount("Don't have an account?");
      setPageStatus("sign-up");
    }
  };

  const goToHome = () => {
    navigate("/");
    setHaveAccount("Don't have an account?");
    setPageStatus("Sign-in");
  };

  const handleClick = (tab) => {
    setSwitchUser(tab);
    if (tab === "admin") {
      navigate("/admin");
      setIsHaveAccountDisabled(true);
    } else {
      navigate("/");
      setIsHaveAccountDisabled(false);
    }
  };

  return {
    haveAccount,
    pageStatus,
    isHaveAccountDisabled,
    handleSignInClick,
    goToHome,
    handleClick,
  };
}

export { useHeaderLogic };
