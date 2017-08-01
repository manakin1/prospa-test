function ApplicationService($log) {
  'ngInject';

  this.sendApplication = data => {
    $log.log('Sending application:', data);
  };
}

export default ApplicationService;

