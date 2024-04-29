import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { TaskCard } from "../components/TaskCard";
import { Head } from "../components/Head";

// Create a new instance of cookies and retireve tokens from them
const cookies = new Cookies();
const token = cookies.get("TOKEN");

/**
 * Functional component to render the authenticated user's home page
 * @returns JSX element containing the authenticated user's home page
 */
export default function AuthComponent() {
  const [name, setName] = useState<string>("Placeholder name");

  /**
   * Function decode a jwt token
   * @param t the token
   * @returns the decoded json of the token
   */
  function decodeToken(t: string) {
    return JSON.parse(atob(t.split(".")[1]));
  }

  useEffect(() => {
    setName(decodeToken(token).displayName);
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Head title="Home" slug="home" desc="Below you will see your tasks" />
      <h2>Welcome back, {name}!</h2>
      &nbsp;
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TaskCard token={token} />
        </Col>
      </Row>
    </Container>
  );
}
