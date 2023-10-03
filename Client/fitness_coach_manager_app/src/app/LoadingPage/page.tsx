import { LoadingProps } from '@/domain/entities/loading.types';
import React from 'react';
import './LoadingPage.css';

export const page = () => {
  return (
    <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
  )
}

export default page;
