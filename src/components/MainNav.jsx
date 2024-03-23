import { useState } from "react";
import { useRoute } from "next/router";
import { useAtom } from "jotai";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRouter } from "next/router";

import { searchHistoryAtom } from "@/store";

function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitHandler = (e) => {
    let queryString = `title=true&q=${encodeURIComponent(searchField)}`;
    e.preventDefault();
    setIsExpanded(false);
    setSearchHistory(current => [...current, queryString]);
    router.push(
      `/artwork?title=true&q=${encodeURIComponent(searchField)}`
    );
  };

  const changeHandler = (e) => {
    setSearchField(e.target.value);
  };

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Navbar
      expanded={isExpanded}
      expand="lg"
      className="bg-body-tertiary fixed-top"
    >
      <Container fluid>
        <Navbar.Brand href="#">Bhanu Rakshita Paul</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={toggleIsExpanded}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link
              active={router.pathname === "/"}
                onClick={() => {
                  setIsExpanded(false);
                }}
              >
                Home
              </Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link
              active={router.pathname === "/search"}
                onClick={() => {
                  setIsExpanded(false);
                }}
              >
                Advanced Search
              </Nav.Link>
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={submitHandler}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={changeHandler}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
          &nbsp;
          
            <NavDropdown title="User Name" id="basic-nav-dropdown">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => {
                  setIsExpanded(false);
                }}>
                  Favourites
                </NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item  active={router.pathname === "/history"} onClick={() => {
                  setIsExpanded(false);
                }}>
                  Search History
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;
