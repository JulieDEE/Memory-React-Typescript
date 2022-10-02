import { useEffect } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
  progress: number;
  setProgress: (value: any) => void;
};

function LinearProgressWithLabel(props: any) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(
          props.value
        )} s`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Counter = ({ progress, setProgress }: Props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress: any) =>
        prevProgress < 0 ? 0 : prevProgress - 1
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, [progress]);

  return (
    <div className="counter-container">
      <Box sx={{ width: "90%", marginTop: "50px" }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
    </div>
  );
};

export default Counter;
