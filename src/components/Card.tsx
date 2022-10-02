type CardType = {
  id: number;
  src: string;
  matched: boolean;
};

interface Props {
  card: CardType;
  key: number;
  handleChoice: (card: CardType) => void;
  flipped: boolean;
  disabled: boolean;
}

const Card = ({ card, handleChoice, flipped, disabled }: Props) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : "image"}>
        <img src={card.src} alt="card front" className="front" />
        <img
          src="/images/cover.png"
          alt="card back"
          className="back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
