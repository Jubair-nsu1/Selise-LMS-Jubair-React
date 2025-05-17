import { setLocalData, getLocalData } from './localStorageUtils';
import { sampleCourses, sampleEnrollments, sampleUser } from './sampleData';

export const initializeLocalStorage = () => {
  if (!getLocalData('courses')) setLocalData('courses', sampleCourses);
  if (!getLocalData('enrollments')) setLocalData('enrollments', sampleEnrollments);
  if (!getLocalData('user')) setLocalData('user', sampleUser);
};