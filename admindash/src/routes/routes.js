
// Doctor Routes
import DocAvailability from '../components/doctor/DocAvailability';
import EditAvailability from '../components/doctor/EditAvailability';
import DocCalendar from '../components/doctor/DocCalendar'
// import DocMessages from '../components/doctor/DocMessages'
import DocPatient from '../components/doctor/DocPatient'
import DocProfile from '../components/doctor/DocProfile';



// Assiss Routes

import AssissCalendar from '../components/assisstant/AssissCalendar';
import AssissEditPatient from '../components/assisstant/AssissEditPatient'
import AssissPatient from '../components/assisstant/AssissPatient';
import AssissProfile from '../components/assisstant/AssissProfile';
import AssissAddPatient from '../components/assisstant/AssissAddPatient';





const routes = [

    // doctor paths
    { path: '/doctor', exact:true, name: 'Doctor'},
    { path: '/doctor/DocAvailability', exact:true, name: 'DocAvailability', component:DocAvailability},
    { path: '/doctor/EditAvailability/:id', exact:true, name: 'EditAvailability', component:EditAvailability},
    { path: '/doctor/DocCalendar', exact:true, name: 'DocCalendar', component:DocCalendar},
    // { path: '/doctor/DocMessages', exact:true, name: 'DocMessages', component:DocMessages},
    { path: '/doctor/DocPatient', exact:true, name: 'DocPatient', component:DocPatient},
    { path: '/doctor/DocProfile', exact:true, name: 'DocProfile', component:DocProfile},
   


    

    // assisstant paths
    { path: '/assisstant', exact:true, name: 'Assisstant'},
    { path: '/assisstant/AssissCalendar', exact:true, name: 'AssissCalendar', component:AssissCalendar},
    { path: '/assisstant/AddPatient', exact:true, name: 'AssissAddPatient', component:AssissAddPatient},
    { path: '/assisstant/edit_patient/:id', exact:true, name: 'AssissEditPatient', component:AssissEditPatient},
    { path: '/assisstant/AssissPatient', exact:true, name: 'AssissPatient', component:AssissPatient},
    { path: '/assisstant/AssissProfile', exact:true, name: 'AssissProfile', component:AssissProfile},
   
];

export default routes;