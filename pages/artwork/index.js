import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { Col, Row, Pagination } from "react-bootstrap";
import useSWR from "swr";

import ArtworkCard from "@/src/components/ArtworkCard";

const Artwork = () => {

    
    const PER_PAGE = 12;
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split("?")[1];
    
    const { data, error, isLoading } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
      );

  useEffect(() => {
    if (data) {
      let results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

 
  

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList) {
    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0 &&
            artworkList[page - 1].map((currObjID) => {
              return (
                <Col lg={3} key={currObjID}>
                  <ArtworkCard objectID={currObjID} />
                </Col>
              );
            })}
          {artworkList == 0 && <h4>Nothing Here</h4>}
        </Row>

        {artworkList.length > 0 && (
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    );
  }

  if(artworkList == null||artworkList == undefined) {
    return null
  }

  return <>artwork</>;
};

export default Artwork;
