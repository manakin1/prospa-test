import angular from 'angular';

import {main} from './app/main';
import {appHeader} from './app/header';
import {CalculatorModule} from './app/calculator/calculator.module';

import './styles/index.scss';

angular
  .module('app', [CalculatorModule])
  .component('app', main)
  .component('appHeader', appHeader);
