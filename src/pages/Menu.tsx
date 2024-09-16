import React from 'react';
import { IonButton, IonContent, IonHeader, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { homeOutline, newspaperOutline, logOutOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Home from './Home';
import Page1 from './Page1'
import Page2 from './Page2';
import Details from './Details';
import About from './About/About';
import './Home.css';


const Menu: React.FC = () => {
  const sidemenuItems = [
    {
      name:'Home',
      url:'/kalasan-cam/app/home',
      icon:homeOutline
    },
    {
      name:'Page 1',
      url:'/kalasan-cam/app/page1',
      icon:homeOutline
    },
    {
      name:'Page 2',
      url:'/kalasan-cam/app/page2',
      icon:newspaperOutline
    },
    {
      name:'About',
      url:'/kalasan-cam/app/about',
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
        
        <Route exact path="/kalasan-cam/app/home" component={Home} />
        <Route exact path="/kalasan-cam/app/page1" component={Page1} />
        <Route exact path="/kalasan-cam/app/page1/details" component={Details} />
        <Route exact path="/kalasan-cam/app/page2" component={Page2} />
        <Route exact path="/kalasan-cam/app/About" component={About} />
        <Route exact path="/kalasan-cam/app">
          <Redirect to="/kalasan-cam/app/home" />
        </Route>

      </IonRouterOutlet>
    </IonSplitPane>
  </IonPage>
  );
};

export default Menu;
