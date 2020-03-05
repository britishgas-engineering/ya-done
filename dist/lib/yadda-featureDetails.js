const Yadda = require('yadda');


function readScenariosFromFeatureFiles(path){
  Yadda.plugins.mocha.StepLevelPlugin.init();
  const features = new Yadda.FeatureFileSearch(path);
  var totalScenarios = [];
      features.list().forEach(file => featureFile(file, (feature) => {
        feature.scenarios.map((ele)=>{
          totalScenarios.push(ele);
        });
      }));

  return totalScenarios;
}

module.exports = readScenariosFromFeatureFiles;
