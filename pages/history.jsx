import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ListGroup, Button } from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";
import { searchHistoryAtom } from "@/store";
import styles from "@/styles/History.module.css";

const History = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if(!searchHistory) return null;

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    e.preventDefault();
    router.push(`/artwork?searchHistory[${index}]`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  if (parsedHistory.length == 0) {
    return (
      <>
        <h1>Nothing Here: Try searching for some art work</h1>
      </>
    );
  }

  

  return (
    <>
      <ListGroup>
        {parsedHistory.map((historyItem, index) => (
          <ListGroup.Item
          key={index}
            className={styles.historyListItem}
            onClick={() => {
              historyClicked(e, index);
            }}
          >
            {Object.keys(historyItem).map((key) => (
              <>
                {key}: <strong>{historyItem[key]}</strong>&nbsp;
              </>
            ))}
            <Button
              className="float-end"
              variant="danger"
              size="sm"
              onClick={(e) => removeHistoryClicked(e, index)}
            >
              &times;
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default History;
