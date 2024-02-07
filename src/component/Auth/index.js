
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationForm } from "./authcomponent";

//
const AuthPage = () => {

  return (
    <section className="auth">
      <div className="container">
          <AuthenticationForm />
      </div>
    </section>
  );
};
export default AuthPage;
