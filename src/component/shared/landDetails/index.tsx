import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Skeleton from '@mui/material/Skeleton'
import EmptyField from '../../landingPage/EmptyField'
import { LandDetailPage } from './LandDetailPage.tsx'
import { TLandDetails } from '../../../Types/types'
import PropertyCard from '../../landingPage/PropertyCard.tsx'
import LandSlider from '../LandSlider/LandSlider.tsx'
import ImageComponent from '../ImageComponent/index.jsx'
import { useFireStoreContext } from '../../../context/FireStoreContext.js'
import { Button, Title } from '@mantine/core'

const LandDetailsComponent: React.FC = () => {
  const { landData, isLandDataLoading } = useFireStoreContext()
  const { id: landId } = useParams<{ id: string }>()

  const { filteredLand, similarProperties } = useMemo(() => {
    if (!landData) return { filteredLand: null, similarProperties: [] }

    const filtered = landData.find(
      (land: TLandDetails) => land.id.toString() === landId
    )
    const similar = landData
      .filter(land => land.id.toString() !== landId)
      .slice(0, 3)

    return { filteredLand: filtered, similarProperties: similar }
  }, [landData, landId])

  if (isLandDataLoading || !landData) {
    return (
      <div className='container'>
        <div className='loading-skeleton'>
          <Skeleton variant='rectangular' height={'300px'} width='40%' />
          <Skeleton variant='text' height={'10px'} width='40%' />
          <Skeleton variant='text' height={'10px'} width='40%' />
          <Skeleton variant='text' height={'30px'} width='40%' />
          <Skeleton variant='text' height={'30px'} width='40%' />
          <Skeleton variant='text' height={'30px'} width='40%' />
          <Skeleton variant='text' height={'30px'} width='40%' />
        </div>
      </div>
    )
  }

  if (!filteredLand) {
    return <EmptyField fieldName={`Land with id ${landId}`} />
  }

  return (
    <section className='' id='property'>
      <div className='container'>
        <div className='property-wrapper'>
          <LandDetailPage />
        </div>

        {similarProperties.length > 0 && (
          <div className='others'>
            <Title size={'2.5rem'} fw={800} c={'#3F4254'} order={1} mb='md'>
              Similar Properties
            </Title>

            <div className='similar-properties mt-4'>
              <ul className='property-list has-scrollbar'>
                {similarProperties.map((land: TLandDetails) => (
                  <li key={land.id}>
                    <PropertyCard land={land} />
                  </li>
                ))}
              </ul>
            </div>
            <div className='view-all'>
              <Button variant='outline' my={'xl'} mx={'auto'}>
                <Link to='/land-listing' className='link'>
                  View All Properties
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default LandDetailsComponent
