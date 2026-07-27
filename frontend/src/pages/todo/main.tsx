import React from 'react';
import ReactDOM from 'react-dom/client';
import { TodoDetailPage } from './TodoDetailPage';
import '../../styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><TodoDetailPage /></React.StrictMode>
);