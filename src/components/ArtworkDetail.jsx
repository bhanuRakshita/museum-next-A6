import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Button } from "react-bootstrap";

const ArtworkDetail = ({objectID}) => {
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  const router = useRouter();
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
      <Card>
        {data.primaryImage&&<Card.Img variant="top" src={data.primaryImage} />}
        <Card.Body>
          <Card.Title>{data.title || "N/A"}</Card.Title>
          <Card.Text>
            <b>Date:</b> {data.objectDate || 'N/A'} <br />
            <b>Classication:</b> {data.classification || 'N/A'} <br />
            <b>Medium:</b> {data.medium || 'N/A'} <br/><br/>
            <b>Artist:</b> {data.artistDisplayName || 'N/A'} ({data.artistWikidata_URL && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>})<br/>
            <b>creditLine:</b> {data.creditLine || 'N/A'}<br/>
            <b>dimensions:</b> {data.dimensions || 'N/A'}
          </Card.Text>
          <Link href={`/artwork/${data.objectID}`} passHref>
            <Button variant="primary" onClick={()=>{router.back()}}>Back</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default ArtworkDetail;
