import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import DefaultImg from "../../Assets/Images/General/land_1.jpg";
import SecurityIcon from "@mui/icons-material/Security";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { truncateWord } from "../../utils/utils.ts";
import { IconButton, MenuItem, Popover } from "@mui/material";
import Iconify from "../Dashboard/iconify/iconify.jsx";
import { useFireStoreContext } from "../../context/FireStoreContext.js";
import CustomModal from "../shared/Modal/index.jsx";
import { Button, Stack } from "@mui/material";

export default function PropertyCard({
  land,
  sliceText = false,
  showActionBtn = false,
  isDashboardListing = false,
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { isDeleting, handleDeleteLand } = useFireStoreContext();

  const onOpenDelete = (value) => {
    setOpenDeleteModal(value);
  };

  return (
    <>
      <div className="property-card">
        <figure className="card-banner">
          <Link to={`/land/details/${land.id}`} title="Click to view details">
            <img
              src={land?.images[0] || `${DefaultImg}`}
              alt={land.plotNumber || "Property Image"}
              className="w-100"
            />
          </Link>

          <div className="card-badge green">
            <strong>GHC {land?.price ?? "N/A"}</strong>
          </div>

          <div className="banner-actions">
            <button className="banner-actions-btn">
              <LocationOnOutlinedIcon />

              <address>{land.location}</address>
            </button>

            <button className="banner-actions-btn">
              <PhotoLibraryOutlinedIcon />

              <span>{land?.images?.length}</span>
            </button>
          </div>
        </figure>

        <div className="card-content">
          <div className="card-price card-price-wrapper">
            <h3 className="h3 card-title">
              <Link to={`/land/details/${land.id}`}>{land.plotNumber}</Link>
            </h3>
            {showActionBtn && (
              <ActionMenu land={land} onOpenDelete={onOpenDelete} />
            )}
          </div>

          <p className={`card-text ${sliceText && "sliceText"}`}>
            {sliceText
              ? truncateWord(land.description, 100)
              : land?.description}
          </p>

          {isDashboardListing && (
            <ul className="card-list">
              <li className="card-item">
                <div className="flex">
                  <span>Security</span>
                  <SecurityIcon />
                </div>

                <strong>{land?.security}</strong>
              </li>

              <li className="card-item">
                <div className="flex">
                  <span>purpose</span>
                  <HomeWorkIcon />
                </div>
                <strong>{land?.purpose || "Construction"}</strong>
              </li>

              <li className="card-item">
                <div className="flex">
                  <span>Acres</span>
                  <SquareFootOutlinedIcon />
                </div>
                <strong>{land.size}</strong>
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* delete confirmation modal */}
      <CustomModal
        title="Confirm Delete"
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
      >
        <Stack spacing={3} height={10}>
          <p>
            Are you sure you want to delete this land listing? This action
            cannot be undone.
          </p>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              width={"4rem"}
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              width={"4rem"}
              onClick={() => {
                handleDeleteLand("geolis", land.id);
                setOpenDeleteModal(false);
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </>
  );
}

export const ActionMenu = ({ land, onOpenDelete }) => {
  const [open, setOpen] = useState(null);
  const { setOpenEdit, setSelectedLand } = useFireStoreContext();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = () => {
    handleCloseMenu();
    onOpenDelete(true);
  };

  const handleEdit = () => {
    handleCloseMenu();
    setSelectedLand(land);
    setOpenEdit(true);
  };

  return (
    <>
      <IconButton color={open ? "inherit" : "default"} onClick={handleOpenMenu}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{ color: "primary.main", marginBlock: "10px" }}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <hr className="border" />
        <MenuItem
          onClick={handleDelete}
          sx={{ color: "error.main", marginBlock: "10px" }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};
