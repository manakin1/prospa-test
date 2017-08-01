import template from './application-form.html';

function ApplicationFormController($scope, Settings, ApplicationService) {
  $scope.applicantDetails = {};

  $scope.submitHandler = e => {
    e.preventDefault();
    if ($scope.form.$valid) {
      ApplicationService.sendApplication($scope.applicantDetails);
    }
  };
}

export const ApplicationFormComponent = {
  template,
  controller: ApplicationFormController
};
