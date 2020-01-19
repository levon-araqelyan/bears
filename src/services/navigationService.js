export const navigationService = {};
navigationService.hisory = "";

navigationService.setHistory = history => {
  navigationService.hisory = { ...history };
};

navigationService.navigate = path => {
  if (navigationService.hisory) {
    navigationService.hisory.push(path);
  }
};
