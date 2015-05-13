/**
 * Created by Gaurav MphRx on 5/13/2015.
 */
angular.module('appDirectives', []).directive('addWidgetModal', function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {},
        templateUrl: 'widgets/addWidgetModal.html'
    };
})