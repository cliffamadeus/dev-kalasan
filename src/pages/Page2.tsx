import React, { useState } from 'react';
import { IonButtons, 
  IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonButton, IonIcon
} from '@ionic/react';
import { albums, camera } from 'ionicons/icons';
import './Page2.css';


const Page2: React.FC = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const inputRef = React.createRef<HTMLInputElement>();


  const handleButtonClick = () => {

    inputRef.current?.click();

  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];

    setSelectedFile(file);

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
    
    
      <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
    </IonCard>
       
      </IonContent>
    </IonPage>
  );
};

export default Page2;
