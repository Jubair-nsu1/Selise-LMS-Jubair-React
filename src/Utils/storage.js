export const initializeLocalStorage = () => {
  if (!localStorage.getItem('myAppData')) {
    localStorage.setItem('myAppData', JSON.stringify({}));
  }
};

export const getLocalData = (key) => {
  const data = JSON.parse(localStorage.getItem('myAppData'));
  return data ? data[key] : null;
};