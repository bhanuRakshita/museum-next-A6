const { Container } = require("react-bootstrap")
import MainNav from "./MainNav";

const Layout = ({children}) => {
    return (
        <>
            <MainNav />
            <br/>
            <br/>
            <br/>
            <Container>
                {children}
            </Container>
            <br/>
        </>
    )
}

export default Layout;