import template from './calculator.html';

function CalculatorController($scope, $filter, Settings, RatesService) {
  /* --- Scope variables --- */

  $scope.loanAmount = 30000;
  $scope.loanAmountFormatted = $filter('number')($scope.loanAmount);
  $scope.loanDuration = 12;
  $scope.numRepayments = 0;
  $scope.dailyPayment = 0;
  $scope.errorMessage = null;

  /* AngularAwesomeSlider settings */
  $scope.sliderOptions = {
    className: 'c-slider',
    dimension: '$',
    from: 0,
    realtime: true,
    to: 250000,
    smooth: true,
    step: 1
  };

  $scope.sliderSteps = [
    5000, 50000, 100000, 150000, 250000
  ];

  /* --- Scope methods --- */

  /* Strips the comma formatting from the text input value and updates the slider value
   * with the correct number.
   */
  $scope.inputChangeHandler = () => {
    const val = $scope.loanAmountFormatted.replace(',', '');
    $scope.loanAmount = Math.min(val, $scope.sliderOptions.to);
  };

  /* --- Lifecycle hooks --- */

  /* Loads rates from the supplied endpoint and displays an error message if the data fails
   * to load.
   */
  this.$onInit = () => {
    RatesService.getRates()
    .then(() => {
      $scope.errorMessage = null;
      setUpdateHandlers();
      calculateNewRate();
      $scope.$apply();
    })
    .catch(() => {
      $scope.errorMessage = 'Something went wrong! Please try again later.';
    });
  };

  /* --- Private functions --- */

  function setUpdateHandlers() {
    /* Listens to an update event from numberPickerComponent and updates the loanDuration
     * value accordingly.
     */
    $scope.$on(Settings.events.LOAN_DURATION_UPDATED, (event, month) => {
      $scope.loanDuration = month;
      calculateNewRate();
    });

    /* Displays the text box contents in currency format when the slider value has been updated.
     * This has to be done manually as ng-model bound to an input element can't be filtered.
     */
    $scope.$watch('loanAmount', (newValue, oldValue, scope) => {
      scope.loanAmountFormatted = $filter('number')(newValue);
      calculateNewRate();
    });
  }

  /* Calculates repayment amounts based on the loan amount and duration. */
  function calculateNewRate() {
    const rate = RatesService.getRateForDuration($scope.loanDuration);
    $scope.numRepayments = rate.duration * 30;
    $scope.dailyPayment = parseInt(($scope.loanAmount / $scope.numRepayments) * rate.rate, 0);
  }
}

export const CalculatorComponent = {
  template,
  controller: CalculatorController
};
