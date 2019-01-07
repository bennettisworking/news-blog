// Config section is pretty simple
// List and post view paths are defined here
//
let app = angular
.module('betterBlog',['ngRoute', 'ngAnimate'])
.controller('pageController', pageController)
.controller('sidebarController', sidebarController)
.filter('timeSince',timeSince)
.factory('dataService', dataService)
.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../partials/list.html',
			controller: 'pageController'
		})
		.when('/post/:id', {
			templateUrl: '../partials/post.html',
			controller: 'pageController'
		})
		.otherwise({
			redirectTo: '/'
		});
});

function pageController($http, $scope, dataService, $routeParams){
	$scope.postId = $routeParams.id;
	$scope.bgBackup = 'https://media.npr.org/assets/img/2016/11/06/gettyimages-73999058_wide-7742067322b55167ce587870f714dba3699fdd2e.jpg?s=800';
	$scope.hoverEffect = function(e){
		e.target.style.opacity = .3;
	}
	$scope.removeHover = function(e){
		e.target.style.opacity = 0;
	}
	//$scope.defaultImage = 'https://i.imgur.com/LWWlGdz.jpg';
	dataService.getNews('pink+floyd').then(function(data){
		$scope.news=data;
		console.log(data);
	});

}

function sidebarController($http, $scope){

}

function timeSince(){
	return function(time){
		let timeStamp = new Date(time),
		now = new Date(),
		secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
		if(secondsPast < 60){
			return parseInt(secondsPast) + 's';
		}
		if(secondsPast < 3600){
		    return parseInt(secondsPast/60) + 'm';
		}
		if(secondsPast <= 86400){
		    return parseInt(secondsPast/3600) + 'h';
		 }
		if(secondsPast > 86400){
		    day = timeStamp.getDate();
		    month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
		    year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
		    return day + " " + month + year;
		}
	}
};

function dataService($http){
	//API KEY: d6787aa40f3340469a934e270196e0c7
	return{
		getNews: function(subject){
			let API_KEY = 'd6787aa40f3340469a934e270196e0c7';
			let str = 'https://newsapi.org/v2/everything?q=' + subject + '&sortBy=publishedAt&apiKey=' + API_KEY;
    		let call = $http.get(str).then(function(response){
		      //console.log(data);
		      return response.data;
		    });
		    //console.log(call);
		    return call;
		}
	};
}