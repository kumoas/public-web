export const environment = {
  production: true,
  API_URL: window.location.protocol+"//"+ window.location.hostname +"/api/"+localStorage.getItem('hosted_region')
  ,
};
