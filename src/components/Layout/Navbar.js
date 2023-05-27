import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

const Header = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.isLogout());
    localStorage.removeItem("token");
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="fw-bold" onClick={() => navigate("/")}>
          Mail Box Client
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!isLogin && (
              <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            )}
            {!isLogin && (
              <Nav.Link onClick={() => navigate("/register")}>
                Sign up
              </Nav.Link>
            )}
            {isLogin && (
              <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
            )}
            {isLogin && (
              <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
            )}
            {isLogin && <Nav.Link onClick={logoutHandler}>LogOut</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
