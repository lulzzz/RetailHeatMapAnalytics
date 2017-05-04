var ang= angular.module("prod",[]);
ang.controller("ProdController", function($scope,$http){

$scope.targetStoreMap=false;
$scope.walmartStoreMap=false;
$scope.costcoStoreMap=false;

$scope.targetStore=function(){
  $scope.targetStoreMap=true;
  $scope.walmartStoreMap=false;
  $scope.costcoStoreMap=false;

}
$scope.walmartStore=function(){
  $scope.targetStoreMap=false;
  $scope.walmartStoreMap=true;
  $scope.costcoStoreMap=false;

};
$scope.costcoStore=function(){
  $scope.targetStoreMap=false;
  $scope.walmartStoreMap=false;
  $scope.costcoStoreMap=true;

}
$scope.products =  [
{category:'Garments',name:'Jeans',quantity:5},
{category:'Garments',name:'Shirts',quantity:10},
{category:'Grocery',name:'Rice',quantity:"100 Kg"},
{category:'Grocery',name:'Bread',quantity:"100 packets"}
];
});
