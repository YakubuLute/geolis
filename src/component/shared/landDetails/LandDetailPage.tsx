import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { TLandDetails } from '../../../Types/types';
import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  Image,
  Grid,
  LoadingOverlay,
  Alert,
  SimpleGrid,
} from '@mantine/core';
import LeafletMap from '../Leaflet/leaflet-component.jsx';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export function LandDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [landDetails, setLandDetails] = useState<TLandDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const docRef = doc(db, 'geolis', id!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLandDetails(docSnap.data() as TLandDetails);
        } else {
          setError('No such document exists!');
        }
      } catch (err) {
        setError('Error fetching document');
        console.error('Error fetching document:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandDetails();
  }, [id]);

  const parseCoordinates = (coordString) => {
    return coordString.split(',').map(coord => (parseFloat(coord.trim())));
  }

  if (loading) {
    return <LoadingOverlay visible={true} overlayBlur={2} />;
  }

  if (error) {
    return (
      <Alert icon={<NotificationsActiveIcon size="1rem" />} title="Error" color="red">
        {error}
      </Alert>
    );
  }

  if (!landDetails) {
    return <Text>No data available</Text>;
  }

  const LandSpecificItem = ({ title, value }: { title: string; value: string | number }) => (
    <Group align="flex-start" style={{ textTransform: 'capitalize' }}>
      <Text fw={700} style={{ minWidth: '150px' }}>{title}:</Text>
      <Text>{value}</Text>
    </Group>
  );

  return (
    <Container size="lg" mt={15} mb={'4rem'}>
      <Paper shadow="xs" p="md">
        <Title order={1} mb="md">{landDetails.plotNumber}</Title>
        <Text size="lg" mb="xs"><strong>Plot Number:</strong> {landDetails.plotNumber}</Text>
        <Text mb="md">{landDetails.description}</Text>

        <Grid mt="xl">
          <Grid.Col span={8}>
            <Title order={2} mb="md">Land Specifics</Title>
            <SimpleGrid cols={2} spacing="md">
              <LandSpecificItem title="Location" value={landDetails.location} />
              <LandSpecificItem title="Size" value={`${landDetails.size} acres`} />
              <LandSpecificItem title="Purpose" value={landDetails.purpose} />
              <LandSpecificItem title="Security" value={landDetails.security} />
              <LandSpecificItem title="Documentation" value={landDetails.documentation} />
              <LandSpecificItem title="Environment" value={landDetails.environment} />
              <LandSpecificItem title="Allodial Ownership" value={landDetails.allodialOwnership} />
              <LandSpecificItem title="Ground" value={landDetails.ground} />
              <LandSpecificItem title="Price" value={`$${landDetails.price}`} />
              <LandSpecificItem title="ETA to CBD" value={landDetails.etaToCBD} />
              <LandSpecificItem title="Default Zooming" value={landDetails.defaultZooming} />
            </SimpleGrid>
            {/* leaflet map */}
            <Title order={3} mt="xl" mb="md">Property Location Map</Title>
            {landDetails.initialCood && (
              <LeafletMap
                initialCoordinates={parseCoordinates(landDetails.initialCood)}
                polygonCoordinates={landDetails.polygon ? landDetails.polygon.map(parseCoordinates) : []}
              />
            )}

            <Title order={3} mt="xl" mb="md">Coordinates</Title>
            <LandSpecificItem
              title="Polygon Coordinates"
              value={landDetails.polygon?.join(', ') || 'N/A'}
            />
            <LandSpecificItem
              title="Initial Coordinates"
              value={landDetails.initialCood?.join(', ') || 'N/A'}
            />
            {/* end leaflet map */}

          </Grid.Col>

          <Grid.Col span={4}>
            {landDetails.images && landDetails.images.length > 0 && (
              <>
                <Title order={3} mb="sm">Images</Title>
                {landDetails.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Land image ${index + 1}`}
                    mb="sm"
                  />
                ))}
              </>
            )}
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}