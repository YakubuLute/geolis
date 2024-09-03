import { Notification } from '@mantine/core';
import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}


const uploadToCloudinary = async (file, resourceType) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'geolis');
  formData.append('cloud_name', 'dl6ibklbe');

  // https://api.cloudinary.com/v1_1/${cloudName}/upload
  const response = await fetch(`https://api.cloudinary.com/v1_1/dl6ibklbe/dl6ibklbe/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    console.log('Error uploading files');
    // throw new Error('Failed to upload to Cloudinary');
    return (<>
      <Notification title="Error">
        Error uploading images/videos
      </Notification>
    </>)
  }

  const data = await response.json();
  console.log("Response from claudinary", data)
  return data.secure_url;
};