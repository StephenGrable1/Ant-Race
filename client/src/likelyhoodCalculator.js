function generateAntWinLikelihoodCalculator() {
    var delay = 1000 + Math.random() * 1000;
    var likelihoodOfAntWinning = Math.random();
  
    return function(callback) {
      setTimeout(function() {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

export default generateAntWinLikelihoodCalculator;