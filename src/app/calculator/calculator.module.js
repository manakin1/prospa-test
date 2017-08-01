import angular from 'angular';

import {CalculatorComponent} from './calculator.component';
import {NumberPickerComponent} from './components/number-picker/number-picker.component';
import {ApplicationFormComponent} from './components/application-form/application-form.component';

import Settings from '../services/settings.service';
import RatesService from '../services/rates.service';
import ApplicationService from '../services/application.service';

import 'angular-awesome-slider';

export const CalculatorModule = 'calculatorModule';

angular
  .module('calculatorModule', ['angularAwesomeSlider'])
  .component('calculatorComponent', CalculatorComponent)
  .component('numberPickerComponent', NumberPickerComponent)
  .component('applicationFormComponent', ApplicationFormComponent)
  .service('Settings', Settings)
  .service('RatesService', RatesService)
  .service('ApplicationService', ApplicationService);
