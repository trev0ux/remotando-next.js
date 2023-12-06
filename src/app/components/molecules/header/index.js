import "./header.scss";
import Logo from "../../../assets/icons/logo.svg";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Header ({handleShow}) {
    return (
        <Container>
            <header className="header">

                <div className="header__logo">
                    <Logo />
                    <h3>{handleShow}</h3>
                </div>
                <Button variant="primary" onClick={handleShow}>
                    Adicione um lugar
                </Button>
            </header>
        </Container>
    )
}

export default Header;