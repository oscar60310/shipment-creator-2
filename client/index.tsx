/*global document */
import * as React from 'react';
import { render } from 'react-dom';
import AppComponent from './components/app';

const app = document.getElementById('app');
render(<AppComponent />, app);
