import { Link } from 'react-router-dom'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Property_1 from "../../Assets/Images/General/land_1.jpg"

import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';

export default function PropertyCard({ land }) {
    return  <div className="property-card">
    <figure className="card-banner">
        <Link to="/property-listing/property-details/">
            <img
                src={land.imageUrl || Property_1}
                alt={land.plotNumber || "Property Image"}
                className="w-100"
            />
        </Link>

        <div className="card-badge green">For Sale</div>

        <div className="banner-actions">
            <button className="banner-actions-btn">
                < LocationOnOutlinedIcon />

                <address>{land.location}</address>
            </button>

            <button className="banner-actions-btn">
                <PhotoLibraryOutlinedIcon />

                <span>4</span>
            </button>

            <button className="banner-actions-btn">
                < MovieFilterOutlinedIcon />

                <span>2</span>
            </button>
        </div>
    </figure>

    <div className="card-content">
        <div className="card-price">
            <div className="card-price">
                <strong>GHC {land?.price ?? 'N/A'}</strong>
            </div>
        </div>

        <h3 className="h3 card-title">
            <Link to={`/property-listing/property-details/${land.id}`}>{land.plotNumber}</Link>
        </h3>

        <p className="card-text">
            The land is dry and flat
        </p>

        <ul className="card-list">
            <li className="card-item">
                <strong>3</strong>

                < BedOutlinedIcon />

                <span>Bedrooms</span>
            </li>

            <li className="card-item">
                <strong>2</strong>

                <ManOutlinedIcon />

                <span>Bathrooms</span>
            </li>

            <li className="card-item">
                <strong>{land.size}</strong>

                < SquareFootOutlinedIcon />

                <span>Acres</span>
            </li>
        </ul>
    </div>
</div>
}