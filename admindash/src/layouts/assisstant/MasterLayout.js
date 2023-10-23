import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import SideNav from './SideNav';
import Footer from './Footer';
import routes from '../../routes/routes';

const MasterLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };
  return (
    <div className="wrapper">
      <SideNav isCollapsed={isCollapsed} />

      <div className='main'>
        <Navbar toggleSidebar={toggleSidebar}/>
        
        <main className='content'>
          <div className='main'>
            <Switch>
              {routes.map((route, idx) => {
                return (
                  route.component && (
                    <Route 
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <route.component {...props}/>
                      )}
                    />
                  )
                )
              })}
              <Redirect from="/doctor" to="/doctor/dashboard"/>
            </Switch>
          </div>
        </main>
        <Footer className="footer" />
        

      </div>
      
     
    </div>
  );
}

export default MasterLayout;
