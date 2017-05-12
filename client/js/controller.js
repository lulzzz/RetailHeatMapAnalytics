var ang= angular.module("prod",[]);
ang.controller("ProdController", function($scope,$http, $location, $anchorScroll){
    $anchorScroll.yOffset = 75;
    $scope.numberofperson=[['Store','Today','Yesterday']];
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
            $scope.dataheatmap=response.data;
            $scope.heatmaptimeline(0);

            //$scope.ShowHide($scope.storeName,$scope.storeImg,response);
        }, function (response) {
            alert(error);
// this function handles error
        });

    }


    $scope.heatmaptimeline=function(hourtime) {


        var testData = {
            min: 0,
            max: 5,
            data: $scope.dataheatmap[hourtime].coord
        };
        heatmapInstance.setData(testData);
    }
    $scope.IsVisible = false;
    $scope.ShowHide = function (storename,storeimg,response) {
        $http.get('/category').then(function(response){

            Highcharts.chart('pastchart3', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Stacked bar chart'
                },
                xAxis: {
                    categories: ['Food', 'Cosmetics', 'Electronics', 'Foot wear', 'Clothes']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total Sales'
                    }
                },
                legend: {
                    reversed: false
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: response.data
            });

        });
        $http.get('/person').then(function (response) {

            $scope.numberofperson=response.data;
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart2);

            function drawChart2(){

                var data= google.visualization.arrayToDataTable($scope.numberofperson);


                var options = {
                    title: 'Customers visiting different stores',
                    'width':1000,
                    'height':400,
                    chartArea: {width: '50%'},
                    hAxis: {
                        title: 'Total Customers',
                        minValue: 0,
                        textStyle: {
                            bold: false,
                            fontSize: 12,
                            color: '#4d4d4d'
                        },
                        titleTextStyle: {
                            bold: true,
                            fontSize: 18,
                            color: '#4d4d4d'
                        }
                    },
                    vAxis: {
                        title: 'Store',
                        textStyle: {
                            fontSize: 14,
                            bold: true,
                            color: '#848484'
                        },
                        titleTextStyle: {
                            fontSize: 18,
                            bold: true,
                            color: '#848484'
                        }
                    }
                };
                var chart = new google.visualization.BarChart(document.getElementById('pastchart2'));
                chart.draw(data, options);
            }
        }, function (response) {
            alert(error);

        });
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
//     $scopoe.currentheatmap=function(store){
//         var data={"storename":store};
//         $http.post('/getcurrentheatmap', data).then(function (response) {
// // This function handles success
//             $scope.currentdata=response.data[0].coord;
//             var testData = {
//                 min: 0,
//                 max: 5,
//                 data: $scope.dataheatmap[hourtime].coord
//             };
//             heatmapInstance.setData(testData);
//
//             //$scope.ShowHide($scope.storeName,$scope.storeImg,response);
//         }, function (response) {
//             alert(error);
// // this function handles error
//         });
//
//     }
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