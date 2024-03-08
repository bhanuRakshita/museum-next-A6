import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";

const ArtworkCard = ({ objectID }) => {
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  if (isLoading) {
    return null;
  }
  if (error) {
    return <Error statusCode={404} />;
  }
  if (!data) {
    return null;
  }
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={
            data.primaryImageSmall ||
            "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
        <Card.Body>
          <Card.Title>{data.title || "N/A"}</Card.Title>
          <Card.Text>
            <b>Date:</b> {data.objectDate} <br />
            <b>Classication:</b> {data.classification} <br />
            <b>Medium:</b> {data.medium}
          </Card.Text>
          <Link href={`/artwork/${data.objectID}`} passHref>
            <Button variant="primary">ID: {data.objectID}</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default ArtworkCard;
