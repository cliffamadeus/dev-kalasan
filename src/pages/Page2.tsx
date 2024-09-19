import React, { useState, useRef } from 'react';
import { 
  IonButtons, 
  IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonButton, IonIcon
} from '@ionic/react';
import { albums, camera } from 'ionicons/icons';
import './Page2.css';
import EXIF from 'exif-js';

interface ExifData {
  [key: string]: string;
}

const Page2: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const fileString = e.target.result as string;
          console.log('File string:', fileString);
          handleImageInput(fileString);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleImageInput = (fileString: string) => {
    if (fileString) {
      EXIF.getData(fileString, (exifData: { GPSLatitude: any; GPSLongitude: any; DateTimeOriginal: any; GPSLatitudeRef: string; GPSLongitudeRef: string; }) => {
        console.log('EXIF data:', exifData);
        const lat = exifData.GPSLatitude;
        const lon = exifData.GPSLongitude;
        const date = exifData.DateTimeOriginal;

        if (lat && lon) {
          const latRef = exifData.GPSLatitudeRef || "N";
          const lonRef = exifData.GPSLongitudeRef || "W";
          const latValue = (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef === "N" ? 1 : -1);
          const lonValue = (lon[0] + lon[1] / 60 + lon[2] / 3600) * (lonRef === "W" ? -1 : 1);

          setLatitude(latValue.toString());
          setLongitude(lonValue.toString());
        } else {
          setLatitude('No GPS data');
          setLongitude('No GPS data');
        }

        if (date) {
          setDateTime(date);
        } else {
          setDateTime('No date data');
        }
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Page 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Page 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Add Record</IonCardTitle>
            <IonCardSubtitle>Select an image with EXIF Metadata to start</IonCardSubtitle>
          </IonCardHeader>

          <div className="plant-flex-container">
            <IonButton onClick={handleButtonClick}>
              <IonIcon slot="start" icon={albums}></IonIcon>        
              Gallery
            </IonButton>
            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={handleFileChange}
            />
            {selectedFile && (
              <p>Selected file: {selectedFile.name}</p>
            )}
            
            <IonButton>
              <IonIcon slot="start" icon={camera}></IonIcon>
              Camera
            </IonButton>
          </div>

          <IonCardContent>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <p>Date Time: {dateTime}</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Page2;