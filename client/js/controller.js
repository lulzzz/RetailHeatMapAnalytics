var ang= angular.module("prod",[]);
ang.controller("ProdController", function($scope,$http, $location, $anchorScroll){
    $anchorScroll.yOffset = 75;
    $scope.getAnalysis=function(){
        // alert(document.getElementById("datepicker").value);
        $scope.showModal=false;
        var d = new Date(document.getElementById("datepicker").value);
        var data={"storename":$scope.storeName,"dated":d};
        $http.post('/analyticsProduct', data).then(function (response) {
// This function handles success
            $scope.ShowHide($scope.storeName,$scope.storeImg,response);
        }, function (response) {
            alert(error);
// this function handles error
        });
        $http.post('/getheatmapdaily', data).then(function (response) {
// This function handles success
            console.log(response.data);
            // alert(response.data[0].coord)

            var config = {
                container: document.getElementById('heatMap'),
                radius: 17,
                maxOpacity: 1,
                minOpacity: 0,
                blur: .5,

            };
            var heatmapInstance = h337.create(config);

            var testData = {
                min: 0,
                max: 5,
                data: response.data[0].coord
            };
            heatmapInstance.setData(testData);

            for (i=0;i<5;i++){

                var dataPoints = [{x: 120, y: 305, value: 1}, {x: 597, y: 285, value: 1}, {x: 217, y: 449, value: 1}, {x: 377, y: 76, value: 1}, {x: 487, y: 164, value: 1}, {x: 247, y: 194, value: 1},{x: 256, y: 201, value: 1}, {x: 500, y: 250, value: 1}, {x: 207, y: 130, value: 1}, {x: 88, y: 321, value: 1}, {x: 176, y: 219, value: 1}, {x: 300, y: 264, value: 1}, {x: 57, y: 231, value: 1} ]

                var dataPoints = [{x: 120, y: 505, value: 1}, {x: 597, y: 285, value: 1}, {x: 217, y: 449, value: 1}, {x: 377, y: 656, value: 1}, {x: 467, y: 509, value: 1}, {x: 487, y: 164, value: 1}, {x: 247, y: 194, value: 1},{x: 809, y: 584, value: 1}, {x: 500, y: 250, value: 1}, {x: 207, y: 430, value: 1}, {x: 388, y: 565, value: 1}, {x: 476, y: 519, value: 1}, {x: 400, y: 264, value: 1}, {x: 257, y: 231, value: 1} ]

                function getRandomIndex (low, high) {
                    return Math.floor(Math.random() * (high - low + 1) + low);
                }
                var getrandomDensity = [dataPoints[getRandomIndex(0,13)],dataPoints[getRandomIndex(0,13)],dataPoints[getRandomIndex(0,13)]]

                heatmapInstance.addData(getrandomDensity);

            }


            //$scope.ShowHide($scope.storeName,$scope.storeImg,response);
        }, function (response) {
            alert(error);
// this function handles error
        });
    }

    $scope.IsVisible = false;
    $scope.ShowHide = function (storename,storeimg,response) {
        console.log(response.data);
        Highcharts.chart('pastchart1', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Products Purchased'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Products',
                colorByPoint: true,
                data: response.data
            }]
        });
        //If DIV is visible it will be hidden and vice versa.
        $scope.backimage ={backgroundImage: "url('images/"+ storeimg+"')" };
        $scope.IsVisible = true;
        //	alert("store"+store);
    }
    $scope.show = function (store) {
        //If DIV is visible it will be hidden and vice versa.
        $scope.backimage ={backgroundImage: "url('images/"+ store+"')" };
        $scope.IsVisible = true;
        //	alert("store"+store);
    }

    $scope.showModal = false;
    $scope.toggleModal = function(img,name){
        $scope.storeName=name;
        $scope.storeImg = img;
        $scope.showModal = !$scope.showModal;

    };

    $scope.costcoHeatMap = function(store){
        $scope.costcoStoreMap=true;
        $scope.costcoMap=true;
        $scope.bimage ={backgroundImage: "url('images/"+ store+"')" };
    }

    $scope.costcoStore = function(){
        $("#costcoNavBar").addClass("active");
        $("#targetNavBar").removeClass("active");
        $("#walmartNavBar").removeClass("active");
        $scope.costcoStoreMap = true;
        $scope.targetStoreMap = false;
        $scope.walmartStoreMap = false;
        $(".tab-pane").addClass("fade");
        $("#costcoStoreMap .tab-pane").eq(0).removeClass("fade");
        $location.hash('costcoStoreMap');
        $anchorScroll();
    }

    $scope.targetStore = function(){
        $("#targetNavBar").addClass("active");
        $("#walmartNavBar").removeClass("active");
        $("#costcoNavBar").removeClass("active");
        $scope.targetStoreMap = true;
        $scope.costcoStoreMap = false;
        $scope.walmartStoreMap = false;
        $(".tab-pane").addClass("fade");
        $("#targetStoreMap .tab-pane").eq(0).removeClass("fade");
        $location.hash('targetStoreMap');
        $anchorScroll();
    }
    $scope.walmartStore = function(){
        $("#walmartNavBar").addClass("active");
        $("#targetNavBar").removeClass("active");
        $("#costcoNavBar").removeClass("active");
        $scope.targetStoreMap = false;
        $scope.costcoStoreMap = false;
        $scope.walmartStoreMap = true;
        $(".tab-pane").addClass("fade");
        $("#walmartStoreMap .tab-pane").eq(0).removeClass("fade");
        $location.hash('walmartStoreMap');
        $anchorScroll();
    }


    // $scope.products =  [
    //     {category:'Garments',name:'Jeans',quantity:5},
    //     {category:'Garments',name:'Shirts',quantity:10},
    //     {category:'Grocery',name:'Rice',quantity:"100 Kg"},
    //     {category:'Grocery',name:'Bread',quantity:"100 packets"}
    // ];
    $scope.getCatalog=function (storename) {
        $scope.storeprod=storename;

    }
    var ajax_call = function() {
        var data = {"store":$scope.storeprod};
        if(typeof $scope.storeprod != 'undefined') {
            $http.post('/productCatalog', data).then(function (response) {

                $scope.products = response.data;
// This function handles success
                $scope.ShowHide($scope.storeName, $scope.storeImg, response);
            }, function (response) {
                alert(error);
// this function handles error
            });
        }
    };

    var interval = 4000; // where X is your every X minutes

    setInterval(ajax_call, interval);
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