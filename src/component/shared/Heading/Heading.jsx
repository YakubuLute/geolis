import { Typography, Box } from "@mui/material";

var greenAccent;
const Heading = ({ title, subtitle, titlefontSize, subtitlefontSize, titlefontWeight = "bold", titleColor = "#fff", subtitleColor = greenAccent }) => {


  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        className=""
        fontSize={titlefontSize}
        fontWeight={titlefontWeight}
        sx={{ m: "0 0 5px 0", paddingBottom: "1.3rem" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5" color={subtitleColor} fontSize={subtitlefontSize}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Heading;
