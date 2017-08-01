function RatesService($http) {
  'ngInject';

  const url = 'http://www.mocky.io/v2/5955dc852900001e01cd70b7';
  let data = null;

  /* Loads the rates from the supplied endpoint.
   * If the data has already been loaded, the locally cached version gets returned.
   */
  this.getRates = () => {
    return new Promise((resolve, reject) => {
      this.fetchData()
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  /* Downloads a new data set or returns a local copy depending on whether the
   * data exists in cache.
   */
  this.fetchData = () => {
    return new Promise((resolve, reject) => {
      if (data) {
        /* Data exists, resolve with local copy */
        resolve(data);
      } else {
        /* Data doesn't exist, so it will be downloaded */
        $http.get(url)
        .then(response => {
          data = response;
          /* Resolve with downloaded data */
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
      }
    });
  };

  /* Returns the item with the specified duration */
  this.getRateForDuration = duration => {
    if (!data) {
      return {};
    }

    return data.data.filter(obj => {
      return obj.duration === duration;
    })[0];
  };
}

export default RatesService;

