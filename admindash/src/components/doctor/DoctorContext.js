import React, { createContext, useContext, useState } from 'react';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctorData, setDoctorData] = useState({
    start_time: '',
    end_time: '',
  });

  return (
    <DoctorContext.Provider value={{ doctorData, setDoctorData }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctorContext = () => useContext(DoctorContext);
