import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined'
import DefaultImg from '../../Assets/Images/General/land_1.jpg'
import SecurityIcon from '@mui/icons-material/Security'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import { truncateWord } from '../../utils/utils.ts'
import { IconButton, MenuItem, Popover } from '@mui/material'
import Iconify from '../Dashboard/iconify/iconify.jsx'
import { useFireStoreContext } from '../../context/FireStoreContext.js'
import {
  MapPin,
  Building,
  Ruler,
  Shield,
  Share2,
  ExternalLink
} from 'lucide-react'

interface LandProps {
  id: number
  imageUrl: string[]
  plotNumber: string
  location: string
  price: number
  size: number
  description: string
  security: string
  environment: string
  purpose: string
  images: string[]
}
interface PropertyCardProps {
  land: LandProps
  sliceText: false | true
  showActionBtn: false | true
  isDashboardListing: false | true
}
export default function PropertyCard ({
  land,
  sliceText = false,
  showActionBtn = false,
  isDashboardListing = false
}: PropertyCardProps) {
  return (
    <div className='property-card'>
      <figure className='card-banner'>
        <Link to={`/land/details/${land.id}`}>
          <img
            src={land?.images[0] || `${DefaultImg}`}
            alt={land.plotNumber || 'Property Image'}
            className='w-100'
          />
        </Link>

        <div className='card-badge green'>
          <strong>GHC {land?.price ?? 'N/A'}</strong>
        </div>

        <div className='banner-actions'>
          <button className='banner-actions-btn'>
            <LocationOnOutlinedIcon />

            <address>{land.location}</address>
          </button>

          <button className='banner-actions-btn'>
            <PhotoLibraryOutlinedIcon />

            <span>{land?.images?.length}</span>
          </button>
        </div>
      </figure>

      <div className='card-content'>
        <div className='card-price card-price-wrapper'>
          <h3 className='h3 card-title'>
            <Link to={`/land/details/${land.id}`}>{land.plotNumber}</Link>
          </h3>
          {showActionBtn && <ActionMenu land={land} />}
        </div>

        <p className={`card-text ${sliceText && 'sliceText'}`}>
          {sliceText ? truncateWord(land.description, 100) : land?.description}
        </p>

        {isDashboardListing && (
          <ul className='card-list'>
            <li className='card-item'>
              <div className='flex'>
                <span>Security</span>
                <SecurityIcon />
              </div>

              <strong>{land?.security}</strong>
            </li>

            <li className='card-item'>
              <div className='flex'>
                <span>purpose</span>
                <HomeWorkIcon />
              </div>
              <strong>{land?.purpose}</strong>
            </li>

            <li className='card-item'>
              <div className='flex'>
                <span>Acres</span>
                <SquareFootOutlinedIcon />
              </div>
              <strong>{land.size}</strong>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

function ActionMenu ({ land }) {
  const [open, setOpen] = useState(null)
  const { isDeleting, handleDeleteLand } = useFireStoreContext()
  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
  }

  const handleDelete = () => {
    handleCloseMenu()
    handleDeleteLand('geolis', land.id)
    console.info('DELETE', land.id)
  }

  const handleEdit = () => {
    handleCloseMenu()
    // handleEditLand('geolis', land.id)
    console.info('EDIT', land.id)
  }

  return (
    <>
      <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
        <Iconify icon='eva:more-vertical-fill' />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{ color: 'primary.main', marginBlock: '10px' }}
        >
          <Iconify icon='eva:edit-fill' sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <hr className='border' />
        <MenuItem
          onClick={handleDelete}
          sx={{ color: 'error.main', marginBlock: '10px' }}
        >
          <Iconify icon='solar:trash-bin-trash-bold' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  )
}
