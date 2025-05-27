
export const getAuthToken=()=>{
  return localStorage.getItem('fd_token')
}
export const isAuthorized = ()=> {
  return !!getAuthToken();
};

export const setAuthToken = (token)=>{
  localStorage.setItem('fd_token', token);
}

export const logOutUser = ()=>{
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload()
}



// costum data set calander view 
export const refactorCanlenederView = (data)=>{
   

const events = data.map((appt) => {
  console.log(appt)
  const start = new Date(appt.dateTime);
  const end = new Date(start.getTime() + appt.duration * 60000); // add minutes
  return {
    id: appt._id,
    title: appt.title,
    start,
    end,

    resource: {
      description: appt.description,
      location: appt.location,
      userId: appt.userId,
    },
  };
});
return events

}

// react-calender data to api format
export const convertEventToApiFormat = (event, newStart, newEnd) => {
  const startTime = newStart || event.start;
  const endTime = newEnd || event.end;

  const duration = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000; // in minutes

  return {
    id: event.id,
    title: event.title,
    description: event.resource?.description || '',
    dateTime: new Date(startTime).toISOString(),
    duration
  };
};


// generate preview and map from lat and lng
export const generateOsmIframeUrl = (lat, lng) => {
  const delta = 0.01;
  const south = lat - delta;
  const north = lat + delta;
  const west = lng - delta;
  const east = lng + delta;

  const bbox = `${west},${south},${east},${north}`;
  const marker = `${lat},${lng}`;

  return {
    iframeUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`,
    linkUrl: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`
  };
};



