import { Box, Typography } from "@mui/material";


// by default the icon component is set to empty Box
const RtButton = ({ Icon = Box, iconSrc = "", text, textColor = "white", bgColor, onClickAction }) => {
    return <button
        type="submit"
        className="dp-button"
        style={{
            borderRadius: "0.2rem",
            width: "100%",
            padding: ".8rem 1rem",
            border: "1.5px solid #123",
            backgroundColor: { bgColor },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "1.5rem 0 0 0",
            gap: "6px",
            textAlign: "center !important"

        }}

        onClick={onClickAction}
    >
        <Box
            display={iconSrc === "" ? "none" : "flex"}>
            <img src={iconSrc} alt="" height={"20px"} style={{ paddingRight: "10px" }} />
        </Box>
        <Typography className="text" variant="p" color={textColor}> {text}</Typography>
        <span>
            <Icon />
        </span>
    </button>
}
export default RtButton;