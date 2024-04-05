import { useAtom } from "jotai";
import { Row, Col } from "react-bootstrap";

import { favouritesAtom } from "@/store";
import ArtworkCard from "@/src/components/ArtworkCard";
const Favourites = () => {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
    if(favouritesList) {
        return (
            <>
              <Row className="gy-4">
                {favouritesList.length > 0 &&
                  favouritesList.map((currObjID) => {
                    return (
                      <Col lg={3} key={currObjID}>
                        <ArtworkCard objectID={currObjID} />
                      </Col>
                    );
                  })}
                {favouritesList.length == 0 && <h4>Nothing Here: Try adding something</h4>}
              </Row>
      
              
            </>
          );
        }
    };



export default Favourites;