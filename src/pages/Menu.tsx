import React from 'react';
import { IonButton, IonContent, IonHeader, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { homeOutline, newspaperOutline, logOutOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Home from './Home';
import Page1 from './Page1'
import Details from './Details';
import About from './About/About';
import Test from './Test';
import './Home.css';


const Menu: React.FC = () => {
  const sidemenuItems = [
    {
      name:'Home',
      url:'/dev-kalasan/app/home',
      icon:homeOutline
    },
    {
      name:'Page 1',
      url:'/dev-kalasan/app/page1',
      icon:homeOutline
    },
    {
      name:'Test',
      url:'/dev-kalasan/app/test',
      icon:newspaperOutline
    },
    {
      name:'About',
      url:'/dev-kalasan/app/about',
      icon:newspaperOutline
    }
  ]

  return (
    <IonPage>
    <IonSplitPane contentId="main">
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          {/* Sidemenu Items*/}
          {sidemenuItems.map((item, index) => (
            <IonMenuToggle key={index}>
              <IonItem routerLink={item.url} routerDirection="forward">
                {item.name}
              </IonItem>
            </IonMenuToggle>
          ))}

          <IonButton 
            routerLink="/" 
            routerDirection="back" 
            expand="full" 
            color="landong-secondary text-white"
            > 
            <p className="home-tab">Logout</p>
          </IonButton>
        </IonContent>
      </IonMenu>


      {/* Routers */}
      <IonRouterOutlet id="main">
        
        <Route exact path="/dev-kalasan/app/home" component={Home} />
        <Route exact path="/dev-kalasan/app/page1" component={Page1} />
        <Route exact path="/dev-kalasan/app/page1/details" component={Details} />
        <Route exact path="/dev-kalasan/app/test" component={Test} />
        <Route exact path="/dev-kalasan/app/About" component={About} />
        <Route exact path="/dev-kalasan/app">
          <Redirect to="/dev-kalasan/app/home" />
        </Route>

      </IonRouterOutlet>
    </IonSplitPane>
  </IonPage>
  );
};

export default Menu;
