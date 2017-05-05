var ang= angular.module("prod",[]);
ang.controller("ProdController", function($scope,$http){

      $scope.IsVisible = false;
            $scope.ShowHide = function (store) {
                //If DIV is visible it will be hidden and vice versa.
			$scope.backimage ={backgroundImage: "url('images/"+ store+"')" };
                $scope.IsVisible = true;
			//	alert("store"+store);
            }
    $scope.showModal = false;
    $scope.toggleModal = function(img,name){
		//alert("",img);
        $scope.showModal = !$scope.showModal;
    };
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

ang.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
			  
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });