import {  Button } from "@mui/material";

const Modal = ({ setModal, startGame, title, subtitle }) => {
  const handleClick = () => {
    setModal(false);
    startGame();
  };

  return (
    <>
      <div className="modal-bg"></div>
      <div className="modal">
        <div className="modal-container">
          <div className="content">
            <h1 className="title">{title}</h1>
            <p>{subtitle} </p>
            <Button
              variant="contained"
              onClick={handleClick}
              color="inherit"
              sx={{ backgroundColor: "#f0dc5e" }}
            >
              Recommencer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
