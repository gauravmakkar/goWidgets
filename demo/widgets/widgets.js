'use strict';

angular.module('myApp.widgets', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/widgets', {
            templateUrl: 'widgets/widgets.html',
            controller: 'WidgetCtrl',
            context:'Orders'
        });
        $routeProvider.when('/contactUs', {
            templateUrl: 'widgets/contactUs.html',
            controller: 'WidgetCtrl',
            context:'Contact Us'
        });
    }])

    .controller('WidgetCtrl', function ($scope,$modal,widgets,$route) {
        $scope.activeMenu=$route.current.context
        $scope.items =widgets.returnWidgets()


        $scope.addWidget = function () {
            var modalInstance= $modal.open({
                templateUrl: 'widgets/addWidgetModal.html',
                controller:'ModalCtrl',
                size: '',
                scope:$scope
            });
        };
        $scope.editWidget=function(orderNo){
            $scope.widget=widgets.findWidgetByOrderNo(orderNo)
            $scope.widget.editMode=true
            var modalInstance= $modal.open({
                templateUrl: 'widgets/addWidgetModal.html',
                controller:'ModalCtrl',
                size: '',
                scope:$scope
            });
        }
        $scope.removeWidget=function(orderNo){
            widgets.removeWidget(orderNo)
        }


    }).controller('ModalCtrl',function($scope,$modalInstance,widgets){
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        }

        $scope.createWidget = function () {
            var newWidget = $scope.widget
            if (!$scope.widget.editMode) {
                widgets.addWidget(newWidget)
            }

            $modalInstance.dismiss('cancel');
        }

    }).service('widgets',function(){
        var widgets=[{orderNo: "101", quantity: 5, "locality": "Phase 3, Gurgaon", "Bill": "1200"}, {
            orderNo: "102",
            quantity: 13,
            "locality": "Phase 1, Gurgaon",
            "Bill": "2300"
        }, {orderNo: "103", quantity: 42, "locality": "Shushant Lok, Gurgaon", "Bill": "18000"}, {
            orderNo: "104",
            quantity: 9,
            "locality": "Near RBS, Gurgaon",
            "Bill": "2800"
        }, {orderNo: "105", quantity: 9, "locality": "Near RBS, Gurgaon", "Bill": "2800"}]
        this.returnWidgets=function(){
            return widgets
        }
        this.addWidget=function(newWidget){
            widgets.push(newWidget)
        }
        this.removeWidget = function (orderNo) {
            widgets.forEach(function (item, index) {
                if (item.orderNo == orderNo) {

                    widgets.splice(index, 1);
                }
            })
        }
        this.findWidgetByOrderNo=function(orderNo){
            var returnWidget={}
            widgets.forEach(function (item, index) {
                if (item.orderNo == orderNo) {
                    returnWidget=item

                }
            })
            return returnWidget
        }
    });