import template from './number-picker.html';

function NumberPickerController($scope, Settings) {
  /* --- Scope methods --- */

  /* Returns an array of the supplied length to render a specific number of items. */
  $scope.getNumber = num => {
    return new Array(num);
  };

  $scope.selectNumber = (e, num) => {
    e.preventDefault();
    $scope.$emit(Settings.events.LOAN_DURATION_UPDATED, num);
  };
}

export const NumberPickerComponent = {
  template,
  controller: NumberPickerController,
  require: {
    parent: '^calculatorComponent'
  },
  bindings: {
    numberSelected: '<',
    numMin: '<',
    numTotal: '<'
  }
};
