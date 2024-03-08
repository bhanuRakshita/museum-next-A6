import ArtworkDetail from "@/src/components/ArtworkDetail";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";

const ArtworkById = () => {
  const router = useRouter();
  const { objectID } = router.query;

  const submitForm = (data) => {
    let queryString = "searchBy=true";

    if (data.geoLocation) {
      queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
    }

    if (data.medium) {
      queryString += `&medium=${encodeURIComponent(data.medium)}`;
    }

    if (data.isOnView) {
      queryString += `&isOnView=${data.isOnView}`;
    }

    if (data.isHighlight) {
      queryString += `&isHighlight=${data.isHighlight}`;
    }

    if (data.q) {
      queryString += `&q=${encodeURIComponent(data.q)}`;
    }

    router.push(`/artwork?${queryString}`);
  };
  
  return (
    <Row>
      <Col>
        <ArtworkDetail objectID={objectID} />
      </Col>
    </Row>
  );
};

export default ArtworkById;
