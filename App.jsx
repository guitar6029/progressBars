import React, { useState } from 'react';
import './style.css';

const App = () => {
  const [rides, setRides] = useState([]);

  const handleCallRide = () => {
    setRides((prevRides) => {
      const newRides = [...prevRides, { rideNum: prevRides.length + 1, progress: 0 }];
      startRideProgress(newRides.length - 1); // Start progress after calling the ride
      return newRides;
    });
  };

  const startRideProgress = (index) => {
    const intervalId = setInterval(() => {
      setRides((prevRides) => {
        const updatedRides = [...prevRides];
        if (updatedRides[index].progress < 100) {
          updatedRides[index].progress += 10;
        } else {
          clearInterval(intervalId); // Stop the interval when progress reaches 100%
        }
        return updatedRides;
      });
    }, 100); // Adjust the interval duration as needed
  };

  const carRide = {
    backgroundColor: 'black',
    width: '100vw',
    marginTop: '1rem',
    height: '50px',
    color: 'yellow',
    display: 'flex',
    flexDirection: 'column',
  };

  const progressBar = {
    backgroundColor: 'gray',
    height: '20px',
  };

  return (
    <div>
      <span>Current Rides Called: {rides.length}</span>
      <br />
      <br />
      <button onClick={handleCallRide}>Call Ride</button>
      {rides &&
        rides.map((ride, index) => {
          return (
            <div key={index} style={carRide}>
              <span>Ride Number: {ride.rideNum}</span>
              <div style={{ ...progressBar, width: `${ride.progress}vw` }}>
                Progress Bar: {ride.progress}%
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default App;
