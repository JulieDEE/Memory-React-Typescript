import "./App.scss";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import Counter from "./components/Counter";
import Modal from "./components/Modal";
import { Button } from "@mui/material";

const cardsImages = [
  { src: "/images/cartable.jpg", matched: false },
  { src: "/images/cible.jpg", matched: false },
  { src: "/images/coffre.jpg", matched: false },
  { src: "/images/trophee.jpg", matched: false },
  { src: "/images/sablier.jpg", matched: false },
  { src: "/images/fusee.jpg", matched: false },
];

function App() {
  type Card = {
    src: string;
    matched: boolean;
    id: number;
  };

  const [cards, setCard] = useState<Card[]>([]);
  const [firstCard, setFirstCard] = useState<null | Card>(null);
  const [secondCard, setSecondCard] = useState<null | Card>(null);
  const [disabled, setDisabled] = useState(false);
  const [progress, setProgress] = useState(-1);
  const [modal, setModal] = useState(false);
  const [start, setStart] = useState(true);
  const [win, setwin] = useState(false);

  // RANDOM ARRAY TO START THE GAME :
  // DUPLICATE CARDS IMAGES AND ADD RANDOM ID :
  const startGame = () => {
    const cardArray = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random() };
      });
    setCard(cardArray);
    setStart(false);
    setwin(false);
    setProgress(100);
  };

  // CHOICE ON CLICK :
  const handleChoice = (card: Card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  // COMPARE 2 SELECTED CARDS  :
  useEffect(() => {
    const compareChoice = () => {
      if (firstCard && secondCard) {
        // DISABLE CARDS FOR COMPARE :
        setDisabled(true);
        if (firstCard.src === secondCard.src) {
          //MATCH, Update the array :
          setCard((prevCards) => {
            return prevCards.map((card) => {
              if (card.src === firstCard.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        } else {
          // NOT MATCH
          setTimeout(() => resetTurn(), 1000);
        }
      }
    };
    compareChoice();
  }, [firstCard, secondCard]);

  // RESET TURN :
  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    // ACTIVATE CARDS CLICK
    setDisabled(false);
  };

  // TIME PASSED :
  useEffect(() => {
    if (progress === 0) {
      setModal(true);
    }
  }, [progress]);

  // WIN
  useEffect(() => {
    const isWin = () => {
      let count = 0;
      if (cards.length) {
        cards.forEach((card) => {
          if (card.matched === true) {
            count += 1;
          }
        });
        if (count === 12) {
          setwin(true);
        }
      }
    };
    isWin();
  }, [cards]);

  return (
    <>
      <h1>Memory</h1>
      {start && (
        <div className="start">
          <h2>Comment jouer ?</h2>
          <p>
            Tu devras retourner les cartes disposées sur l'écran une par une. Tu
            auras 100 secondes pour trouver un maximum de paires. Si toutes les
            cartes sont retournées avant la fin du chrono, tu gagnes !
          </p>
          <Button
            variant="contained"
            onClick={startGame}
            sx={{ color: "#393939", fontWeight: "bold", marginTop: "50px" }}
          >
            Commencer
          </Button>
        </div>
      )}

      <div className="game-container">
        <div className="card-grid">
          {cards.map((card) => {
            return (
              <Card
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === firstCard || card === secondCard || card.matched
                }
                disabled={disabled}
              />
            );
          })}
        </div>
      </div>
      {progress > 0 && !win && (
        <Counter progress={progress} setProgress={setProgress} />
      )}

      {modal && (
        <Modal
          setModal={setModal}
          startGame={startGame}
          title={"Tu as perdu !"}
          subtitle={"Retente ta chance"}
        />
      )}
      {win && (
        <Modal
          setModal={setModal}
          startGame={startGame}
          title={"Bravo tu as gagné !"}
          subtitle={"Essaie de faire mieux"}
        />
      )}
    </>
  );
}

export default App;
