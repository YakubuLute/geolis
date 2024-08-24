import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import EmptyField from '../../landingPage/EmptyField';
import DetailsCard from './DetailsCard';
import { TLandDetails } from '../../../Types/types';
import PropertyCard from '../../landingPage/PropertyCard.tsx';
import LandSlider from '../LandSlider/LandSlider.tsx';
import ImageComponent from '../ImageComponent/index.jsx';
import { useFireStoreContext } from '../../../context/FireStoreContext.js';

const LandDetailsComponent: React.FC = () => {
    const { landData, isLandDataLoading } = useFireStoreContext();
    const { id: landId } = useParams<{ id: string }>();

    const { filteredLand, similarProperties } = useMemo(() => {
        if (!landData) return { filteredLand: null, similarProperties: [] };

        const filtered = landData.find((land: TLandDetails) => land.id.toString() === landId);
        const similar = landData
            .filter(land => land.id.toString() !== landId)
            .slice(0, 3);

        return { filteredLand: filtered, similarProperties: similar };
    }, [landData, landId]);

    if (isLandDataLoading || !landData) {
        return (
            <div className="container">
                <div className="loading-skeleton">
               
                    <Skeleton variant="rectangular" height={'300px'} width="40%"/>
                    <Skeleton variant="text" height={'10px'} width="40%" />
                    <Skeleton variant="text" height={'10px'} width="40%" />
                    <Skeleton variant="text" height={'30px'} width="40%" />
                    <Skeleton variant="text" height={'30px'} width="40%" />
                    <Skeleton variant="text" height={'30px'}  width="40%" />
                    <Skeleton variant="text" height={'30px'}  width="40%" />
                </div>
            </div>
        );
    }

    if (!filteredLand) {
        return <EmptyField fieldName={`Land with id ${landId}`} />;
    }

    return (
        <section className="" id="property">
            <div className="container">
                <div className='slider-wrapper'>
                    <ImageComponent  />
                    <LandSlider videos={[]} photos={filteredLand.imageUrls} altName={filteredLand.plotNumber}/>                    
                </div>

                <ul className="property-list has-scrollbar">
                    <li>
                        <DetailsCard land={filteredLand} />
                    </li>
                </ul>
                <div className="others">
                    <h3>Similar Properties</h3>
                    <div className="similar-properties">
                        <ul className="property-list has-scrollbar">
                            {similarProperties.map((land: TLandDetails) => (
                                <li key={land.id}>
                                    <PropertyCard land={land}  />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="view-all">
                        <Link to="/land-listing" className='link'>View All Properties</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandDetailsComponent;