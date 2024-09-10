import React from 'react';
import { Link } from 'react-router-dom'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import DefaultImg from '../../Assets/Images/General/land_1.jpg';
import SecurityIcon from '@mui/icons-material/Security';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import {truncateWord} from '../../utils/utils.ts'
interface LandProps {
    id: number;
    imageUrl: string[];
    plotNumber: string;
    location: string;
    price: number;
    size: number;
    description: string;
    security: string;
    environment: string;
    purpose: string;
    images:string[];
}
interface PropertyCardProps {
    land: LandProps;
    sliceText:false|true;
}
export default function PropertyCard({ land, sliceText=false }: PropertyCardProps) {
console.log('S;licing text', sliceText, land)
    return <div className="property-card">
        <figure className="card-banner">
            <Link to={`/land/details/${land.id}`}>
                <img
                    src={land?.images || `${DefaultImg}`}
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

                    <span>{land?.images?.length}</span>
                </button>

                {/* <button className="banner-actions-btn">
                    < MovieFilterOutlinedIcon />

                    <span>2</span>
                </button> */}
            </div>
        </figure>

        <div className="card-content">
            <div className="card-price">
                <div className="card-price">
                    <strong>GHC {land?.price ?? 'N/A'}</strong>
                </div>
            </div>

            <h3 className="h3 card-title">
                <Link to={`/land/details/${land.id}`}>{land.plotNumber}</Link>
            </h3>

            <p className={`card-text ${sliceText && 'sliceText'}`} >
                {sliceText?  truncateWord(land.description, 120) : land?.description  }
            </p>

            <ul className="card-list">
                <li className="card-item">
                    <div className="flex">
                        <span>Security</span>
                        < SecurityIcon />
                    </div>

                    <strong>{land?.security}</strong>
                </li>

                <li className="card-item">
                    <div className="flex">
                        <span>purpose</span>
                        <HomeWorkIcon />
                    </div>
                    <strong>{land?.purpose}</strong>
                </li>

                <li className="card-item">
                    <div className="flex">
                        <span>Acres</span>
                        < SquareFootOutlinedIcon />
                    </div>
                    <strong>{land.size}</strong>
                </li>
            </ul>
        </div>
    </div>
}