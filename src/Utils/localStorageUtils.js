export const getLocalData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } 
  catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return null;
  }
};  

export const setLocalData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } 
  catch (e) {
    console.error(`Error setting ${key} to localStorage`, e);
  }
};