import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { useHeaderLogic } from "../store/useHeaderLogic";
import Header from "../components/Header";
import UserForm from "../components/UserForm";
import AdminForm from "../components/AdminForm";

// Initial state for the context
const initialState = {
  formData: { email: "", password: "" },
  errors: {},
  token: null,
};

// Reducer function to manage state updates
function reducer(state, action) {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
}

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectForm, setSelectForm] = useState("admin");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      dispatch({ type: "SET_TOKEN", payload: savedToken });
    }
  }, [dispatch]);

  useEffect(() => {}, [selectForm]);

  return (
    <AppContext.Provider value={{ state, dispatch, selectForm, setSelectForm }}>
      {children}
    </AppContext.Provider>
  );
}

function Home() {
  const { selectForm } = useContext(AppContext);
  return selectForm === "user" ? <UserForm /> : <AdminForm />;
}

function ConditionalHeader() {
  const location = useLocation();
  const showHeader = location.pathname !== "/profilePage";
  const { setSelectForm } = useContext(AppContext);
  const {
    haveAccount,
    pageStatus,
    isHaveAccoundDisabled,
    handleChangeForm,
    goToHome,
    handleClick,
  } = useHeaderLogic(setSelectForm);
  const onChangeForm = handleChangeForm;

  return showHeader ? (
    <Header
      onChangeForm={onChangeForm}
      haveAccount={haveAccount}
      pageStatus={pageStatus}
      isHaveAccoundDisabled={isHaveAccoundDisabled}
      goToHome={goToHome}
      handleClick={handleClick}
    />
  ) : null;
}

export { AppContext, AppProvider, Home, ConditionalHeader };
