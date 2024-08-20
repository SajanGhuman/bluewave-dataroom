import React from "react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import "./index.css";

/**
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.icon - The icon element to display (optional).
 * @param {string} props.label - The label text for the progress item.
 * @param {string} props.size - The size information for the progress item.
 * @param {number} props.progress - The current progress value (0-100).
 * @param {function} props.onClick - The function to handle click events on the remove button.
 * @param {string} props.error - Error message to display if there's an error (optional).
 * @returns {JSX.Element} The rendered component.
 */

const ProgressUpload = ({
  icon,
  label,
  size,
  progress = 0,
  onClick,
  error,
}) => {
  const theme = useTheme();
  return (
    <Box
      className="progress-bar-container"
      mt="20px"
      sx={{
        minWidth: "200px",
        height: "fit-content",
        borderRadius: `${theme.shape.borderRadius}px`,
        border: `solid 1px ${theme.palette.otherColors.graishWhite}`,
      }}
    >
      <Stack
        direction="row"
        mb={error ? "0" : "10px"}
        gap="10px"
        alignItems={error ? "center" : "flex-end"}
      >
        {error ? (
          <ErrorOutlineOutlinedIcon />
        ) : icon ? (
          <IconButton
            sx={{
              backgroundColor: theme.palette.otherColors.white,
              pointerEvents: "none",
              borderRadius: `${theme.shape.borderRadius}px`,
              border: `solid ${theme.shape.borderThick}px ${theme.palette.otherColors.graishWhite}`,
              boxShadow: theme.shape.boxShadow,
            }}
          >
            {icon}
          </IconButton>
        ) : (
          ""
        )}
        {error ? (
          <Typography component="p" className="input-error">
            {error}
          </Typography>
        ) : (
          <Box>
            <Typography component="h2" mb="5px">
              {error ? error : label}
            </Typography>
            <Typography component="p">{!error && size}</Typography>
          </Box>
        )}
        <IconButton
          onClick={onClick}
          sx={
            !error
              ? {
                  alignSelf: "flex-start",
                  ml: "auto",
                  mr: "-5px",
                  mt: "-5px",
                  padding: "5px",
                  "&:focus": {
                    outline: "none",
                  },
                }
              : {
                  ml: "auto",
                  "&:focus": {
                    outline: "none",
                  },
                }
          }
        >
          <CloseIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
      </Stack>
      {!error ? (
        <Stack direction="row" alignItems="center">
          <Box sx={{ width: "100%", mr: "10px" }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                width: "100%",
                height: "10px",
                borderRadius: `${theme.shape.borderRadius}px`,
                maxWidth: "500px",
                backgroundColor: theme.palette.otherColors.graishWhite,
              }}
            />
          </Box>
          <Typography component="p" sx={{ minWidth: "max-content" }}>
            {progress}
            <span>%</span>
          </Typography>
        </Stack>
      ) : (
        ""
      )}
    </Box>
  );
};

ProgressUpload.propTypes = {
  icon: PropTypes.element, // JSX element for the icon (optional)
  label: PropTypes.string.isRequired, // Label text for the progress item
  size: PropTypes.string.isRequired, // Size information for the progress item
  progress: PropTypes.number.isRequired, // Current progress value (0-100)
  onClick: PropTypes.func.isRequired, // Function to handle click events on the remove button
  error: PropTypes.string, // Error message to display if there's an error (optional)
};

export default ProgressUpload;
