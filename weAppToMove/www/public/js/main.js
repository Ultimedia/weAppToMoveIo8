

var appData = {
  views: {},
  models: {},
  routers: {},
  utils: {},
  collections: {},
  adapters: {},
  settings: {},
  data: {},
  helpers: {},
  messages: {},
  services: {},
  events: {},
  forms: {},
  garbage: {},
  storage: {}
};


// settings
appData.settings.rootPath = "http://localhost/";
appData.settings.forwardPath = "http://localhost/";
appData.settings.servicePath =  appData.settings.rootPath + "services/";
appData.settings.imagePath = appData.settings.rootPath + "common/uploads/";
appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";
appData.settings.iconPath = appData.settings.rootPath + "public/css/assets/";
appData.settings.sportsPath = appData.settings.rootPath + "common/sports/";
appData.settings.promoPath = appData.settings.rootPath + "common/promo/";
appData.settings.avatarPath = "common/avatar/";

appData.settings.getUserService = "getUser.php";
appData.settings.getUsersService = "getUsers.php";
appData.settings.addUserService = "addUser.php";
appData.settings.getSportsService = "getSports.php";
appData.settings.getActivitiesService = "getActivities.php";
appData.settings.getMessagesService = "getMessages.php";
appData.settings.getChallengesService = "getChallenges.php";
appData.settings.createActivityService = "createActivityService.php";
appData.settings.getUserFromFacebookID = "getUserFromFacebookID.php";
appData.settings.facebookUserToSQL = "facebookUserToSQL.php";
appData.settings.addMessageService = "addMessage.php";
appData.settings.getMediaService = "getMedia.php";
appData.settings.createActivityService = "createActivity.php";
appData.settings.getActivityUserService = "getActivityUser.php";
appData.settings.setGoingToActivityService = "setGoingToActivity.php";
appData.settings.getBuurtenService = "getBuurten.php";
appData.settings.getLocationsService = "getLocations.php";
appData.settings.addLocationService = "addLocation.php";
appData.settings.getMyPlannedActivities = "getMyPlannedActivities.php";
appData.settings.getMyActivities = "getMyActivities.php";
appData.settings.getFavouriteSportsService = "getFavouriteSports.php";
appData.settings.addFavouriteSportsService = "addFavouriteSports.php";
appData.settings.getUserFavouriteSportsService = "getUserFavouriteSports.php";
appData.settings.imageUploadService = "uploadService.php";
appData.settings.addPhotoToDatabase = "addPhotoToDatabase.php";
appData.settings.getMyAvatarService = "getMyAvatar.php";
appData.settings.getUserChallengesService = "getUserChallengesService.php";
appData.settings.updateAvatarService = "updateAvatar.php";
appData.settings.getMyChallengesService = "getMyChallenges.php";
appData.settings.joinChallengeService = "joinChallenge.php";
appData.settings.getBadgesService = "getBadges.php";
appData.settings.updateChallengeService = "updateChallengeScore.php";
appData.settings.addSportService = "addSport.php";
appData.settings.getFriendsService = "getMyFriends.php";
appData.settings.addFriendService = "addFriend.php";
appData.settings.getMyInvitationsService = "getMyInvitations.php";
appData.settings.inviteFriendsService = "inviteFriends.php";
appData.settings.handleInvitationsService = "handleInvitation.php";
appData.settings.removeFriendService = "removeFriend.php";
appData.settings.updateUserAvatarService = "updateUserAvatar.php";
appData.settings.uploadMediaNonNativeService = "uploadMediaNonNative.php";
appData.settings.updateActivityService = "updateActivity.php";
appData.settings.getUserMediaService = "getUserMedia.php";
appData.settings.getChallengesCount = "getChallengesCount.php";

appData.settings.defaultLocation = [51.208723, 3.223860];
appData.settings.dataLoaded = false;
appData.settings.userLoggedIn = false;

// messages
appData.messages.passwordIncorrect = "Je paswoord is niet correct";
appData.messages.noUser = "Er werd geen gebruiker met dit email adres gevonden, je kan <a href='#createUser'>hier</a> een nieuwe gebruiker aanmaken.";

appData.start = function(nativeApp){
  appData.settings.native = nativeApp;

  function doOnOrientationChange()
  {
    switch(window.orientation) 
    {  
      case -90:
      case 90:
        $('#container').addClass('landscape').removeClass('portrait');
        break; 
      default:
        $('#container').addClass('portrait').removeClass('landscape');
        break; 
    }
  }

  // show the keyboard
  function showKeyboardHandler(){
    $('#container').addClass('keyboard');
  }

  // hide keyboard
  function hideKeyboardHandler(){
    $('#container').removeClass('keyboard');
  }

  // phonegap device ready
  function onDeviceReadyHandler() {
      // Now safe to use the PhoneGap API
      appData.settings.phonegapLoaded = true;
  }

  // phonegap when the user returns to the app after minimizing it
  function onResumeHandler(){ 

  }

  // phonegap device offline
  function deviceOnlineHandler(){
    $('#container').addClass('online').removeClass('offline');

    appData.settings.network = true;
    Backbone.trigger('networkFoundEvent');
    
    // back to the landing page
    window.localStorage.clear()

    // not signed in
    appData.settings.userLoggedIn = false;
    appData.settings.storageFound = false;
    appData.settings.dataLoaded = false;

    // back to the landing page
    location.reload(); 
  }

  // phonegap device back online
  function deviceOfflineHandler(){
    $('#container').removeClass('online').addClass('offline');

    appData.settings.network = false;
    Backbone.trigger('networkLostEvent');
  }


  $( document ).ready(function() {

  appData.router = new appData.routers.AppRouter();
  appData.utils.templates.load(["HomeView", "DashboardView", "PlannerView", "ProfileView", "ActivityDetailView", "CreateActivityView", "CreateUserView", "NavigationView", "SettingsView", "SportSelectorView", "DashboardActivityView", "LoadingView", "HelperView", "ChallengeListView", "ActivityMessageView", "ActivityMessageView", "ActivityInfoView", "ActivityMediaView", "ActivityMessagesView", "ActivityMediaViewer", "ActivityInfoView", "CreateActivityLocationView", "CreateActivityInfoView", "CreateActivityWieView", "ProfileAvatarView", "ProfileChallengeView", "ProfileFriendsView", "FriendsListView", "FriendView", "ActivityUserView", "PlannerMyActivitiesView", "GoogleMapView", "FavouriteSportListView", "ActiveChallengeListView", "BadgeListView", "FriendInvitieView", "PlannerInvitedActivitiesView", "NoConnectionView", "AvatarDisplayView", "PlannerTimelineWrap", "FavouriteSportListSettingView"],

  // backbone loaded
  function () {

      appData.models.userModel = new User();

      appData.forms.sortOptions = [{"title": "Datum"},{"title": "Afstand"}, {"title": "Mijn Favoriete Sporten"}];
      appData.collections.sortOptions = new SortOptionsCollection(appData.forms.sortOptions);

      // menu
      $("#mainMenu").mmenu({
        // options object
        dragOpen: false
      });

      $('#menuAvatarSection').click(function(){
        window.location.hash = "#profile";
      });

      // New services class
      appData.services.phpService = new appData.services.PhpServices();
      appData.events.getMessagesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getSportsSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getChallengesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMyActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInErrorEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInPasswordErrorEvent = _.extend({}, Backbone.Events);
      appData.events.createUserEvent = _.extend({}, Backbone.Events);
      appData.events.createUserErrorEvent = _.extend({}, Backbone.Events);
      appData.events.getUserFromFacebookIDEvent = _.extend({}, Backbone.Events);
      appData.events.getUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.facebookUserToSQLEvent = _.extend({}, Backbone.Events);
      appData.events.postMessageSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMediaSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.createActivityTabsEvent = _.extend({}, Backbone.Events);
      appData.events.activityUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.goinToActivitySuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getBuurtenEvent = _.extend({}, Backbone.Events);
      appData.events.updateActivitiesEvent = _.extend({}, Backbone.Events);
      appData.events.getLocationsSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getLatLonEvent = _.extend({}, Backbone.Events);
      appData.services.facebookService = new appData.services.FacebookServices();
      appData.events.facebookLoginEvent = _.extend({}, Backbone.Events);
      appData.events.facebookLoginErrorEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetFriendsEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetFriendsErrorEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetProfileDataEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetProfileDataErrorEvent = _.extend({}, Backbone.Events);
      appData.services.utilService = new appData.services.UtilServices();
      appData.events.locationHomeEvent = _.extend({}, Backbone.Events);
      appData.events.locationCreateActivityEvent = _.extend({}, Backbone.Events);
      appData.services.avatarService = new appData.services.AvatarService();
      appData.services.challengeService = new appData.services.CHallengeService();

      // Create a new instance of the helperclass
      appData.helpers.phonegapHelper = new appData.views.HelperView();

      if(appData.settings.native){
          appData.settings.pictureSource = navigator.camera.PictureSourceType;
          appData.settings.destinationType = navigator.camera.DestinationType;
        

        /*
          var pushNotification;
            function onDeviceReady() {
                $("#app-status-ul").append('<li>deviceready event received</li>');
                
        document.addEventListener("backbutton", function(e)
        {
                  $("#app-status-ul").append('<li>backbutton event received</li>');
            
              if( $("#home").length > 0)
          {
            // call this to get a new token each time. don't call it to reuse existing token.
            //pushNotification.unregister(successHandler, errorHandler);
            e.preventDefault();
            navigator.app.exitApp();
          }
          else
          {
            navigator.app.backHistory();
          }
        }, false);
      
        try 
        { 
                  pushNotification = window.plugins.pushNotification;
          $("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
                  if (device.platform == 'android' || device.platform == 'Android' ||
                            device.platform == 'amazon-fireos' ) {
      pushNotification.register(successHandler, errorHandler, {"senderID":"661780372179","ecb":"onNotification"});    // required!
          } else {
                      pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});  // required!
                  }
                }
        catch(err) 
        { 
          txt="There was an error on this page.\n\n"; 
          txt+="Error description: " + err.message + "\n\n"; 
          alert(txt); 
        } 
            }
            
            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                     $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     navigator.notification.alert(e.alert);
                }
                    
                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }
                
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            
            // handle GCM notifications for Android
            function onNotification(e) {
                $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
                
                switch( e.event )
                {
                    case 'registered':
          if ( e.regid.length > 0 )
          {
            $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
          }
                    break;
                    
                    case 'message':
                      // if this flag is set, this notification happened while we were in the foreground.
                      // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                      if (e.foreground)
                      {
              $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
                  
                    // on Android soundname is outside the payload. 
                          // On Amazon FireOS all custom attributes are contained within payload
                          var soundfile = e.soundname || e.payload.sound;
                          // if the notification contains a soundname, play it.
                          var my_media = new Media("/android_asset/www/"+ soundfile);

              my_media.play();
            }
            else
            { // otherwise we were launched because the user touched a notification in the notification tray.
              if (e.coldstart)
                $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
              else
              $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
              
            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                        //android only
            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                        //amazon-fireos only
                        $("#app-status-ul").append('<li>MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
                    break;
                    
                    case 'error':
            $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
            $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                $("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
      
            function successHandler (result) {
                $("#app-status-ul").append('<li>success:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                $("#app-status-ul").append('<li>error:'+ error +'</li>');
            }
            

            */


          document.addEventListener("resume", onResumeHandler, false);
          document.addEventListener("offline", deviceOfflineHandler, false);
          document.addEventListener("online", deviceOnlineHandler, false);
          document.addEventListener("showkeyboard", showKeyboardHandler, false);
          document.addEventListener("hidekeyboard", hideKeyboardHandler, false);
          window.addEventListener('orientationchange', doOnOrientationChange);

          // check to see if there is a working connection
          if(appData.services.utilService.getNetworkConnection()){
            appData.services.facebookService.facebookConnect();
          }else{
            if(window.localStorage.getItem("userModel")){

            }else{
              window.location.hash = "noconnection";
            }
          }

          // see if we have a user in our localstorage
          if(window.localStorage.getItem("userModel")){


            var localUser = JSON.parse(window.localStorage.getItem("userModel"));
            appData.models.userModel = new User(localUser);
            appData.settings.userLoggedIn = true;

            // save the old data (so wen can retrieve if in case we don't have a working connection)
            appData.settings.storageFound = true;
            appData.storage = JSON.parse(window.localStorage.getItem("collections"));
          }

          appData.settings.rootPath = "http://ultimedia.biz/watm/";
          appData.settings.servicePath =  appData.settings.rootPath + "services/";
          appData.settings.imagePath = appData.settings.rootPath + "common/uploads/";
          appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";
          appData.settings.iconPath = appData.settings.rootPath + "public/css/assets/";
          appData.settings.sportsPath = appData.settings.rootPath + "common/sports/";
          appData.settings.promoPath = appData.settings.rootPath + "common/promo/";
          appData.settings.avatarPath = "common/avatar/";

        } else {
          appData.settings.native = false;
          appData.services.facebookService.facebookConnect();
        }

        // init backbone
        Backbone.history.start();
    });
  });
}


Activity = Backbone.Model.extend({
	
	defaults: {
		messages: [],
		activity_id: "",
		date: "",
		description: "",
		location_id: "",
		location: "",
		media: [],
		sport_id: "",
		time: "",
		stopTime: "",
		title: "",
		user_id: "",
		buurt_id: "4",
		participants: "0",
		going: "",
		users: [],
		full: false,
		updateActivity: false,
		creator: ""
    },

	initialize: function(){
		this.setGoing();
	}, 

	setGoing: function(){
		this.attributes.going = this.attributes.users.length;
		this.isFull();
	},

	isFull: function(){

		if(this.attributes.going >= this.attributes.participants){
			this.attributes.full = true;
		}else{
			this.attributes.full = false;
		}
	}
});



Avatar = Backbone.Model.extend({
	
	defaults: {
		female:{
			strength: ["avatar_female_default.png", "avatar_female_20.png", "avatar_female_40.png", "avatar_female_60.png", "avatar_female_80.png", "avatar_female_100.png"],
			equipment: ["equipment_female_default.png", "equipment_female_20.png", "equipment_female_40.png", "equipment_female_60.png", "equipment_female_80.png", "equipment_female_100.png"]
		},
		male: {
			strength: ["avatar_male_default.png", "avatar_male_20.png", "avatar_male_40.png", "avatar_male_60.png", "avatar_male_80.png", "avatar_male_100.png"],
			equipment: ["equipment_male_default.png", "equipment_male_20.png", "equipment_male_40.png", "equipment_male_60.png", "equipment_male_80.png", "equipment_male_100.png"]
		},
		strengthDisplay: "",
		equipmentDisplay: ""
    },

	initialize: function(){
	}
});


Buurten = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Challenge = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Location = Backbone.Model.extend({
	defaults: {
		"description": "",
		"location": "",
		"coordinates": ""
	},

	initialize: function(){
		
	},

	label: function () {
        return this.get("location");
    }
});

Media = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Message = Backbone.Model.extend({
	initialize: function(){
		
	}
});



SortOption = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Sport = Backbone.Model.extend({
	defaults: {
		"object_class": ""
	},

	initialize: function(){

	},

	label: function () {
		return this.get("sport_title");
	}
});


User = Backbone.Model.extend({
	defaults: {
	    user_id: '',
	    name: '',
	    email: '',
	    gender: '1',
	    facebook_data: {},
	    facebookUser: false,
	    current_location: "51.208723, 3.223860",
		strength_score: 0,
		stamina_score: 0,
		equipment_score: 0,
    	avatar: "default.png",
    	myChallenges: [],
    	myBadges: [],
    	age: [],
    	myFavouriteSports: []
    },
	initialize: function(){
		
	}
});



ActivitiesCollection = Backbone.Collection.extend({
	model: Activity,
	sort_key: 'distance', // default sort key
	
	initialize: function (models,options) { 
     this.sort_key = 'distance';
	},

    comparator: function(a, b) {

        // Assuming that the sort_key values can be compared with '>' and '<',
        // modifying this to account for extra processing on the sort_key model
        // attributes is fairly straight forward.
        a = a.get(this.sort_key);
        b = b.get(this.sort_key);
        return a > b ?  1
             : a < b ? -1
             :          0;
    },

    sort_by_attribute: function(sort_key) {
        this.sort_key = sort_key;

        this.sort();
        console.log(this);
    }
});

BuurtenCollection = Backbone.Collection.extend({
	
	model: Buurten,
	initialize: function (models,options) { 

	}
});

ChallengesCollection = Backbone.Collection.extend({
	
	model: Challenge,
	initialize: function (models,options) { 

	}
});

LocationsCollection = Backbone.Collection.extend({
	
	model: Location,
	initialize: function (models,options) { 

	}
});

MediaCollection = Backbone.Collection.extend({

	model: Media,
	initialize: function (models,options) { 

	}
});

MessagesCollection = Backbone.Collection.extend({

	model: Message,
	initialize: function (models,options) { 

	}



});

SortOptionsCollection = Backbone.Collection.extend({
	
	model: SortOption,
	initialize: function (models,options) { 

	}
});

SportsCollection = Backbone.Collection.extend({
	
	model: Sport,
	initialize: function (models,options) { 

	}

});








UsersCollection = Backbone.Collection.extend({
	
	model: User,
	initialize: function (models,options) { 

	}
});

appData.views.ActiveChallengeListView = Backbone.View.extend({
    className: 'challenge-item',

    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        $(this.$el).hide().fadeIn(500);

    	var percentage = 0;
    	var total;
    	var count;
    	var totalfilters = 0;

        if(this.model.attributes.status){
            if(this.model.attributes.status.sportsFilter){
            	total = this.model.attributes.challengeData.sportsFilter.total;
            	count = this.model.attributes.status.sportsFilter.count;
            	percentage += (count / total)*100;
            
            	totalfilters++;
            }

            if(this.model.attributes.status.activityCreateFilter){
          		total = this.model.attributes.challengeData.activityCreateFilter.total;
            	count = this.model.attributes.status.activityCreateFilter.count;

            	percentage += (count / total)*100;

            	totalfilters++;
            }

            if(this.model.attributes.status.fotoCreateFilter){
            	total = this.model.attributes.challengeData.fotoCreateFilter.total;
            	count = this.model.attributes.status.fotoCreateFilter.count;
            	percentage += (count / total)*100;

            	totalfilters++;
            }

            if(this.model.attributes.status.participateFilter){
            	total = this.model.attributes.challengeData.participateFilter.total;
            	count = this.model.attributes.status.participateFilter.count;
            	percentage += (count / total)*100;

            	totalfilters++;
            }
        }
        var finalePercentage = percentage / totalfilters;


        $( ".progress", this.$el).progressbar({
            value: finalePercentage
        });

        return this; 

    }

});




appData.views.ActivityDetailView = Backbone.View.extend({

    initialize: function () {
      console.log('----- In the initialize of ActivityDetailView -----');
      appData.views.ActivityDetailView.model = this.model;
      appData.views.ActivityDetailView.wallPostCompleteHandler = this.wallPostCompleteHandler;
      appData.views.ActivityDetailView.addMap = this.addMap;

      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device online
    networkFoundHandler: function(){
      if(!appData.settings.mapAdded && appData.services.utilService.getNetworkConnection()){
        appData.views.ActivityDetailView.addMap();
      }
    },

    // phonegap device back online
    networkLostHandler: function(){
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentPageHTML = this.$el;

      this.currentActivityPage = '#praktischContent';
      
      // add the default page
      var defaultView = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
      $('#activityContent', appData.settings.currentPageHTML).empty().append(defaultView.render().$el);

      // user is admin? (show edit options)
      /*
      if(appData.models.userModel.get("user_id") == this.model.get("user_id")){
        $('#editPanel', appData.settings.currentPageHTML).removeClass('hide');
      }*/

      var elementPosition = $('#activityDetailTabs', appData.settings.currentPageHTML).offset();

      appData.settings.mapAdded = false;
      if(appData.services.utilService.getNetworkConnection() && appData.settings.native){
         this.addMap();
      }else if(!appData.settings.native){
         this.addMap();
      }

      this.setValidators();
      $('#ee', appData.settings.currentPageHTML).delay(800).queue(function() {
          $(this).hide().css('display', 'block').textfill({max: 22}).show();
      });

      $(window).resize(_.debounce(function(){
          $('#ee', appData.settings.currentPageHTML).textfill();
      }, 500));
            
      return this; 
    }, 

    shareButtonHandler: function(){

    },

    setValidators: function(){
      $("#messageForm",appData.settings.currentPageHTML).validate({
          submitHandler: function(form) {

            var message = $('#messageInput', appData.settings.currentPageHTML).val();
            $('#messageInput', appData.settings.currentPageHTML).val('');
            
            appData.services.phpService.addMessage(message, appData.views.ActivityDetailView.model.attributes.activity_id);   
          }
      });
    },

    messageSubmitHandler: function(){
      $("#messageForm",appData.settings.currentPageHTML).submit();
    },

    addMap: function(){
        appData.settings.mapAdded = true;
        
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var map = new google.maps.Map($('#activityMap',appData.settings.currentPageHTML)[0], mapOptions);
        
        var coordinates;
        if(this.model.attributes.coordinates){
           coordinates =  this.model.attributes.coordinates.split(',');

          var activityImage = new google.maps.MarkerImage(appData.settings.iconPath + "open-icon@x2.png", null, null, null, new google.maps.Size(26,30)); // Create a variable for our marker image.
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(coordinates[0], coordinates[1]),
            map:  map,
            title: 'Huidige locatie',
            icon: activityImage,
            optimized: false
          });

          // resize and relocate map
          google.maps.event.addListenerOnce(map, 'idle', function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
          });
        }
    },

    events: {
      "click #activityDetailTabs .cl-btn": "activeDetailTabsHandler",
      "click #navigateButton": "navigateClickHandler",
      "click #backButton": "backHandler",
      "click #shareButton": "sharePopopverClickHandler",
      "click #popover-close": "sharePopopverClickHandler",
      "click #updateButton": "updateButtonClickHandler",
      "click #facebookShareButton": "facebookShareButtonClickHandler",
      "click #messageSubmit": "messageSubmitHandler",
      "click .cl-modal-backdrop": "modalDrop"
    },

    modalDrop: function(){
      $('#popover', appData.settings.currentPageHTML).addClass('hide');
    },

    facebookShareButtonClickHandler: function(){
      Backbone.on('FacebookWallPostCompleteEvent', appData.views.ActivityDetailView.wallPostCompleteHandler);
      
      // share doesn't work on the device at the moment
      appData.services.facebookService.facebookWallpost(appData.views.ActivityDetailView.model);
    },

    wallPostCompleteHandler: function(){
      Backbone.off('FacebookWallPostCompleteEvent');
      $('#popover', appData.settings.currentPageHTML).addClass('hide');
    },

    updateButtonClickHandler: function(){
      window.location.hash = "#update/" + appData.views.ActivityDetailView.model.attributes.activity_id;
    },

    sharePopopverClickHandler: function(e){
      if($('#popover', appData.settings.currentPageHTML).hasClass('hide')){
        $('#popover', appData.settings.currentPageHTML).removeClass('hide');
        $('#bd', appData.settings.currentPageHTML).hide().show(300);
      }else{
        $('#bd', appData.settings.currentPageHTML).hide(300, function(){
          $('#popover', appData.settings.currentPageHTML).addClass('hide');
        });

      }

      toggleClass('hide').slideUp();
    },

    backHandler: function(){
      window.history.back();
    },

    navigateClickHandler: function(){
      appData.router.navigate('navigater', true);
    },

    activeDetailTabsHandler: function(evt) { 
        // tab on activity detail
        $('#activityDetailTabs .cl-btn').removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');
        var view;
        clearInterval(appData.settings.timer);


        $('#messageBox', appData.settings.currentPageHTML).removeClass('open');


        switch(selectedPage){
          case "#praktischContent":
            view = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
          break;

          case "#mediaContent":
            view = new appData.views.ActivityMediaView({model : appData.views.ActivityDetailView.model});
          break;

          case "#messagesContent":
            view = new appData.views.ActivityMessagesView({model : appData.views.ActivityDetailView.model});
            $('#messageBox', appData.settings.currentPageHTML).addClass('open');
          break;
        }

        
        $('#activityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        this.currentActivityPage = selectedPage;
    }

});



appData.views.ActivityInfoView = Backbone.View.extend({

    initialize: function () {
        appData.events.goinToActivitySuccesEvent.bind("goingToActivitySuccesHandler", this.goingToActivitySuccesHandler)
        appData.models.activityModel = this.model;
        
        Backbone.on('activityUsersSuccesEvent', this.getActivityUsersSuccesHandler);
        Backbone.on('goinToActivitySuccesEvent', this.setGoingToActivityCompleteHandler);

        appData.views.ActivityInfoView.model = this.model;

        // update the activities if we have a network connection
        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection()){
                appData.services.phpService.getActivityUsers(this.model); 
            }else{
                $('#createActivityButton').hide();
            }
        }else{
            appData.services.phpService.getActivityUsers(this.model); 
        }

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);


        // image timer
        appData.settings.timer = setInterval(appData.services.phpService.getActivityUsers(this.model), 10000);


    }, 

    // phonegap device online
    networkFoundHandler: function(){
        appData.services.phpService.getActivityUsers(this.model); 
    },

    // phonegap device back online
    networkLostHandler: function(){

    },
    
    render: function() { 
        if(this.model.attributes.user_id){
            var user = appData.collections.users.where({"user_id": this.model.attributes.user_id})[0];
            if(user){
    
                this.model.attributes.creator = user.attributes.name;
            }
        }

    	this.$el.html(this.template(this.model.attributes));
    	appData.settings.currentModuleHTML = this.$el;

        var model = this.model;

        $('#praktischContent .radio-list input[type="radio"]', this.$el).change(function() {
                    // Remove all checked
            $(this).parents('.radio-list').find('label').removeClass('checked');
            $(this).parent().addClass('checked');


            var selectedData = $(this).attr('id');
                selectedData = selectedData.split('-');
                selectedData = selectedData[1];
                
                appData.services.phpService.setGoingToActivity(appData.models.activityModel.attributes.activity_id, selectedData);
   
                if(selectedData == 1){
                    // set a local reminder
                    appData.services.challengeService.checkChallenges(appData.models.userModel, true, false, false, true, appData.models.activityModel);

                    var date = appData.services.utilService.convertDate(model.attributes.savedDate, model.attributes.startTime, true);
                    if(appData.settings.native){
                        
                        window.plugin.notification.local.add({
                          id:      model.attributes.activity_id,
                          title:   model.attributes.title + " gaat beginnen",
                          message: 'Haast je snel naar ' + model.attributes.location,
                          date:    date,
                          autoCancel: true
                        });
                    

                        function addMinutes(date, minutes) {
                            return new Date(date.getTime() + minutes*60000);
                        }

                        function removeMinutes(date, minutes) {
                            return new Date(date.getTime() + minutes*60000);
                        }
                    }

                }else{
                    if(appData.settings.native){
                        window.plugin.notification.local.cancel(model.attributes.activity_id, function () {
                        
                        });
                    }
                }


        });

        $('#messageBox', appData.settings.currentPageHTML).addClass('hide');
        return this; 
    },

    setGoingToActivityCompleteHandler: function(){
        Backbone.on('activityUsersSuccesEvent', this.getActivityUsersSuccesHandler);
        appData.services.phpService.getActivityUsers(appData.views.ActivityInfoView.model); 
    },

    getActivityUsersSuccesHandler: function(data){
        Backbone.off('activityUsersSuccesEvent');
        appData.models.activityModel.userData = new UsersCollection(data);

        // 1 set toggle switch for going
        var goingTo = appData.models.activityModel.userData.where({user_id:appData.models.userModel.attributes.user_id.toString()});
            goingTo = goingTo[0];

        if(goingTo){
            $('#praktischContent .radio-list label').removeClass('checked');
            $("#going-" + goingTo.attributes.going, appData.settings.currentModuleHTML).parent().addClass('checked');
            $("#going-" + goingTo.attributes.going, appData.settings.currentModuleHTML).prop('checked', true);
        }else{
            $('#praktischContent .radio-list label').removeClass('checked');
            $("#going-0", appData.settings.currentModuleHTML).parent().addClass('checked');
            $("#going-0", appData.settings.currentModuleHTML).prop('checked', true);
        }

        // 2 show friends that are going
        $('#aanwezigContent').empty();
        appData.views.ActivityInfoView.userListView = [];
        appData.views.ActivityDetailView.model.attributes.users = data;


        var filteredUsers = _(appData.views.ActivityDetailView.model.attributes.users).where({"going": "1"});
        $(filteredUsers).each(function(index,userModel) {
          appData.views.ActivityInfoView.userListView.push(new appData.views.ActivityUserView({
            model : userModel
        }));

        appData.views.ActivityDetailView.model.attributes.going = filteredUsers.length;
        appData.views.ActivityDetailView.model.isFull();

        $('#aanwezigContent', appData.settings.currentModuleHTML).empty();
        _(appData.views.ActivityInfoView.userListView).each(function(dv) {
            var cl = false;
            if(dv.model.user_id == appData.models.userModel.attributes.user_id){
                cl = true;
            }

          $('#aanwezigContent', appData.settings.currentModuleHTML).append(dv.render().$el);
            if(cl){
                $('#aanwezigContent a', appData.settings.currentModuleHTML).last().addClass('selected');
            }
        });
       });

     // disable options if the activity is full
     var goingCheck = false;
     if(goingTo){
        if(goingTo.attributes.going == 0){
            goingCheck = false;
        }else{
            goingCheck = true;
        }
     }

     if(appData.views.ActivityInfoView.userListView.length >= parseInt(appData.views.ActivityDetailView.model.attributes.participants) && !goingCheck){
        $('#goingList', appData.settings.currentModuleHTML).hide();
        $('#goingFullMessage', appData.settings.currentModuleHTML).fadeIn(400);
     }else if(goingTo){
        $('#goingList', appData.settings.currentModuleHTML).fadeIn(400);
        $('#goingFullMessage', appData.settings.currentModuleHTML).hide();
     }else{
        $('#goingFullMessage', appData.settings.currentModuleHTML).hide();
        $('#goingList', appData.settings.currentModuleHTML).fadeIn(400);
     }
     $('#participantStat', appData.settings.currentModuleHTML).text(appData.views.ActivityInfoView.userListView.length + " / " + appData.views.ActivityDetailView.model.attributes.participants);    
  
    }
});



appData.views.ActivityMediaViewer = Backbone.View.extend({

    initialize: function () {

    },

    render: function() { 
	  this.$el.html(this.template(this.model.toJSON()));
      return this; 
    }
});



appData.views.ActivityMessageView = Backbone.View.extend({

    initialize: function () {
    	appData.events.getMessagesSuccesEvent.bind("chatMessagesLoadSuccesHandler", this.chatMessagesLoadSuccesHandler);
    	appData.events.postMessageSuccesEvent.bind("postMessageSuccesHandler", this.postMessageSuccesHandler);
    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template({user: this.model.attributes, imagePath: appData.settings.imagePath}));
        return this; 
    }

});


appData.views.ActivityMessagesView = Backbone.View.extend({

    initialize: function () {
    	appData.events.postMessageSuccesEvent.bind("postMessageSuccesHandler", this.postMessageSuccesHandler);

      Backbone.on('getMessages', this.chatMessagesLoadSuccesHandler);
    	appData.services.phpService.getMessages(this.model); 

      appData.views.ActivityMessagesView.messagesLoaded = this.chatMessagesLoadSuccesHandler;
      appData.views.ActivityMessagesView.model = this.model;

      // chat timer
      appData.settings.timer = setInterval(this.timerAction, 2000);
       

    }, 

    timerAction: function(){
      Backbone.on('getMessages', appData.views.ActivityMessagesView.messagesLoaded);
      appData.services.phpService.getMessages(appData.views.ActivityMessagesView.model); 
    },

    render: function() { 
    	// model to template
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      return this; 
    },

    postMessageSuccesHandler: function(){
      $('#messageInput', appData.settings.currentModuleHTML).val('');

      // update messages
      appData.services.phpService.getMessages(appData.views.ActivityDetailView.model);  
      appData.services.utilService.updateLocalStorage();
    },

    chatMessagesLoadSuccesHandler: function(messages){
      Backbone.off('getMessages');

      appData.views.ActivityDetailView.model.attributes.messages = messages;
      if(appData.views.ActivityDetailView.model.attributes.messages.length > 0){

          appData.views.ActivityDetailView.messagesListView = [];
          appData.views.ActivityDetailView.model.attributes.messages.each(function(message) {
            appData.views.ActivityDetailView.messagesListView.push(new appData.views.ActivityMessageView({
              model : message
            }));
        });

        $('#messagesContent ul', appData.settings.currentModuleHTML).empty();
        _(appData.views.ActivityDetailView.messagesListView).each(function(dv) {
            $('#messagesContent ul', appData.settings.currentModuleHTML).append(dv.render().$el);
        });

      }else{

      }
    }
});

appData.views.ActivityUserView = Backbone.View.extend({

    initialize: function () {
    
    }, 

    render: function() { 
    	this.model.imagePath = appData.settings.imagePath;

    	// model to template
    	this.$el.html(this.template(this.model));
        return this; 
    }

});


appData.views.ActivityMediaView = Backbone.View.extend({
    className: 'mediaContainer',
    initialize: function () {
      appData.services.phpService.getMedia(this.model); 
      appData.views.ActivityMediaView.model = this.model;
      appData.views.ActivityMediaView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.ActivityMediaView.addPhotoToDatabaseHandler = this.addPhotoToDatabaseHandler;

      appData.views.ActivityMediaView.win = this.win;
      appData.views.ActivityMediaView.mediaLoaded = this.getMediaLoadSuccesHandler;
      appData.views.ActivityMediaView.model = this.model;

      // fetch media
      Backbone.on('mediaLoadSuccesHandler', appData.views.ActivityMediaView.mediaLoaded);

      // image timer
      appData.settings.timer = setInterval(this.timerAction, 4000);
    },

    timerAction: function(){
      Backbone.on('mediaLoadSuccesHandler', appData.views.ActivityMediaView.mediaLoaded);
      appData.services.phpService.getMedia(appData.views.ActivityMediaView.model); 
    },

    events: {
      "click #addMediaButton": "capturePhotoEditHandler",
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler"
    },

    getMediaLoadSuccesHandler: function(media){
      console.log('media loaded');

      Backbone.off('mediaLoadSuccesHandler');

      appData.views.ActivityDetailView.mediaListView = [];
      appData.views.ActivityDetailView.model.attributes.media = media;
      appData.views.ActivityDetailView.model.attributes.media.each(function(mediaModel) {

          var mediaUser = appData.collections.users.where({user_id:mediaModel.attributes.user_id});
            if(mediaUser){

              mediaUser = mediaUser[0];
              
              mediaModel.attributes.userModel = mediaUser.attributes;
              mediaModel.attributes.url = mediaModel.attributes.url;
              mediaModel.attributes.imagePath = appData.settings.imagePath;

            appData.views.ActivityDetailView.mediaListView.push(new appData.views.ActivityMediaViewer({
              model : mediaModel
            }));
          }
      });

      $('#mediaContenList', appData.settings.currentModuleHTML).empty();
      _(appData.views.ActivityDetailView.mediaListView).each(function(dv) {
          $('#mediaContenList', appData.settings.currentModuleHTML).append(dv.render().$el);
      });

      if(appData.views.ActivityDetailView.mediaListView.length === 0){
        $('.cl-message', appData.settings.currentModuleHTML).removeClass('hide');
      }else{
        $('.cl-message', appData.settings.currentModuleHTML).addClass('hide');
      }
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      // Hide the upload button if we're not on a native device
      if(appData.settings.native){

      }else{
        $("#addMediaButton", appData.settings.currentModuleHTML).click(function(){
           $("#nonNativeFileField", appData.settings.currentModuleHTML).trigger('click');
           return false;
        });
      }

      return this; 
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.ActivityMediaView.files, function(key, value)
      {
        data.append(key, value);
      });

      Backbone.on('fileUploadedEvent', appData.views.ActivityMediaView.fileUploadedHandler);
      appData.services.phpService.uploadMediaNonNative(data);
    },

    nonNativeFileSelectedHandler: function(evt){
        // upload script
        // do some checks
        var files = evt.target.files;
        appData.views.ActivityMediaView.files = files;

        $('#mediaForm', appData.settings.currentModuleHTML).submit();
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');

      Backbone.on('addPhotoToDatabaseHandler', appData.views.ActivityMediaView.addPhotoToDatabaseHandler);
      appData.services.phpService.addPhotoToDatabase(filename, appData.views.ActivityMediaView.model.attributes.activity_id);
    },

    capturePhotoEditHandler: function() {

      var page = this.$el;

      // Retrieve image file location from specified source
      navigator.camera.getPicture(this.uploadPhoto,
        function(message) { 
        },{ quality: 50, targetWidth: 640, targetHeight: 480, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.CAMERA }
      );

        //appData.services.phpService.upploadMediaNonNative(); 
    },

    uploadPhoto: function(imageURI) {
      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
      options.mimeType="image/jpeg";

      var params = new Object();
      params.value1 =  options.fileName;
      appData.views.ActivityMediaView.uploadedPhotoUrl = options.fileName;

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();  
      ft.upload(imageURI, appData.settings.servicePath + appData.settings.imageUploadService, appData.views.ActivityMediaView.win, null, options);    
    },

    win: function(r) {

      Backbone.on('addPhotoToDatabaseHandler', appData.views.ActivityMediaView.addPhotoToDatabaseHandler);
      appData.services.phpService.addPhotoToDatabase(appData.views.ActivityMediaView.uploadedPhotoUrl, appData.views.ActivityMediaView.model.attributes.activity_id);
    },

    addPhotoToDatabaseHandler: function(){

      // Disable event
      Backbone.off('addPhotoToDatabaseHandler');

      // update
      appData.services.challengeService.checkChallenges(appData.models.userModel, false, false, true, false);

      // get images from database
      Backbone.on('mediaLoadSuccesHandler', appData.views.ActivityMediaView.mediaLoaded);
      appData.services.phpService.getMedia(appData.views.ActivityMediaView.model); 
      appData.services.utilService.updateLocalStorage();
    }
});



appData.views.AvatarDisplayView = Backbone.View.extend({
    tagName: 'span',
    className: 'avatar-container',

    initialize: function () {

    }, 

    render: function() {     
    	this.$el.html(this.template({avatarPath: appData.settings.avatarPath, avatar: this.model.toJSON()}));
    	$(this.$el).hide().show(500);

    	return this;
    }
});



appData.views.BadgeListView = Backbone.View.extend({
	className: "badge-container",

    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        return this; 
    }

});




appData.views.ChallengeListView = Backbone.View.extend({
    className: 'challenge-item',
    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        appData.views.ChallengeListView.my = this.$el;
        $(this.$el).hide().fadeIn(500);

        return this; 
    },

    events: {
    	"click .joinChallenge": "joinChallengeClickHandler"
    },

    joinChallengeClickHandler: function(evt){
    	appData.services.phpService.joinChallenge($(evt.target).attr('challenge-id'));
        $(appData.views.ChallengeListView.my).hide(300);
    }

});




appData.views.CreateActivityInfoView = Backbone.View.extend({

    initialize: function () {
      appData.views.CreateActivityInfoView.addedSportHandler = this.addedSportHandler;
    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
      
      // Sports autocomplete
      appData.views.CreateActivityInfoView.sportAutComplete = new AutoCompleteView({input: $("#sportInput", appData.settings.currentModuleHTML), model: appData.collections.sports, wait: 100, updateModel: appData.views.ActivityDetailView.model, updateID: "sport_id"}).render();
      this.setValidator();

      // Set hours
      var now = new Date();
      var mins = now.getMinutes();
      var quarterHours = Math.round(mins/15);
      if (quarterHours == 4)
      {
          now.setHours(now.getHours()+1);
      }
      var rounded = (quarterHours*15)%60;
      now.setMinutes(rounded);

      var minutes = ('0' + now.getMinutes()).slice(-2);
      var hour = ('0' + now.getHours()).slice(-2);

      $('#vanInput', appData.settings.currentModuleHTML).val(hour+":"+minutes);

      var totInput = now.getHours() + 1;
          totInput = ('0' + totInput).slice(-2);

      $('#totInput', appData.settings.currentModuleHTML).val(hour+":"+minutes);

      var van = hour+":"+minutes;
      var res = van.split(":");
      $('#totInput', appData.settings.currentModuleHTML).val((parseInt(res[0]) + 1) + ":" + res[1]);


      // if we are updating, enter the date from the activity in the input form
      if(appData.views.CreateActivityView.isUpdating){
            var selectedSport = appData.collections.sports.where({"sport_id": appData.views.ActivityDetailView.model.attributes.sport_id})
                selectedSport = selectedSport[0];

            $('#sportInput', appData.settings.currentModuleHTML).val(selectedSport.attributes.sport_title);
            $('#participantsSlider', appData.settings.currentModuleHTML).attr('value', appData.views.ActivityDetailView.model.attributes.participants);
            this.participantsSliderHandler();
            $('#titelInput', appData.settings.currentModuleHTML).val(appData.views.ActivityDetailView.model.attributes.title);

            var time = appData.views.ActivityDetailView.model.attributes.date.slice(-5);
            $('#vanInput', appData.settings.currentModuleHTML).val(time);
            $('#totInput', appData.settings.currentModuleHTML).val(appData.views.ActivityDetailView.model.attributes.stopTime);
            $('#omschrijvingInput', appData.settings.currentModuleHTML).val(appData.views.ActivityDetailView.model.attributes.description);
          
            var dateObject = new Date(appData.views.ActivityDetailView.model.attributes.savedDate);
            $('#wanneerInput', appData.settings.currentModuleHTML).val(dateObject.toDateInputValue());
      }

      return this; 
    },

    events:{
      "change #participantsSlider": "participantsSliderHandler",
      "change #vanInput": "timeChangeHandler"
    },

    timeChangeHandler: function(){
      var input = $('#vanInput', appData.settings.currentModuleHTML).val();

      // automatically add one hour 
      var res = input.split(":");
      $('#totInput', appData.settings.currentModuleHTML).val((parseInt(res[0]) + 1) + ":" + res[1]);
    },

    participantsSliderHandler: function(){
        $('#participants', appData.settings.currentModuleHTML).removeClass('hide').text($('#participantsSlider', appData.settings.currentModuleHTML).val());
    },

    subHandler: function(){
      $("#watForm",appData.settings.currentModuleHTML).submit();
    },

    addedSportHandler: function(data){
      Backbone.off("addedSportHandler");
      appData.views.ActivityDetailView.model.attributes.sport_id = data.sport_id;
      // all saved
      appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityInfoView.tabTarget);
    },

    setValidator: function(){

        $('#wanneerInput', appData.settings.currentModuleHTML).val(new Date().toDateInputValue());

        $("#watForm",appData.settings.currentModuleHTML).validate({
          rules: {
            wanneerInput: {
              date: true
            },
            participants: {
              required: true,
              range: [2, 60]
            },
          },
          submitHandler: function(form) {
            appData.views.ActivityDetailView.model.attributes.participants = $('#participantsSlider', appData.settings.currentModuleHTML).val();
            appData.views.ActivityDetailView.model.attributes.title = $('#titelInput', appData.settings.currentModuleHTML).val();
            appData.views.ActivityDetailView.model.attributes.date = $('#wanneerInput', appData.settings.currentModuleHTML).val() + " " + $('#vanInput', appData.settings.currentModuleHTML).val();
            appData.views.ActivityDetailView.model.attributes.stopTime  = $('#totInput', appData.settings.currentModuleHTML).val();
            appData.views.ActivityDetailView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentModuleHTML).val();

            appData.views.CreateActivityInfoView.tabTarget = {};
            appData.views.CreateActivityInfoView.tabTarget.location = "#waarContent";
            appData.views.CreateActivityInfoView.tabTarget.tab = "#waarTab";
      
            var selectedSport = appData.collections.sports.where({"sport_id": appData.views.ActivityDetailView.model.attributes.sport_id});
            if(selectedSport.length > 0){
                selectedSport = selectedSport[0];

                if(selectedSport.attributes.sport_title == $('#sportInput', appData.settings.currentModuleHTML).val()){
                  appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityInfoView.tabTarget);
          
                }else{
                  Backbone.on("addedSportHandler",  appData.views.CreateActivityInfoView.addedSportHandler); 
                  appData.services.phpService.addSport($('#sportInput', appData.settings.currentModuleHTML).val(), "",""); 
                }
            }else{
                  Backbone.on("addedSportHandler",  appData.views.CreateActivityInfoView.addedSportHandler);
                  appData.services.phpService.addSport($('#sportInput', appData.settings.currentModuleHTML).val(), "",""); 
            }
          }
      });
    }
});

appData.views.CreateActivityLocationView = Backbone.View.extend({

    initialize: function () {
        appData.events.locationCreateActivityEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationCreateActivityEvent.bind('locationErrorHandler', this.locationErrorHandler);
    
        appData.events.getLatLonEvent.bind('getLatLonSuccesHandler', this.getLatLonSuccesHandler);
        Backbone.on('addedLocationSuccesEvent', this.addedLocationSuccesEvent);

        this.currentMapLocation ="";
        this.wait = false;

        appData.views.CreateActivityLocationView.setMarkers = this.setMarkers; 
        appData.views.CreateActivityLocationView.tabTarget = {};
        appData.views.CreateActivityLocationView.tabTarget.location = "#wieContent";
        appData.views.CreateActivityLocationView.tabTarget.tab = "#wieTab";
        appData.views.CreateActivityLocationView.markers = [];
        appData.views.CreateActivityLocationView.clearMarkers = this.clearMarkers;

        appData.views.CreateActivityLocationView.activityCreatedHandler = this.activityCreatedHandler;
    },

    events: {
        "keyup #locationInput": "locationChangeHandler"
    },

    getLatLonSuccesHandler: function(data){

        if(data){
            if(data.geometry){
                appData.views.CreateActivityLocationView.currentMapLocation = data.geometry.location.lat + "," + data.geometry.location.lng;
                appData.views.CreateActivityLocationView.setMarkers(data.geometry.location.lat, data.geometry.location.lng, data.formatted_address);
            }
        }
    },

    locationChangeHandler: function(){

        // location from autocomplete
        if($('#locationInput',  appData.settings.currentModuleHTML).val().length > 3){

            if(appData.views.ActivityDetailView.model.attributes.location_id){

                var selectedLocationModel = appData.collections.locations.where({ "location_id": appData.views.ActivityDetailView.model.attributes.location_id });
                    if(selectedLocationModel){

                        selectedLocationModel = selectedLocationModel[0];
                        console.log(selectedLocationModel);

                        if(selectedLocationModel){
                        var coordinates = selectedLocationModel.attributes.coordinates.split(',');
                            appData.views.CreateActivityLocationView.currentLocation = coordinates;
                            appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
                    
                            console.log(selectedLocationModel);

                        if(selectedLocationModel.location == $('#locationInput',  appData.settings.currentModuleHTML).val() || selectedLocationModel.attributes.location == $('#locationInput',  appData.settings.currentModuleHTML).val()){
                        }else{

                            appData.views.ActivityDetailView.model.attributes.location_id = null;
                            appData.services.utilService.getLatLon($('#locationInput').val());
                        }
                        }
                    }
            }else{
                appData.services.utilService.getLatLon($('#locationInput').val());
            }
        }

    },

    setMarkers: function(lat, long, content){
        appData.views.CreateActivityLocationView.clearMarkers();
        appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(lat, long), 13);
  
        var activityImage = new google.maps.MarkerImage(appData.settings.iconPath + "open-icon@x2.png", null, null, null, new google.maps.Size(26,30)); // Create a variable for our marker image.
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, long),
          map:  appData.views.CreateActivityLocationView.map,
          title: content,
          icon: activityImage,
          optimized: false
        });

        if(content){
            appData.views.CreateActivityLocationView.infowindow.setContent('ddddddddd');
        }

        appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(lat, long), 13);

        google.maps.event.addListener(marker, 'click', function() {
            appData.views.CreateActivityLocationView.infowindow.open(appData.views.CreateActivityLocationView.map,marker);
        });

        appData.views.CreateActivityLocationView.markers.push(marker);
        appData.views.CreateActivityLocationView.infowindow.setContent(content);
    },

    clearMarkers: function(){
        for (var i=0; i<appData.views.CreateActivityLocationView.markers.length; i++) {
          appData.views.CreateActivityLocationView.markers[i].setVisible(false);
        }

        appData.views.CreateActivityLocationView.markers = [];
    },

    addedLocationSuccesEvent: function(location_id){
        appData.views.ActivityDetailView.model.attributes.location_id = location_id;

        // friend appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityLocationView.tabTarget);
        if(appData.views.CreateActivityView.updating){
            Backbone.on('activityUpdated', appData.views.CreateActivityLocationView.activityCreatedHandler);
            appData.services.phpService.updateActivity(appData.views.ActivityDetailView.model); 
        }else{
            Backbone.on('activityCreated', appData.views.CreateActivityLocationView.activityCreatedHandler);
            appData.services.phpService.createActivity(appData.views.ActivityDetailView.model);
        }
    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
      

      // autocomplete selector
      appData.views.CreateActivityLocationView.locationAutComplete = new AutoCompleteView({input: $("#locationInput", appData.settings.currentModuleHTML), model: appData.collections.locations, wait: 100, updateModel: appData.views.ActivityDetailView.model, updateID: "location_id", onSelect: function(){

        var locationModel = appData.collections.locations.where({ "location_id": appData.views.ActivityDetailView.model.attributes.location_id})[0];
        var coordinates = locationModel.attributes.coordinates.split(',');
        var location = locationModel.attributes.location;

            appData.views.CreateActivityLocationView.currentLocation = coordinates;
            appData.views.CreateActivityLocationView.setMarkers(coordinates[0], coordinates[1], location);

      }}).render();

      this.setValidators();
      this.initMap();

     if(appData.views.CreateActivityView.updating){
        $('#locationInput', appData.settings.currentModuleHTML).val(appData.views.ActivityDetailView.model.attributes.location);
        this.locationChangeHandler();
      }


      return this; 
    },

    initMap: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(appData.settings.defaultLocation[0], appData.settings.defaultLocation[1]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        appData.views.CreateActivityLocationView.map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        appData.views.CreateActivityLocationView.infowindow = new google.maps.InfoWindow();

        if(appData.models.userModel.attributes.current_location){
            var cd = appData.models.userModel.attributes.current_location.split(',');

            appData.views.CreateActivityLocationView.currentLocation = [];
            appData.views.CreateActivityLocationView.currentLocation.push(cd[0]);
            appData.views.CreateActivityLocationView.currentLocation.push(cd[1]);
        }else{
            appData.views.CreateActivityLocationView.currentLocation = [];
            appData.views.CreateActivityLocationView.currentLocation.push(51.20935);
            appData.views.CreateActivityLocationView.currentLocation.push(3.22470);
        }

        // resize and relocate map
        google.maps.event.addListenerOnce(appData.views.CreateActivityLocationView.map, 'idle', function() {
            google.maps.event.trigger(appData.views.CreateActivityLocationView.map, 'resize');
            appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(appData.views.CreateActivityLocationView.currentLocation[0], appData.views.CreateActivityLocationView.currentLocation[1]), 13);
        });

        google.maps.event.addListener(appData.views.CreateActivityLocationView.map, 'click', function(event) {
    //           placeMarker(event.latLng);

//                       appData.views.CreateActivityLocationView.setMarkers(location.d, location.e, "");


        });


        if(appData.settings.native){
            appData.services.utilService.getLocationService("createActivity");
        }

    },

    locationSuccesHandler: function(position){
        appData.views.CreateActivityLocationView.setMarkers(position.coords.latitude, position.coords.longitude);
    },

    locationErrorHandler: function(location_id){

    },

    setValidators: function(){
    	var that = this;
    	$("#waarForm",appData.settings.currentModuleHTML).validate({
            submitHandler: function(form){                
                appData.views.ActivityDetailView.model.attributes.location = $('#locationInput', appData.settings.currentModuleHTML).val();

                // Is this a custom locaiton or not?
                var found = appData.collections.locations.findWhere({'location': $('#locationInput', appData.settings.currentModuleHTML).val()})
                if(!found){
                    // Add location to database
                    appData.services.phpService.addLocation($('#locationInput',appData.settings.currentModuleHTML).val(), appData.views.CreateActivityLocationView.currentMapLocation,"");
                }else{

                    // if we don't have friends just create the activity, else go to the friends invite page
                    /*if(appData.models.userModel.attributes.myFriends.models.length !== 0){
                        appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityLocationView.tabTarget);
                    }else{*/

                        if(appData.views.CreateActivityView.updating){
                            Backbone.on('activityUpdated', appData.views.CreateActivityLocationView.activityCreatedHandler);
                            appData.services.phpService.updateActivity(appData.views.ActivityDetailView.model);

                        }else{
                            Backbone.on('activityCreated', appData.views.CreateActivityLocationView.activityCreatedHandler);
                            appData.services.phpService.createActivity(appData.views.ActivityDetailView.model);
                        }
                    //}
                }
            }
        });
    },

    activityCreatedHandler: function(activity_id){

      // now add friends
      Backbone.off('activityCreated');
      Backbone.off('activityUpdated');
      
      appData.views.CreateActivityView.updating = false;
      appData.views.CreateActivityView.isUpdating = false;
      appData.views.CreateActivityLocationView.activity_id = activity_id;
      appData.services.phpService.getActivities(false, appData.views.CreateActivityLocationView.activity_id);
      
      // set this boolean so we return to disable back functionality
      appData.settings.created = true;
      appData.services.utilService.updateLocalStorage();
    }
});

appData.views.CreateActivityView = Backbone.View.extend({

    initialize: function () {

        // check if we are updating or creating
        if(this.model){

            if(this.model.attributes.updateActivity){
                appData.views.CreateActivityView.updating = this.model.attributes.updateActivity;
                appData.views.ActivityDetailView.model = this.model;

                appData.views.CreateActivityView.isUpdating = true;

            }else{
                appData.views.ActivityDetailView.model = new Activity();
                appData.views.CreateActivityView.isUpdating = false;
            }
        }else{
            appData.views.ActivityDetailView.model = new Activity();
            appData.views.CreateActivityView.isUpdating = false;
        }

        appData.events.createActivityTabsEvent.bind("formStageCompleteEvent", this.formStageCompleteEvent);
        
        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    menuOpenHandler: function(){
        $("#mainMenu").trigger("open");

    },

    // phonegap device offline
    networkFoundHandler: function(){


    },

    // phonegap device back online
    networkLostHandler: function(){

    },
    
    render: function() { 
    	this.$el.html(this.template());
        this.currentActivityPage = '#watContent';

        appData.settings.currentPageHTML = this.$el;

        var view = new appData.views.CreateActivityInfoView({ model:  appData.views.ActivityDetailView.model});
        $('#createActivityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);

        // if this user doesn't have friends, just hide the friends tab from the flow
        if(appData.models.userModel.attributes.myFriends.models.length === 0){
            $('#wieTab', appData.settings.currentPageHTML).addClass('hide');
        }

        if(appData.views.CreateActivityView.isUpdating){
            $('.cl-title', appData.settings.currentPageHTML).text('Wijzig activitiet');
            
            // menu buttons
            $('#backButton', appData.settings.currentPageHTML).removeAttr('style');
            $('#menuButton', appData.settings.currentPageHTML).hide();
        }


        return this; 
    }, 

    events: {
      "click #submitButton": "subHandler",
      "click #menuButton": "menuOpenHandler",
      "click #watTab": "previousTabHandler",
      "click #backButton": "backHandler"
    },

    backHandler: function(){
        window.history.back();
    },

    previousTabHandler: function(){
    
    },

    subHandler: function(){
        if($('form').is('#wieForm')){
            if(appData.views.CreateActivityView.updating){
                Backbone.on('activityUpdated', appData.views.CreateActivityLocationView.activityCreatedHandler);
                appData.services.phpService.updateActivity(appData.views.ActivityDetailView.model);

            }else{
                Backbone.on('activityCreated', appData.views.CreateActivityLocationView.activityCreatedHandler);
                appData.services.phpService.createActivity(appData.views.ActivityDetailView.model);
            }
        }else{
            $('form',appData.settings.currentPageHTML).submit();
        }
    },

    formStageCompleteEvent: function(data){

        var location = data.location;
        var tab = data.tab;

        $('#createActivityTabs a').removeClass('active');
        $(tab, appData.settings.currentPageHTML).addClass('active');

        // tab on activity detail
        $(this.currentActivityPage, appData.settings.currentPageHTML).removeClass('show').addClass('hide');
        $(location, appData.settings.currentPageHTML).removeClass('hide').addClass('show');

        this.currentActivityPage = location;

        var view;
        switch(location){
            case "#watContent":
                view = new appData.views.CreateActivityInfoView({ model:  appData.views.ActivityDetailView.model});
            break;

            case "#waarContent":
                view = new appData.views.CreateActivityLocationView({ model:  appData.views.ActivityDetailView.model});

                if(appData.models.userModel.attributes.myFriends.models.length === 0){

                    if(appData.views.CreateActivityView.isUpdating){
                        $('#submitButton').val('Activiteit bijwerken');
                    }else{
                        $('#submitButton').val('Activiteit aanmaken');
                    }
                }
            break;

            case "#wieContent": 
                view = new appData.views.CreateActivityWieView({ model:  appData.views.ActivityDetailView.model});
                
                if(appData.views.CreateActivityView.isUpdating){
                    $('#submitButton').val('Activiteit bijwerken');
                }else{
                    $('#submitButton').val('Activiteit aanmaken');
                }
            break;
        }

        $('#createActivityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        
    }
});



appData.views.CreateActivityWieView = Backbone.View.extend({
    initialize: function () {
        appData.views.friendsListView = [];
        appData.collections.selectedFriends = new UsersCollection();
        appData.views.CreateActivityWieView.activityCreatedHandler = this.activityCreatedHandler;
        appData.views.CreateActivityWieView.friendsInvitedHandler = this.friendsInvitedHandler;

        $(appData.models.userModel.attributes.myFriends.models).each(function(index, userModel) {
            appData.views.friendsListView.push(new appData.views.FriendInvitieView({
              model:userModel,
            }));
        });
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;
      
      _(appData.views.friendsListView).each(function(listView) {
          $('#friendsList', appData.settings.currentModuleHTML).append(listView.render().$el);
      });

      this.setValidator();
      return this; 
    },

    setValidator: function(){

    },

    activityCreatedHandler: function(activity_id){

      // now add friends
      Backbone.off('activityCreated');
      Backbone.off('activityUpdated');

      appData.views.CreateActivityView.updating = false;
      appData.views.CreateActivityView.isUpdating = false;

      appData.views.CreateActivityWieView.activity_id = activity_id;

      if(appData.collections.selectedFriends.length > 0){
        Backbone.on('friendsInvitedHandler', appData.views.CreateActivityWieView.friendsInvitedHandler);
        appData.services.phpService.inviteFriends(appData.collections.selectedFriends, activity_id);
      }else{
        appData.services.phpService.getActivities(false, appData.views.CreateActivityWieView.activity_id);
      }

      // set this boolean so we return to disable back functionality
      appData.settings.created = true;
      appData.services.utilService.updateLocalStorage();
    },

    friendsInvitedHandler: function(){
      Backbone.off('friendsInvitedHandler');      
      appData.services.phpService.getActivities(false, appData.views.CreateActivityWieView.activity_id);
    }

});

appData.views.CreateUserView = Backbone.View.extend({

	initialize: function () {
        appData.events.createUserErrorEvent.bind("createUserErrorHandler", this.createUserErrorHandler);
        appData.events.locationHomeEvent.bind('locationErrorHandler', this.locationErrorHandler);
        appData.views.CreateUserView.selectedGender = 0;
        appData.views.CreateUserView.locationErrorHandler = this.locationErrorHandler;
        appData.views.CreateUserView.locationSuccesHandler = this.locationSuccesHandler;
        appData.views.CreateUserView.createUserHandler = this.createUserHandler;
    }, 

    render: function() { 
        this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
    	this.setValidator();

    	if(this.model){
    		$('#passwordInput', appData.settings.currentPageHTML).val(this.model.attributes.password);
    		$('#emailInput', appData.settings.currentPageHTML).val(this.model.attributes.email);
    	}

        $('.radio-list input[type="radio"]', appData.settings.currentPageHTML).change(function() {

            // Remove all checked
            $(this).parents('.radio-list').find('label').removeClass('checked');
            $(this).parent().addClass('checked');

            var selectedData = $(this).attr('id');
                selectedData = selectedData.split('-');
                selectedData = selectedData[1];

                appData.views.CreateUserView.selectedGender = selectedData;
        });
        
        return this; 
    }, 

    events: {
        "click #createUserButton": "createUserButtonHandler",
        "change #ageSlider": "ageSliderHandler"
    },

    ageSliderHandler: function(){
        $('#range', appData.settings.currentPageHTML).removeClass('hide').text($('#ageSlider', appData.settings.currentPageHTML).val() + " jaar");
    },

    createUserButtonHandler: function(){
        $("#createUserForm",appData.settings.currentPageHTML).submit();
    },

    createUserHandler: function(){


        Backbone.off('createUserHandler');
        appData.router.navigate('dashboard', true);
    },

    createUserErrorHandler: function(){
        alert('Fout bij het aanmaken van de gebruiker');
    },

	setValidator: function(){
        $("#createUserForm",appData.settings.currentPageHTML).validate({

            rules: {
                password: {
                    minlength:4
                },
                age: {
                  required: true,
                  range: [12, 60]
                }
            },

            messages: {
                genderradios: "Kies een optie"
            },

            errorPlacement: function(error, element) {

                if(element.attr("name") == "genderradios" ){
                    error.insertAfter("#genderSelect");
                }else{
                    error.insertAfter(element);
                }
            },

    		submitHandler: function(form) {
    			// CreateUser form logic
				var name = $('#nameInput', appData.settings.currentPageHTML).val();
				var password = $('#passwordInput', appData.settings.currentPageHTML).val();
				var email = $('#emailInput', appData.settings.currentPageHTML).val();
                var gender =  appData.views.CreateUserView.selectedGender;
                var age = $('#ageSlider', appData.settings.currentPageHTML).val();

				appData.models.userModel = new User();
                appData.models.userModel.set('name', name);
				appData.models.userModel.set('email', email);
				appData.models.userModel.set('password', password);
                appData.models.userModel.set('age', age);
                appData.models.userModel.set('gender', gender);

                 if(navigator.geolocation){

                    $('#facebookLoad').removeClass('hide');

                    // First lets get the location
                    Backbone.on('createUserLocationHandler', appData.views.CreateUserView.locationSuccesHandler);
                    Backbone.on('locationErrorHandler', appData.views.CreateUserView.locationErrorHandler);

                    appData.services.utilService.getLocationService("create");

                }else{
                    Backbone.on('createUserHandler', appData.views.CreateUserView.createUserHandler);
                    appData.services.phpService.createUser();
                }
		  	}
    	});
    },

    locationSuccesHandler: function(location){
        var myLocation = location.coords.latitude + "," + location.coords.longitude;
        appData.models.userModel.attributes.current_location = myLocation;

        Backbone.on('createUserHandler', appData.views.CreateUserView.createUserHandler);
        appData.services.phpService.createUser();
    },

    locationErrorHandler: function(){

        Backbone.off('locationError');

        Backbone.on('createUserHandler', appData.views.CreateUserView.createUserHandler);
        appData.services.phpService.createUser();
    }
});

appData.views.DashboardActivityView = Backbone.View.extend({

    initialize: function () {


    }, 

    events: {
    	"click .activityContainer": "clickHandler"
    },

    clickHandler: function(){
    	window.location.hash = "#activity/" + this.model.attributes.activity_id
    },

    render: function() { 
		var hasUser = this.model.attributes.user_id;
		var userName = "";
		var userID = "";

		if(hasUser){
			var userModel = appData.collections.users.where({"user_id": this.model.attributes.user_id})[0];
				userName = userModel.attributes.name;
				userID = userModel.attributes.user_id;
		}

    	// model to template
    	this.$el.html(this.template({username: userName, userid: userID, activity: this.model.toJSON(), imagePath: appData.settings.imagePath, users: this.model.attributes.users, userModel: appData.models.userModel.toJSON()}));
        return this; 
    }

});







appData.views.DashboardView = Backbone.View.extend({

    initialize: function () {

        var that = this;
        this.searching = false;
        this.favouriteSportsFilter = false;
     
        appData.events.updateActivitiesEvent.bind("activitiesUpdateHandler", this.activitiesUpdateHandler);        
        appData.collections.activities.sort_by_attribute('sql_index');
        Backbone.on('dashboardUpdatedHandler', this.generateAcitvitiesCollection);

        // update activities collection
        appData.views.DashboardView.markers = [];
        appData.views.DashboardView.clearMarkers = this.clearMarkers;
        appData.views.DashboardView.setMarkers = this.setMarkers;
        appData.views.DashboardView.initMap = this.initMap;
        appData.views.DashboardView.generateAcitvitiesCollection = this.generateAcitvitiesCollection;
        appData.views.DashboardView.firstRet = true;
        appData.views.DashboardView.filterEnabled = false;
        appData.views.DashboardView.sortActivitiesChangeHandler = this.sortActivitiesChangeHandler;

        // update the activities if we have a network connection
        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection()){
                appData.services.phpService.getActivities(false, null);
            }
        }else{
            appData.services.phpService.getActivities(false, null);
        }



        // image timer
        appData.settings.timer = setInterval(this.timerAction, 20000);

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    timerAction: function(){
        Backbone.on('dashboardUpdatedHandler', appData.views.DashboardView.generateAcitvitiesCollection);

        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection()){
                appData.services.phpService.getActivities(false, null);
            }
        }else{
            appData.services.phpService.getActivities(false, null);
        }
    },

    // phonegap device online
    networkFoundHandler: function(){
       
        if(!appData.settings.mapAdded && appData.services.utilService.getNetworkConnection()){
            appData.views.DashboardView.initMap();
        }

        appData.services.phpService.getActivities(false, null);
    },

    // phonegap device back online
    networkLostHandler: function(){

    },
    
    events: {
        "click #sortSelector a": "sortActivitiesChangeHandler",
        "click #searchButton": "toggleSearchHandler",
        "click #favs": "favsHandler",
        "keyup #searchInput": "searchHandler",
        "click #fullScreenButton": "fullscreenToggleHandler",
        "click #menuButton": "menuOpenHandler",
        "click #mapBtn": "fullscreenToggleHandler",
        "click #downButton": "downButtonHandler"
    },

    downButtonHandler: function(){
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    },

    fullscreenToggleHandler: function(){        
        $('#dashboard',appData.settings.currentPageHTML).toggleClass('mapOpen');
        google.maps.event.trigger(appData.views.DashboardView.map, 'resize');
    },

    activitiesUpdateHandler: function(){
        appData.collections.activities.each(function(activity) {
            activity.setGoing();
        });

        this.generateAcitvitiesCollection();
    },

    generateAcitvitiesCollection: function(){
        Backbone.off('dashboardUpdatedHandler');

        if(appData.views.DashboardView.filterEnabled){
            // GET OUR FILTER 
            appData.views.DashboardView.sortActivitiesChangeHandler();
        }else{
            $('#activityTable', appData.settings.currentPageHTML).empty();

            // show message that no activities have been found
            if(appData.collections.activities.length === 0){
                $('.no-found', appData.settings.currentPageHTML).removeAttr('style');

                // update the map
                appData.views.locationList = [];
                appData.views.DashboardView.setMarkers(appData.views.locationList);

            }else if(this.favouriteSportsFilter === true && $(appData.collections.filteredActivitiesCollection.models).length === 0){
                $('.no-found', appData.settings.currentPageHTML).removeAttr('style');
            
                // update the map
                appData.views.locationList = [];
                appData.views.DashboardView.setMarkers(appData.views.locationList);
            }else{

                $('.no-found', appData.settings.currentPageHTML).css({
                    'display':'none'
                });

                appData.views.activityListView = [];
                appData.views.locationList = [];

                var selectedCollection;
                if(this.searching){
                    $(appData.collections.activitiesSearch).each(function(index, activity) {
                      appData.views.locationList.push(activity);
                      appData.views.activityListView.push(new appData.views.DashboardActivityView({
                        model : activity
                      }));
                    });

                }else if(this.favouriteSportsFilter){

                    $(appData.collections.filteredActivitiesCollection.models).each(function(index, activity) {

                      appData.views.locationList.push(activity);
                      appData.views.activityListView.push(new appData.views.DashboardActivityView({
                        model : activity
                      }));
                    });


                }else{
                    appData.collections.activities.each(function(activity) {
                      appData.views.locationList.push(activity);
                      appData.views.activityListView.push(new appData.views.DashboardActivityView({
                        model : activity
                      }));
                    });
                }

                _(appData.views.activityListView).each(function(dv) {
                    $('#activityTable', appData.settings.currentPageHTML).append(dv.render().$el);
                });

                if(appData.services.utilService.getNetworkConnection() && appData.settings.native){
                    appData.views.DashboardView.setMarkers(appData.views.locationList);
                }else if(!appData.settings.native){

                    appData.views.DashboardView.setMarkers(appData.views.locationList);
                }


                // fix for old android
                if($('body').hasClass('422')){
/*                    var myHeight = appData.views.activityListView.length * 250;

                    $('#activityTable', appData.settings.currentPageHTML).css({
                        'height':myHeight + 'px !important',
                        'min-height': myHeight + 'px',
                        'overflow': 'scroll'
                    });*/
                }
            }
        }
    },

    searchHandler: function(evt){

     var search = $(evt.target).val().toLowerCase();
      if(search.length > 0){
      appData.collections.activitiesSearch = appData.collections.activities.filter(function(model) {
          return _.some(
            [ model.get('title') ], 
            function(value) {
              return value.toLowerCase().indexOf(search) != -1;
            });
         }); 
            this.searching = true;

      }else{
        this.searching = false;
      }

      this.generateAcitvitiesCollection();
    },

    // toggle search
    toggleSearchHandler: function(){
        $('#searchBar').toggleClass('hide');
        if($('#searchBar', appData.settings.currentPageHTML).hasClass('hide')){
            this.searching = false;
        }else{
            this.searching = true;
        }
    },

    // sort the activities table
    sortActivitiesChangeHandler: function(evt){
        appData.views.DashboardView.filterEnabled = false;

        if(evt){
            $('#sortSelector a', appData.settings.currentPageHTML).removeClass('active');
            $(evt.target).addClass('active');
        }
        
        var index = $('#sortSelector .active', appData.settings.currentPageHTML).index();
        this.favouriteSportsFilter = false;

        switch(index){
            case 0:
                appData.collections.activities.sort_by_attribute('sql_index');
            break;

            case 1:
                appData.collections.activities.each(function(activity) {
                    
                    // calculate the distance between my current location and the location of the event
                    // using the Haversine formula:
                    var current_location = appData.models.userModel.get('current_location').split(',');
                    var point1 = {};
                        point1.lat = current_location[0];
                        point1.lng = current_location[1];

                    var activity_location = activity.attributes.coordinates.split(',');
                    var point2 = {};
                        point2.lat = activity_location[0];
                        point2.lng = activity_location[1];

                    var rad = function(x) {
                        return x*Math.PI/180;
                    }

                    var R = 6371; // earth's mean radius in km
                    var dLat  = rad(point2.lat - point1.lat);
                    var dLong = rad(point2.lng - point1.lng);

                    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                          Math.cos(rad(point1.lat)) * Math.cos(rad(point2.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    var d = R * c;
                    var resultaat = d.toFixed(2);

                    activity.attributes.distance = parseInt(resultaat);
                });

                // now order the collection by the distance
                appData.collections.activities.sort_by_attribute('distance');
            break;

            case 2:
                var filters = [];
                appData.models.userModel.attributes.myFavouriteSports.each(function(model){
                    var filterCollection = new ActivitiesCollection();
                        filterCollection = appData.collections.activities.where({"sport_id": model.attributes.sport_id})[0];
                        filters.push(filterCollection);
                });

                var allActivities = new ActivitiesCollection();
                var extractedModels = new ActivitiesCollection();
                _.each(filters,function(collection, index){
                    $(collection).each(function(ind, collectionEl){
                        extractedModels.push(collectionEl);
                    });
                });

                appData.collections.filteredActivitiesCollection = extractedModels;
                this.favouriteSportsFilter = true;
            break;

        }
        this.generateAcitvitiesCollection();
        appData.views.DashboardView.filterEnabled = true;

    },

    favsHandler: function(){
     
    },

    render: function () {
        var view = this;

        this.$el.html(this.template({sortForm: appData.collections.sortOptions.toJSON()}));
        appData.settings.currentPageHTML = this.$el;

        if(appData.settings.native){
            if(!appData.services.utilService.getNetworkConnection()){
                $('#createActivityButton', appData.settings.currentPageHTML).hide();
            }else{
                this.initMap();
            }
        }else if(!appData.settings.native){
           this.initMap();
        }
        this.generateAcitvitiesCollection();

        return this;
    },

    menuOpenHandler: function(){
        $("#mainMenu").trigger("open");
    },

    initMap: function() { 
        appData.settings.mapAdded = true;

        var myLocation = appData.models.userModel.attributes.current_location;

        if(myLocation !== "" || myLocation !== null){
            myLocation = appData.models.userModel.attributes.current_location.split(',');
        }else{
            myLocation = appData.settings.defaultLocation;
        }

        appData.views.DashboardView.locations = myLocation;

        var mapOptions = {
            backgroundColor: '#dacab4',
            zoom: 15,
            center: new google.maps.LatLng(appData.views.DashboardView.locations[0], appData.views.DashboardView.locations[1]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            keyboardShortcuts: false
        }
        appData.views.DashboardView.map = new google.maps.Map($('#map_canvas',appData.settings.currentPageHTML)[0], mapOptions);

        // resize and relocate map
        google.maps.event.addListenerOnce(appData.views.DashboardView.map, 'idle', function() {
            google.maps.event.trigger(appData.views.DashboardView.map, 'resize');
            appData.views.DashboardView.map.setCenter(new google.maps.LatLng(appData.views.DashboardView.locations[0], appData.views.DashboardView.locations[1]), 13);
        });

        var image = new google.maps.MarkerImage(appData.settings.iconPath + "my-map-icon@x2.png", null, null, null, new google.maps.Size(23,23)); // Create a variable for our marker image.             
        var userMarker = new google.maps.Marker({ // Set the marker
            position: new google.maps.LatLng(appData.views.DashboardView.locations[0], appData.views.DashboardView.locations[1]),
            icon: image, //use our image as the marker
            map:  appData.views.DashboardView.map,
            title: '',
            animation: google.maps.Animation.DROP,
            optimized: false
        });
        appData.views.DashboardView.markers.push(userMarker);

        var set = google.maps.InfoWindow.prototype.set;
        google.maps.InfoWindow.prototype.set = function (key, val) {
            if (key === 'map') {
                if (!this.get('noSupress')) {
                    console.log('This InfoWindow is supressed. To enable it, set "noSupress" option to true');
                    return;
                }
            }
            set.apply(this, arguments);
        }
        if(navigator.geolocation && appData.settings.native){

            Backbone.on('getMyLocationHandler', this.getMyLocationHandler);
            appData.services.utilService.getLocationService("dashboard");
        }
    },

    getMyLocationHandler: function(position){
        Backbone.off('getMyLocationHandler');
        if(position){
            var myLocation = position.coords.latitude + "," + position.coords.longitude;
            appData.models.userModel.attributes.current_location = myLocation;
            appData.views.DashboardView.locations = myLocation.split(',');

            if(appData.settings.native && appData.services.utilService.getNetworkConnection()){
                appData.views.DashboardView.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 13);
                appData.views.DashboardView.setMarkers(appData.views.locationList);
            }else if(!appData.settings.native){
                appData.views.DashboardView.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 13);
                appData.views.DashboardView.setMarkers(appData.views.locationList);                
            }
        }
    },

    setMarkers: function(models){
        appData.views.DashboardView.clearMarkers();

        var going = false;
        $(models).each(function(index, model){
            if(model.attributes.users.length > 0){
               $(model.attributes.users).each(function(index, element){

                    if(parseInt(element.user_id) === parseInt(appData.models.userModel.attributes.user_id)){
                        going = true;
                    }
                });
            }
            var activityImage;
            if(going){
                activityImage = new google.maps.MarkerImage(appData.settings.iconPath + "goingMarker@x2.png", null, null, null, new google.maps.Size(26,30)); // Create a variable for our marker image.             
            }else{
                activityImage = new google.maps.MarkerImage(appData.settings.iconPath + "open-icon@x2.png", null, null, null, new google.maps.Size(26,30)); // Create a variable for our marker image.             
            }

            if(model.attributes.coordinates){
            var coordinates = model.attributes.coordinates.split(",");
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(coordinates[0], coordinates[1]),
              map:  appData.views.DashboardView.map,
              title: "",
              icon: activityImage,
              optimized: false
            });

            marker.activityModel = model;

            google.maps.event.addListener(marker, "click", function(evt) {
                window.location = "#activity/" + this.activityModel.attributes.activity_id;
            });
            appData.views.DashboardView.markers.push(marker);
            }
        });


        var image = new google.maps.MarkerImage(appData.settings.iconPath + "my-map-icon@x2.png", null, null, null, new google.maps.Size(23,23)); // Create a variable for our marker image.             
        var userMarker = new google.maps.Marker({ // Set the marker
            position: new google.maps.LatLng(appData.views.DashboardView.locations[0], appData.views.DashboardView.locations[1]),
            icon: image, //use our image as the marker
            map:  appData.views.DashboardView.map,
            title: '',
            optimized: false
        });
        appData.views.DashboardView.markers.push(userMarker);
    },

    clearMarkers: function(){
        for (var i=0; i<appData.views.DashboardView.markers.length; i++) {
          appData.views.DashboardView.markers[i].setVisible(false);
        }
        appData.views.DashboardView.markers = [];
    },
});



appData.views.FavouriteSportListSettingView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
    	this.model.attributes.path = appData.settings.sportsPath;

    	// model to template
    	this.$el.html(this.template({ data: this.model.toJSON(), icon: this.model.attributes.icon, path: appData.settings.sportsPath }));
        return this; 
    }

});




appData.views.FavouriteSportListView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
    	this.model.attributes.path = appData.settings.sportsPath;

    	// model to template
    	this.$el.html(this.template({ data: this.model.toJSON(), icon: this.model.attributes.icon, path: appData.settings.sportsPath }));
        return this; 
    }

});




appData.views.FriendInvitieView = Backbone.View.extend({

    initialize: function () {
      appData.views.FriendView.model = this.model;

      console.log(this.model.attributes.user_id);
    },

    render: function() { 
      this.$el.html(this.template({friend: this.model.toJSON(), imagePath: appData.settings.imagePath}));
      appData.settings.currentPageHTML = this.$el;
      return this; 
    }, 

    events: {
      "click .inviteButton": "friendInviteHandler"
    },

    friendInviteHandler: function(evt){
      $(evt.target).toggleClass('selected');
      if($(evt.target).hasClass('selected')){
        $(evt.target).text('Uitgenodigd');

        var selected = appData.models.userModel.attributes.myFriends.where({ "user_id": $(evt.target, appData.settings.currentPageHTML).attr('data-id')})[0];
        appData.collections.selectedFriends.push(selected)

      }else{
        $(evt.target).text('Niet uitgenodigd');
        var m = appData.collections.selectedFriends.where({ "user_id": $(evt.target, appData.settings.currentPageHTML).attr('data-id')})[0];
        appData.collections.selectedFriends.remove(m);
      }

      console.log(appData.collections.selectedFriends);
    }
});

appData.views.FriendView = Backbone.View.extend({

    initialize: function () {
      appData.views.FriendView.model = this.model;

      // is this a friend?
      if(appData.models.userModel.attributes.myFriends.where({"user_id": this.model.attributes.user_id}).length > 0){
        this.model.attributes.myFriend = false;
      }else if(appData.views.FriendView.model.attributes.user_id == appData.models.userModel.attributes.user_id){
        this.model.attributes.myFriend = false;
      }else{
        this.model.attributes.myFriend = false;
      }
      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function() { 
      this.$el.html(this.template({imagePath: appData.settings.imagePath, user_id: appData.models.userModel.attributes.user_id, user: this.model.toJSON()}));
      appData.settings.currentPageHTML = this.$el;

      Backbone.on('userMediaHandler', this.userMediaRecievedHandler);
      appData.services.phpService.getUserMedia(this.model.attributes.user_id);

      Backbone.on('getBadgesHandler', this.getBadgesHandler);
      appData.services.phpService.getBadges(this.model.attributes.user_id);


      // new avatar
      var avatarModel = appData.services.avatarService.generateAvatar(appData.views.FriendView.model);
      var avatarView = new appData.views.AvatarDisplayView({model: avatarModel});

      $('#avatar', appData.settings.currentPageHTML).append(avatarView.render().$el);

      return this; 
    }, 

    getBadgesHandler: function(badges){
      Backbone.off('getBadgesHandler');
      
      // generate badges list
      appData.views.FriendView.model.attributes.badges = new ChallengesCollection(badges);
     
      // badges grid
      var bwidth = $('#badgesOverview ul', appData.settings.currentPageHTML).width();
      var bdwidth = $('#badgesOverview ul li',appData.settings.currentPageHTML).first().width() + 12 + 2;
          bdwidth = parseInt(bdwidth);

      var howMany = appData.models.userModel.attributes.challengesCount;
      if(!isNaN(howMany)){
          $('#badgesOverview ul', appData.settings.currentPageHTML).empty();
          for (var i=0; i<howMany; i++){
              $('#badgesOverview ul', appData.settings.currentPageHTML).append('<li></li>');
          }          
      }
      $('#badgesOverview', appData.settings.currentPageHTML).slideDown(200);

      if(appData.views.FriendView.model.attributes.badges.length !== 0){
        var ind = 0;

        appData.views.FriendView.model.attributes.badges.each(function(badge){
        
          ind++;

          var bView = new appData.views.BadgeListView({model: badge});
          $('#badgesOverview ul li:eq(' + ind + ')', appData.settings.currentPageHTML).append(bView.render().$el).addClass('badger');
        });
      }
    }, 

    userMediaRecievedHandler: function(media){

      var mediaList = [];

      // generate media tiles

      if(media.length !== 0){
      media.each(function(mediaModel) {

          mediaModel.attributes.userModel = appData.views.FriendView.model.attributes;
          mediaModel.attributes.imagePath = appData.settings.imagePath;

          mediaList.push(new appData.views.ActivityMediaViewer({
            model : mediaModel
          }));
      });

      $('#mediaContainer', appData.settings.currentPageHTML).empty();
      _(mediaList).each(function(dv) {
          $('#mediaContainer', appData.settings.currentPageHTML).append(dv.render().$el);
      });
      }else{
        $('#mediaSection', appData.settings.currentPageHTML).hide();
      }
    },

    events: {
      "click #backButton": "backHandler",
      "click #addFriendButton": "addFriendHandler"
    },

    addFriendHandler: function(){
      Backbone.on('addedFriendHandler', this.addedAsFriendHandler);
      appData.services.phpService.addFriend(appData.views.FriendView.model.attributes.user_id, appData.models.userModel.attributes.user_id);
    },

    backHandler: function(){
      window.history.back();
    },

    addedAsFriendHandler: function(){
      Backbone.off('addedFriendHandler');
      $('#addFriendButton', appData.settings.currentPageHTML).remove();
    }
});



appData.views.FriendsListView = Backbone.View.extend({

    initialize: function () {
 	
    },

    render: function () {
    	// model to template
    	this.$el.html(this.template({user: this.model.toJSON(), imagePath: appData.settings.imagePath}));

        return this; 


    }
});

appData.views.GoogleMapView = Backbone.View.extend({

    initialize: function () {



    }, 

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentPageHTML = this.$el;

       var mapOptions = {
          zoom: 15,
          center: new google.maps.LatLng(14, 10),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
      }

        appData.settings.mapAdded = true;
        var map = new google.maps.Map($('#map',appData.settings.currentPageHTML)[0], mapOptions);      

      return this; 
    }
});



appData.views.HelperView = Backbone.View.extend({

    initialize: function () {
    }, 

    getLocation: function(){

    }
});


appData.views.HomeView = Backbone.View.extend({

    initialize: function () {
        appData.events.userLoggedInEvent.bind("userLoggedInHandler", this.userLoggedInHandler);
        appData.events.userLoggedInErrorEvent.bind("userLoggedInErrorHandler", this.userLoggedInErrorHandler);
        appData.events.userLoggedInPasswordErrorEvent.bind("userLoggedInPasswordErrorHandler", this.userLoggedInPasswordErrorHandler);
        appData.events.facebookLoginErrorEvent.bind("facebookLoginErrorHandler", this.facebookLoginErrorHandler);
        appData.events.facebookGetFriendsEvent.bind("facebookGetFriendsHandler", this.facebookGetFriendsHandler);
        appData.events.facebookGetFriendsErrorEvent.bind("userLoggedInPasswordErrorHandler", this.facebookGetFriendErrorHandler);
        appData.events.getUserFromFacebookIDEvent.bind("facebookGetIDHandler", this.facebookGetIDHandler)
        appData.events.facebookUserToSQLEvent.bind('facebookUserToSQLSuccesHandler', this.facebookUserToSQLSuccesHandler);
        appData.events.locationHomeEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationHomeEvent.bind('locationErrorHandler', this.locationErrorHandler);
        
        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);

        appData.views.HomeView.facebookLoginHandler = this.facebookLoginHandler;
        appData.views.HomeView.facebookProfileDataHandler = this.facebookProfileDataHandler;
        appData.views.HomeView.locationErrorHandler = this.locationErrorHandler;
        appData.views.HomeView.nextSlide = this.nextSlide;
        appData.views.HomeView.prevSlide = this.prevSlide;
        appData.views.HomeView.gotoSlide = this.gotoSlide;
        appData.views.HomeView.currentSlide = 0;
        appData.views.HomeView.slides = 2;
    }, 

    gotoSlide: function(index){
        if(index > appData.views.HomeView.slides){
            index = 0;
        }
        if(index < 0){
            index =  appData.views.HomeView.slides;
        }

        $('#carouselNav li a', appData.settings.currentPageHTML).removeClass('active');
        $('#carouselNav li a:eq(' + index + ')').addClass('active');
        $('#car' + appData.views.HomeView.currentSlide).fadeOut(200,function(){
            $('#car' + index).fadeIn(200, function(){
                appData.views.HomeView.currentSlide = index;
            }).css( 'display', 'table').addClass('active');
        });
    },

    prevSlide: function(){

    },

    nextSlide: function(){

    },

    // phonegap device offline
    networkFoundHandler: function(){

    },

    updateCSS: function() {
        var containerHeight =  $('.cl-content ', appData.settings.currentPageHTML).height() - $('#loginForm', appData.settings.currentPageHTML).height() - 60;

        $('#carouselContent li', appData.settings.currentPageHTML).css({
            'height':containerHeight + 'px'
        });
    },

    // phonegap device back online
    networkLostHandler: function(){
        appData.router.navigate('noconnection', true);
    },

    render: function() { 
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
    	this.setValidator();
        this.$el.hammer();

        $('#carousel', appData.settings.currentPageHTML).delay(100).fadeOut(function(){
            var containerHeight =  $('.cl-content ', appData.settings.currentPageHTML).height() - $('#loginForm', appData.settings.currentPageHTML).height() - 60;

            $('#carouselContent li', appData.settings.currentPageHTML).css({
                'height':containerHeight + 'px'
            });

            $('#carousel', appData.settings.currentPageHTML).fadeIn(200);
        });

        $(window).on("resize", this.updateCSS);

        return this;         
    },

    events: {
        "click #FBloginButton": "facebookClickHandler",
        "click #loginFormSubmit": "loginFormSubmitHandler",
        "click #carouselNav a": "carouselClickHandler",
        "swipe #carouselContent": 'onSwipe',
        "click #carouselContent": 'onClick'
    },

    /*
*/

    onClick: function(){
        appData.views.HomeView.gotoSlide(appData.views.HomeView.currentSlide + 1);
    },

    loginFormSubmitHandler: function(){
        $("#loginForm",appData.settings.currentPageHTML).submit();
    },

    onSwipe: function(e){
        if(e.gesture.direction !== "up" || e.gesture.direction !== "down"){
            var target = 0;
            switch(e.gesture.direction){
                case "right":
                    target = -1;
                break;

                case "left":
                    target = 1;
                break;
            }
            var myTarget = appData.views.HomeView.currentSlide + target;
            appData.views.HomeView.gotoSlide(myTarget);
        }
    },

    carouselClickHandler: function(evt){
        var myIndex = $(evt.target).parent().index();
        appData.views.HomeView.gotoSlide(myIndex);

        $('#carouselNav li a', appData.settings.currentPageHTML).removeClass('active');
        $(evt.target).addClass('active');
    },

	setValidator: function(){
    	$("#loginForm",appData.settings.currentPageHTML).validate({
    		submitHandler: function(form) {
			 	// Store page
				var email = $('#emailInput', appData.settings.currentPageHTML).val();
				var password = $('#passwordInput', appData.settings.currentPageHTML).val();

				appData.models.userModel.set('email', email);
				appData.models.userModel.set('password', password);

                appData.services.phpService.userLogin();
		  	},invalidHandler: function(form, validator) {
            // not sure if this is the correct selector but I found it here: http://docs.jquery.com/Plugins/Validation/validate#toptions
        }
    	});
    },

    /**
    * Facebook login flow 
    */
    facebookUserToSQLSuccesHandler: function(){
        $('#facebookLoad').removeClass('hide');
        appData.router.navigate('loading', true);
    },

    facebookGetIDHandler: function(newUser){
        if(!newUser.facebook_user){
            
            appData.settings.newUser = true;

            if(navigator.geolocation){
                // First lets get the location
                Backbone.on('locationError', appData.views.HomeView.locationErrorHandler);
                appData.services.utilService.getLocationService("login");
            }else{
                appData.services.facebookService.facebookUserToSQL();
            }

        }else{
            appData.settings.newUser = false;
            appData.models.userModel.set('user_id', newUser.user_id);

            if(navigator.geolocation){
                Backbone.on('locationError', appData.views.HomeView.locationErrorHandler);

                appData.services.utilService.getLocationService("login");
            }else{
                appData.router.navigate('loading', true);
            }      
        }
    },

    locationSuccesHandler: function(location){
        var myLocation = location.coords.latitude + "," + location.coords.longitude;
        appData.models.userModel.set('current_location', myLocation);

        if(appData.settings.newUser){
            appData.services.facebookService.facebookUserToSQL();
        }else{
            appData.router.navigate('loading', true);
        }
    },

    locationErrorHandler: function(){
        Backbone.off('locationError');
        if(appData.settings.newUser){
            appData.services.facebookService.facebookUserToSQL();
        }else{
            appData.router.navigate('loading', true);
        }
    },

    facebookProfileDataHandler: function(){
        // get friends
        Backbone.off('facebookProfileDataHandler');
        appData.services.facebookService.getUserFromFacebookID();
    },

    facebookLoginHandler: function(){
        // fetch profile data
        Backbone.off("facebookLoginHandler");
        Backbone.on('facebookProfileDataHandler', appData.views.HomeView.facebookProfileDataHandler);

        appData.services.facebookService.getProfileData();
        $('#facebookLoad').removeClass('hide');
    },

    facebookClickHandler: function(){
        Backbone.on("facebookLoginHandler", appData.views.HomeView.facebookLoginHandler);
        if(!appData.settings.native){
            appData.services.facebookService.facebookConnect();
        }
        appData.services.facebookService.facebookLogin();
    },

    facebookLoginErrorHandler: function(){
        alert('error loggin on to facebook')
    },

    facebookGetFriendErrorHandler: function(){
        alert('error getting friends from facebook');
    },

    /**
    * Normal Login flow
    */
    userLoggedInHandler: function(){

        // get location
        if(navigator.geolocation){
            $('#facebookLoad').removeClass('hide');

            // First lets get the location
            Backbone.on('locationError', appData.views.HomeView.locationErrorHandler);
            appData.services.utilService.getLocationService("login");
        }else{
            $('#loginForm .error-box', appData.currentPageHTML).removeClass('show').addClass('hide');
            appData.router.navigate('loading', true);        
        }
    },

    userLoggedInPasswordErrorHandler: function(){
        $('#loginForm .error-box', appData.currentPageHTML).html(appData.messages.passwordIncorrect).removeClass('hide').addClass('show');
    },

    userLoggedInErrorHandler: function(){
        appData.router.navigate('createUser', true);
    }

});

appData.views.LoadingView = Backbone.View.extend({

    initialize: function () {
        appData.views.LoadingView = this;

        appData.events.getActivitiesSuccesEvent.bind("activitiesLoadedHandler", this.activitiesLoadedHandler);
        appData.events.getSportsSuccesEvent.bind("sportsLoadedHandler", this.sportsLoadedHandlers);
        appData.events.getUsersSuccesEvent.bind("usersLoadedHandler", this.usersLoadedHandler)
        appData.events.getBuurtenEvent.bind("buurtenLoadedHandler", this.buurtenLoadedHandler);
        appData.events.getLocationsSuccesEvent.bind("getLocationsSuccesHandler", this.getLocationsSuccesHandler);
        Backbone.on('getChallengesHandler', this.getChallengesHandler)
        Backbone.on('myPlannedActivitiesLoadedHandler', this.getMyPlannedActivitiesLoadedHandler);
        Backbone.on('myActivitiesLoadedHandler', this.getMyActivitiesLoadedHandler);
        Backbone.on('getFavouriteSportsHandler', this.getFavouriteSportsHandler)
        Backbone.on('getMyFavouriteSportsHandler', this.getMyFavouriteSportsHandler)
        Backbone.on('getMyChallengesHandler', this.getMyChallengesHandler);
        Backbone.on('getMyBadgesHandler', this.getMyBadgesHandler);
        Backbone.on('getFriendsHandler', this.loadingCompleteHandler);
        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
        Backbone.on('getChallengesCount', this.getChallengesCount)
    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));

        appData.settings.currentPageHTML = this.$el;
        
        if(appData.settings.userLoggedIn){

            // load the data
            appData.services.phpService.getChallengesCount();
        }else{
            window.location.hash = "";
        }
        return this;
    },

    getChallengesCount: function(){
        appData.services.phpService.getActivities(true);
    },

    activitiesLoadedHandler: function(){
        appData.services.phpService.getSports();
    },

    sportsLoadedHandlers: function(){
        
        appData.services.phpService.getChallenges();
    },

    getChallengesHandler: function(){
        Backbone.off('getChallengesHandler');
        appData.services.phpService.getUsers();
    },

    usersLoadedHandler: function(){
        appData.services.phpService.getBuurten();
    },

    buurtenLoadedHandler: function(){
        appData.services.phpService.getLocations();
    },

    getLocationsSuccesHandler: function(){
        appData.services.phpService.getMyPlannedActivities();
    },

    getMyPlannedActivitiesLoadedHandler: function(){
      Backbone.off('myPlannedActivitiesLoadedHandler');
      appData.services.phpService.getMyActivities();
    },

    getMyActivitiesLoadedHandler: function(){
      Backbone.off('myActivitiesLoadedHandler');
      appData.services.phpService.getFavouriteSports();
    },

    getFavouriteSportsHandler: function(){
        appData.services.phpService.getUserFavouriteSports();
        Backbone.off('getFavouriteSportsHandler');
    },

    getMyFavouriteSportsHandler: function(){
        appData.services.phpService.getMyChallengesHandler();
        Backbone.off('getMyFavouriteSportsHandler');
    },

    getMyChallengesHandler: function(){
        Backbone.off('getMyChallengesHandler');
        appData.services.phpService.getMyBadges();
    },

    getMyBadgesHandler: function(){
        Backbone.off('getMyBadgesHandler');
        appData.services.phpService.getFriends();
    },

    loadingCompleteHandler: function(){
        Backbone.off('getFriendsHandler');

        // set localstorage, so the user has data stored in case the connection drops
        // set collections
        window.localStorage.setItem("collections", JSON.stringify(appData.collections));
        window.localStorage.setItem("userModel", JSON.stringify(appData.models.userModel));

        appData.settings.dataLoaded = true;
         $('#mainMenu #userAvatar').removeAttr('style');
        $('#mainMenu #userAvatar').css({
            "background": "url("+  appData.settings.imagePath + appData.models.userModel.attributes.avatar + ") repeat center center",
            "background-size": "cover"
        });
        $('#mainMenu #userName').text(appData.models.userModel.attributes.name);
        $('#mainMenu #userAvatar').css({
            'background-repeat': 'no-repeat'
        });


        if(appData.models.userModel.attributes.myFavouriteSports.length > 0){
            if(appData.settings.forwardAfterLogin === true){
                appData.settings.forwardAfterLogin = false;
                window.location.hash = "#activity/" + appData.settings.forwardAfterLoginID;
                
            }else{
                appData.router.navigate('dashboard', true);
            }
        }else{
            appData.router.navigate('sportselector', true);
        }
    },


    destroy_view: function() {


    }

});


appData.views.NavigationBusView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      return this;
    }

});




appData.views.NavigationMapView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      this.setMap();

      return this;
    }, 

    setMap: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        var map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        var coordinates = appData.views.ActivityDetailView.model.attributes.coordinates.split(',');

        google.maps.event.addListenerOnce(map, 'idle', function() {
          google.maps.event.trigger(map, 'resize');
          map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel($('#directions', page)[0]);

        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: appData.models.userModel.attributes.current_location,
            destination: appData.views.ActivityDetailView.model.attributes.coordinates,
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
                directionsDisplay.setDirections(response);
            }
            else
              $("#error").append("Unable to retrieve your route<br />");
          }
        );
    }
});




appData.views.NavigationView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'beforeRender', 'render', 'afterRender'); 
        var _this = this; 
        this.render = _.wrap(this.render, function(render) { 
            _this.beforeRender(); 
            render(); 
            _this.afterRender(); 
            return _this; 
        }); 

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 
    
    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    beforeRender: function() { 
    }, 

    render: function() { 
        this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;
        this.currentActivityPage = '#googleMap';
        return this; 
    }, 

    events: {
        "click #navigationTabs .cl-btn": "navigationTabsHandler",
        "click .back-button": "back"
    },

    navigationTabsHandler: function(evt){
        // tab on activity detail
        $('#navigationTabs .cl-btn').removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');

        $(this.currentActivityPage, appData.settings.currentPageHTML).removeClass('show').addClass('hide');
        $(selectedPage, appData.settings.currentPageHTML).removeClass('hide').addClass('show');

        this.currentActivityPage = selectedPage;
    },

    afterRender: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        var map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        var coordinates = appData.views.ActivityDetailView.model.attributes.coordinates.split(',');

        google.maps.event.addListenerOnce(map, 'idle', function() {
          google.maps.event.trigger(map, 'resize');
          map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel($('#directions', page)[0]);

        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: appData.models.userModel.attributes.current_location,
            destination: appData.views.ActivityDetailView.model.attributes.coordinates,
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
                directionsDisplay.setDirections(response);
            }
            else
              $("#error").append("Unable to retrieve your route<br />");
          }
        );
    },

    back: function(event) {
        window.history.back();
        return false;
    }


});




appData.views.NoConnectionView = Backbone.View.extend({

    initialize: function () {

      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){
        window.history.back();
    },

    // phonegap device back online
    networkLostHandler: function(){
        window.location = "#";
    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
    
      return this; 
    },
    events: {
        "click #refreshButton": "checkConnectionHandler"
    },

    checkConnectionHandler: function(){
        var result = appData.services.utilService.checkConnection();
        alert(appData.settings.network);

        if(appData.settings.network){
            window.location = "#";
        }
    }
});

appData.views.PlannerInvitedActivitiesView = Backbone.View.extend({

    initialize: function () {
    	appData.views.PlannerInvitedActivitiesView.model = this.model;
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this; 
    }
});

appData.views.PlannerMyActivitiesView = Backbone.View.extend({
	tagName: 'li',
	className: 'plan',
    initialize: function () {

    },
    
    editboxClickHandler: function(){

    },

    render: function () {
		var sportModel = appData.collections.sports.where({'sport_id': this.model.attributes.sport_id})[0];
        var model = this.model;


        this.$el.html(this.template({data: this.model.attributes, imagePath: appData.settings.sportsPath, sport: sportModel.attributes.icon}));

        if(model.attributes.author_badge){
          $('.edit-badge', this.$el).removeAttr('style');
          $('.edit-badge-hitbox',this.$el).removeAttr('style');
        }

        return this; 
    }
});

appData.views.PlannerTimelineWrap = Backbone.View.extend({

  initialize: function () {

  }, 

  render: function () {

    this.$el.html(this.template());

    return this;
  }
});

appData.views.PlannerView = Backbone.View.extend({

  initialize: function () {

    appData.views.PlannerView.updatePlanner = this.updatePlanner;
    appData.views.PlannerView.updatePlannerComplete = this.updatePlannerComplete;
    appData.views.PlannerView.getInvitationsHandler = this.getInvitationsHandler;
    appData.views.PlannerView.acceptedInvite = this.acceptInviteHandler;
    appData.views.PlannerView.firstRet = true;
    Backbone.on('acceptInviteHandler', this.acceptInviteHandler);

    // Update when a user accepts / declines an invitation
    appData.views.PlannerView.acceptedInvite = this.acceptedInvite;
  
    // update the activities if we have a network connection
    Backbone.on('dashboardUpdatedHandler', this.generateTimeLine);
    if(appData.settings.native){
        if(appData.services.utilService.getNetworkConnection()){
            appData.services.phpService.getActivities(false, null);
        }else{
          this.generateTimeLine();
        }
    }else{
        appData.services.phpService.getActivities(false, null);
    }

    Backbone.on('networkFoundEvent', this.networkFoundHandler);
    Backbone.on('networkLostEvent', this.networkLostHandler);

    // image timer
    appData.settings.timer = setInterval(this.timerAction, 20000);
  }, 

  generateTimeLine: function(){

      appData.views.activityListView = [];
      appData.collections.activities.each(function(activity) {

        var add = false;

        // am I going to this activity? 
        if(activity.attributes.user_id == appData.models.userModel.attributes.user_id){

          // I am a creator
          add = true;
          activity.attributes.author_badge = true;
        }else{

          // I set the going to true
          $(activity.attributes.users).each(function(index, element){
              if(element.user_id == appData.models.userModel.attributes.user_id){
                activity.attributes.author_badge = false;
                add = true;
              }
          });
        }

        if(add){
          appData.views.activityListView.push(new appData.views.PlannerMyActivitiesView({
            model : activity
          }));
        }
      });

      $('#plannerMap', appData.settings.currentPageHTML).empty();
      
      var first = true;
      var lastDate;
      var savedDate;

      if(appData.views.activityListView.length !== 0){
          $('#bd').css({
              "display":"none"
          });

        _(appData.views.activityListView).each(function(element, index) {

            // same date
            if(lastDate == element.model.attributes.savedDate){
                $('#plannerMap .planner-section .plan-list', appData.settings.currentPageHTML).last().append(element.render().$el);
            
            // andere datum (nieuwe tijdlijn)
            }else{
              var savedDate = "";
              var dateCheck = element.model.attributes.date.split(" ");

              switch(dateCheck[0]){
                case "Vandaag":
                  savedDate = dateCheck[0];
                break;

                case "Morgen":
                  savedDate = dateCheck[0];
                break;
              }

              // convert to readable date
              if(savedDate === ""){
                savedDate = element.model.attributes.date;
              }

              fr = new appData.views.PlannerTimelineWrap();
              $('#plannerMap',appData.settings.currentPageHTML).append(fr.render().$el);
              $('#plannerMap h3', appData.settings.currentPageHTML).last().text(savedDate);
              $('#plannerMap .planner-section .plan-list', appData.settings.currentPageHTML).last().append(element.render().$el).hide();

              if(appData.views.PlannerView.firstRet){
                appData.views.PlannerView.firstRet = false;
                $('.plan-list', appData.settings.currentPageHTML).show(600);
              }else{
                $('.plan-list', appData.settings.currentPageHTML).show();
              }
            }

            lastDate = element.model.attributes.savedDate;
          });

          // bind click handler
          $('.plan-list li', appData.settings.currentPageHTML).click(function(evt){
            
              var id = $('h2',evt.currentTarget).attr('data-id');
              if(id){
                
                if($(evt.target).hasClass('edit-badge-hitbox')){
                  window.location.href = "#update/" + id;
                }else{
                  window.location.href = "#activity/" + id;
                }
              }
          });
        }else{
          $('#bd').removeAttr('style');
        }

        appData.services.utilService.updateLocalStorage();
  },

  timerAction: function(){
    Backbone.on('dashboardUpdatedHandler', this.generateTimeLine);
    if(appData.settings.native){
        if(appData.services.utilService.getNetworkConnection()){
            appData.services.phpService.getActivities(false, null);
        }
    }else{
        appData.services.phpService.getActivities(false, null);
    }
  },

  // phonegap device offline
  networkFoundHandler: function(){
    Backbone.on('myPlannedActivitiesLoadedHandler', this.updatePlanner);
    appData.services.phpService.getMyPlannedActivities();
  },

  // phonegap device back online
  networkLostHandler: function(){

  },

  events:{
      "click .inviteButtons a":"handleInviteHandler",
      "click #menuButton": "menuOpenHandler"
  },

  menuOpenHandler: function(){
        $("#mainMenu").trigger("open");
  },

  handleInviteHandler: function(evt){

    var selectedStatus = $(evt.target).attr('data');
    var invitationID =  $(evt.target).parent().attr('data-invitation');
    var activityID = $(evt.target).parent().attr('data-activity-id');

    // Decline animation
    if(selectedStatus == 0){

    // Approve animation
    }else{

    }

    $(evt.target).parent().parent().hide(200);
    Backbone.on('acceptInviteHandler');
    appData.services.phpService.handleInvitations(invitationID, selectedStatus, activityID);
  },

  acceptInviteHandler: function(){
    console.log("invite updated");
    Backbone.on('myPlannedActivitiesLoadedHandler', appData.views.PlannerView.updatePlanner);
    appData.services.phpService.getMyPlannedActivities();
  },

  updatePlanner: function(){
    console.log('myPlannedActivitiesLoadedHandler');
    Backbone.on('myActivitiesLoadedHandler', appData.views.PlannerView.updatePlannerComplete);
    appData.services.phpService.getMyActivities();
  },

  updatePlannerComplete: function(){
    console.log('myActivitiesLoadedHandler');

    Backbone.on('getInvitationsHandler', appData.views.PlannerView.getInvitationsHandler)
    appData.services.phpService.getMyInvitations();
  },

  getInvitationsHandler: function(){
    Backbone.off('myPlannedActivitiesLoadedHandler');
    Backbone.off('myActivitiesLoadedHandler');
    Backbone.off('getInvitationsHandler');
    Backbone.off('acceptInviteHandler');

    appData.views.PlannerView.myActivitiesView = [];
    appData.views.PlannerView.myJoinedActivitiesView = [];
    appData.views.PlannerView.myInvitedActivitiesView = [];
/*
    $("#myInvitationsPlanner", appData.settings.currentPageHTML).addClass('hide');
    $("#myActivitiesPlanner", appData.settings.currentPageHTML).addClass('hide');
    $('#myPlanner', appData.settings.currentPageHTML).addClass('hide');

    // get my activities
    if (appData.collections.myActivities instanceof Backbone.Collection) {
      appData.collections.myActivities.each(function(activity) {
        appData.views.PlannerView.myActivitiesView.push(new appData.views.PlannerMyActivitiesView({model : activity}));
      });
    }

    // get the activities I'm going to
    if (appData.collections.myPlannedActivities instanceof Backbone.Collection) {
      appData.collections.myPlannedActivities.each(function(myActivity) {
        appData.views.PlannerView.myJoinedActivitiesView.push(new appData.views.PlannerMyActivitiesView({model : myActivity}));
      });
    }

 
    if(appData.views.PlannerView.myActivitiesView.length > 0){
      $('#myActivitiesPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myActivitiesTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myActivitiesView).each(function(dv) {
        $('#myActivitiesTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }

    if(appData.views.PlannerView.myJoinedActivitiesView.length > 0){
      $('#myPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myPlanningTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myJoinedActivitiesView).each(function(dv) {
        $('#myPlanningTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }
    // show a message when no-once responds
    if(appData.views.PlannerView.myActivitiesView.length === 0 && appData.views.PlannerView.myInvitedActivitiesView.length === 0 && appData.views.PlannerView.myJoinedActivitiesView.length === 0){
      $('#profileMessage', appData.settings.currentPageHTML).removeClass('hide');
    }else{
      $('#profileMessage', appData.settings.currentPageHTML).addClass('hide');
    }

*/

    // update localstorage
    appData.services.utilService.updateLocalStorage();
  },

  render: function () {
    this.$el.html(this.template());
    appData.settings.currentPageHTML = this.$el;

    return this;
  }
});


appData.views.ProfileAvatarView = Backbone.View.extend({
    className: 'avatar-page',
    initialize: function () {

    },
    
    render: function() { 
    	this.$el.html(this.template(appData.models.userModel.toJSON()));
        appData.settings.currentModuleHTML = this.$el;

        // new avatar
        var avatarModel = appData.services.avatarService.generateAvatar(appData.models.userModel);
        var avatarView = new appData.views.AvatarDisplayView({model: avatarModel});

        $('#avatar', appData.settings.currentModuleHTML).append(avatarView.render().$el);

        $( "#strength_progress", appData.settings.currentModuleHTML).progressbar({
            value: parseInt(appData.models.userModel.attributes.strength_score)
        });
        
        $( "#stamina_progress", appData.settings.currentModuleHTML).progressbar({
            value: parseInt(appData.models.userModel.attributes.stamina_score)
        });

        return this; 
    }
});

appData.views.ProfileChallengeView = Backbone.View.extend({

    initialize: function () {
        appData.views.ProfileChallengeView.updateChallenges = this.updateChallenges;
        appData.views.ProfileChallengeView.getChallengesCompleteHandler = this.getChallengesCompleteHandler;
        appData.views.ProfileChallengeView.getMyChallengesCompleteHandler = this.getMyChallengesCompleteHandler;
        appData.views.ProfileChallengeView.getMyBadgesCompleteHandler = this.getMyBadgesCompleteHandler;
        
        Backbone.on('joinedChallengeHandler', this.joinedChallengeSuccesHandler);
        Backbone.on('getChallengesHandler', appData.views.ProfileChallengeView.getChallengesCompleteHandler);
        
        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection()){
                appData.services.phpService.getChallenges();
            }else{
                this.updateChallenges();
            }
        }else{
            appData.services.phpService.getChallenges();
        }

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device online
    networkFoundHandler: function(){
        appData.services.phpService.getChallenges();
    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentModuleHTML = this.$el;

        $(window).resize(_.debounce(function(){
            appData.views.ProfileChallengeView.updateChallenges();
        }, 500));

         $('#badgesOverview', appData.settings.currentModuleHTML).hide();

        return this; 
    },

    joinedChallengeSuccesHandler: function(){
        Backbone.on('getChallengesHandler', appData.views.ProfileChallengeView.getChallengesCompleteHandler);
        appData.services.phpService.getChallenges();
    },

    getChallengesCompleteHandler: function(){
        Backbone.off('getChallengesHandler');
        Backbone.on('getMyChallengesHandler', appData.views.ProfileChallengeView.getMyChallengesCompleteHandler);
        appData.services.phpService.getMyChallengesHandler();
    },

    getMyChallengesCompleteHandler: function(){
        Backbone.off('getMyChallengesHandler');
        Backbone.on('getMyBadgesHandler', appData.views.ProfileChallengeView.getMyBadgesCompleteHandler);
        appData.services.phpService.getMyBadges();
    },

    getMyBadgesCompleteHandler: function(){
        Backbone.off('getMyBadgesHandler');
        appData.views.ProfileChallengeView.updateChallenges();
    },

    updateChallenges: function(){
        // badges grid
        var bwidth = $('#badgesOverview', appData.settings.currentModuleHTML).width();
        var bdwidth = $('#badgesOverview ul li',appData.settings.currentModuleHTML).first().width() + 12;
            bdwidth = parseInt(bdwidth);

        var oneLine = Math.floor(bwidth / bdwidth);
        var howMany = appData.models.userModel.attributes.challengesCount;

        if(!isNaN(howMany)){
            $('#badgesOverview ul', appData.settings.currentModuleHTML).empty();
            for (var i=0; i<howMany; i++){
                $('#badgesOverview ul', appData.settings.currentModuleHTML).append('<li></li>');
            }          
        }
        oneLine = oneLine++;

        $('#badgesOverview', appData.settings.currentModuleHTML).slideDown(200);

        appData.views.challengeListView = [];
        appData.collections.challenges.each(function(challenge) {
        appData.views.challengeListView.push(new appData.views.ChallengeListView({
            model : challenge
          }));
        });

        appData.views.myChallengesListView = [];
        appData.models.userModel.attributes.myChallenges.each(function(myChallenge){
        appData.views.myChallengesListView.push(new appData.views.ActiveChallengeListView({
            model: myChallenge
            }));
        });

        appData.views.myBadgesListView = [];
        appData.models.userModel.attributes.myBadges.each(function(myBadge){
        appData.views.myBadgesListView.push(new appData.views.BadgeListView({
            model: myBadge
            }));
        });

        $('#challengesOverviewTable', appData.settings.currentModuleHTML).empty();
        if(appData.views.challengeListView.length > 0){
            $('#challengesOverview', appData.settings.currentModuleHTML).removeClass('hide');
            _(appData.views.challengeListView).each(function(listView) {
                $('#challengesOverviewTable', appData.settings.currentModuleHTML).append(listView.render().$el);
            });
        }

        // set equal grid height
        var t=0; // the height of the highest element (after the function runs)
        var t_elem;  // the highest element (after the function runs)
        $("#challengesOverview .challenge-item",appData.settings.currentModuleHTML).each(function () {
            $this = $(this);
            if ( $this.outerHeight() > t ) {
                t_elem=this;
                t=$this.outerHeight();
            }
        });
        $("#challengesOverview .challenge-item",appData.settings.currentModuleHTML).css({
            'min-height': t + 'px'
        });


        $('#myChallengesOverviewTable', appData.settings.currentModuleHTML).empty();
        if(appData.views.myChallengesListView.length > 0){
            $('#myChallengesOverview', appData.settings.currentModuleHTML).removeClass('hide');
            _(appData.views.myChallengesListView).each(function(listView) {
                $('#myChallengesOverviewTable', appData.settings.currentModuleHTML).append(listView.render().$el);
            });
        }

        t=0; // the height of the highest element (after the function runs)
        t_elem;  // the highest element (after the function runs)
        $("#myChallengesOverview .challenge-item",appData.settings.currentModuleHTML).each(function () {
            $this = $(this);
            if ( $this.outerHeight() > t ) {
                t_elem=this;
                t=$this.outerHeight();
            }
        });
        $("#myChallengesOverview .challenge-item",appData.settings.currentModuleHTML).css({
            'min-height': t + 'px'
        });

        if(appData.views.myBadgesListView.length > 0){
            var ind = 0;

            _(appData.views.myBadgesListView).each(function(listView) {
                $('#badgesOverview ul li:eq(' + ind + ')', appData.settings.currentModuleHTML).append(listView.render().$el).addClass('badger');
                ind++;
            });
        }

        // show a message when there are nog challenges availible
        if(appData.views.challengeListView.length === 0){
            $('.no-found', appData.settings.currentModuleHTML).removeClass('hide');
        }else{
            $('.no-found', appData.settings.currentModuleHTML).addClass('hide');
        }

        if(appData.views.myChallengesListView.length === 0){
            $('.no-found2', appData.settings.currentModuleHTML).removeClass('hide');
        }else{
            $('.no-found2', appData.settings.currentModuleHTML).addClass('hide');
        }

        appData.services.utilService.updateLocalStorage();
    }
});

appData.views.ProfileFriendsView = Backbone.View.extend({
    className: 'friendbox',
    initialize: function () {
    	appData.views.friendsListView = [];
        appData.views.ProfileFriendsView.friendRemovedHandler = this.friendRemovedHandler;
        appData.views.ProfileFriendsView.generateFriendsList = this.generateFriendsList;

        // get friends
        appData.services.phpService.getFriends();
        Backbone.on('getFriendsHandler', this.getMyFriendsHandler);
    },

    getMyFriendsHandler: function(){
        console.log('updated friends');

        Backbone.off('getFriendsHandler');
        appData.views.ProfileFriendsView.generateFriendsList();
    },
    
    events:{
        "click .removeFriend": "removeFriendHandler"
    },

    friendRemovedHandler: function(){
        console.log('friend remove');
    },

    removeFriendHandler: function(evt){
        var friend_id = $(evt.target).parent().attr('friend-id');

        Backbone.on('friendRemovedHandler', appData.views.ProfileFriendsView.friendRemovedHandler);
        appData.services.phpService.removeFriend(friend_id);

        $(evt.target).parent().hide(200);

    },

    generateFriendsList: function(){

        appData.views.friendsListView = [];
        $(appData.models.userModel.attributes.myFriends.models).each(function(index, userModel) {
            appData.views.friendsListView.push(new appData.views.FriendsListView({
                model:userModel
            }));
        });

        $('#profileFriendsListView', appData.settings.currentModuleHTML).empty();
        _(appData.views.friendsListView).each(function(listView) {
            $('#profileFriendsListView', appData.settings.currentModuleHTML).hide().append(listView.render().$el);
        });
        $('#profileFriendsListView', appData.settings.currentModuleHTML).show(200, function() {

            var cw = $('.friend-box span', appData.settings.currentModuleHTML).first().width();
            $('.friend-box span', appData.settings.currentModuleHTML).css({'height':cw+'px'});

        });
    },

    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentModuleHTML = this.$el;

        this.generateFriendsList();

        $(window).resize(_.debounce(function(){
            var cw = $('.friend-box span', appData.settings.currentModuleHTML).first().width();
            $('.friend-box span', appData.settings.currentModuleHTML).css({'height':cw+'px'});
        }, 500));
            
        return this; 
    },
});

appData.views.ProfileView = Backbone.View.extend({

    initialize: function () {
      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    deviceOfflineHandler: function(){

    },

    // phonegap device back online
    deviceOnlineHandler: function(){

    },
    
    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;

        var view = new appData.views.ProfileAvatarView();
        $('#profileContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
     
        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection() == false){
                $('#friendsButton', appData.settings.currentPageHTML).remove();
            }else if(appData.models.userModel.attributes.myFriends.models.length === 0){
                $('#friendsButton', appData.settings.currentPageHTML).remove();
            }
        }
        return this; 
    },

    events: {
        "click #profileTabs .cl-btn": "profileTabHandler",
        "click #menuButton": "menuOpenHandler"
    },

    menuOpenHandler: function(){
        $("#mainMenu").trigger("open");
    },

    profileTabHandler: function(evt){ 
    	var page = this.$el;
        var currentActivityPage = '#atleetContent';

        $('#profileTabs .cl-btn', appData.settings.currentPageHTML).removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        currentActivityPage = selectedPage;

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');
        var view;

        switch(selectedPage){
          case "#atleetContent":
            view = new appData.views.ProfileAvatarView();
          break;

          case "#uitdagingenContent":
            view = new appData.views.ProfileChallengeView();
          break;

          case "#vriendenContent":
            view = new appData.views.ProfileFriendsView();
          break;
        }
        $('#profileContent', appData.settings.currentPageHTML).empty()
        $('#profileContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        this.currentActivityPage = selectedPage;
    } 
});

appData.views.SettingsView = Backbone.View.extend({

    initialize: function () {
    	appData.views.SettingsView.avatarUploadHandler = this.avatarUploadHandler;
    	appData.views.SettingsView.avatarUpdatedHandler = this.avatarUpdatedHandler;
      appData.views.SettingsView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.SettingsView.generateFavouriteSportList = this.generateFavouriteSportList;
      appData.views.SettingsView.align = this.align;

      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function () {
      this.$el.html(this.template({imagePath: appData.settings.imagePath, user: appData.models.userModel.attributes}));
      appData.settings.currentPageHTML = this.$el;

      if(appData.settings.native){

      }else{
        $("#changeAvatar", appData.settings.currentPageHTML).click(function(){
           $("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
           return false;
        });
      }

      // get sports
      if(appData.settings.native == false || appData.settings.native && appData.services.utilService.getNetworkConnection()){
        Backbone.on('getMyFavouriteSportsHandler', this.getFavouriteSportsHandler)
        appData.services.phpService.getUserFavouriteSports();
      }

      return this;
    },

    getFavouriteSportsHandler: function(){
      Backbone.off('getMyFavouriteSportsHandler');
      appData.views.SettingsView.generateFavouriteSportList();
    },

    generateFavouriteSportList: function(){


      var sports = [];
      $('#favouriteSportList .rm', appData.settings.currentPageHTML).remove();

      _(appData.models.userModel.attributes.myFavouriteSports.models).each(function(sport){
        var sportView = new appData.views.FavouriteSportListSettingView({model:sport});
        $('#favouriteSportList', appData.settings.currentPageHTML).prepend(sportView.render().$el);
      });

      $('#favouriteSportList', appData.settings.currentPageHTML).hide();
      $('#favouriteSportList', appData.settings.currentPageHTML).delay(1000).queue(function() {
          appData.views.SettingsView.align();
      });

      $(window).resize(_.debounce(function(){
         appData.views.SettingsView.align();
      }, 500));

    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.SettingsView.files, function(key, value)
      {
        data.append(key, value);
      });

      Backbone.on('fileUploadedEvent', appData.views.SettingsView.fileUploadedHandler);
      appData.services.phpService.uploadMediaNonNative(data);
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.SettingsView.uploadedPhotoUrl = filename;

      Backbone.on('updateUserAvatar', appData.views.SettingsView.avatarUpdatedHandler);
      appData.services.phpService.updateUserAvatar(filename);
    },

    nonNativeFileSelectedHandler: function(evt){
        // upload script
        var files = evt.target.files;
        appData.views.SettingsView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    events: {
    	"click #changeAvatar": "changeAvatarHandler",
      "click #signOutButton": "signOutHandler",
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler",
      "click #sportselector": "sportselectorClickHandler",
      "click .rm": "sportselectorClickHandler",
      "click #confirm": "sportselectorClickHandler"
    },

    sportselectorClickHandler: function(){
      appData.settings.sportselector = true;
      window.location.hash = "sportselector";
    },

    align: function(){
        $('#favouriteSportList').hide();

        var totalWidth = $('.cl-content').width();
        var widthD = 74;

        var space = parseInt(totalWidth) / parseInt(widthD);
        var rounded = Math.floor(space);
        
        var xspace = rounded * widthD;
        var yspace = totalWidth - xspace;
        var margin = yspace/2;
            
        $('#favouriteSportList').css({
                    'margin-left':margin + 'px',
                    'margin-right':margin + 'px',
                    'width': xspace + 'px',
                    'display': 'block'
        });

        $('#favouriteSportList').show(500);
    },

    signOutHandler: function(){
      // clear local storage
      window.localStorage.clear()

      // not signed in
      appData.settings.userLoggedIn = false;
      appData.settings.storageFound = false;
      appData.settings.dataLoaded = false;

      // back to the landing page
      location.reload(); 
    },   

    avatarUpdatedHandler: function(){
    	Backbone.off('updateUserAvatar');
      $('#userAvatar', appData.settings.currentPageHTML).delay(400).attr("style", "background: url('" + appData.settings.imagePath + appData.views.SettingsView.uploadedPhotoUrl + "') no-repeat; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;");
      appData.models.userModel.attributes.avatar = appData.views.SettingsView.uploadedPhotoUrl;
    
      if(appData.settings.native){
        appData.services.utilService.updateLocalStorage();
      }

      $('#mainMenu #userAvatar').css({
          "background": "url("+  appData.settings.imagePath + appData.models.userModel.attributes.avatar + ") no-repeat",
          "-webkit-background-size": "cover",
          "-moz-background-size": "cover",
          "-o-background-size": "cover",
          "background-size": "cover"
      });
    },

    changeAvatarHandler: function(){
  		navigator.camera.getPicture(this.uploadAvatar,
  			function(message) { 
  			},{ quality: 50, targetWidth: 640, targetHeight: 480, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.CAMERA }
  		);
    },

    avatarUploadHandler: function(r){
    	Backbone.on('updateUserAvatar', appData.views.SettingsView.avatarUpdatedHandler);
    	appData.services.phpService.updateUserAvatar(appData.views.SettingsView.uploadedPhotoUrl);
    },

    uploadAvatar: function(imageURI) {
      function makeid()
      {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for( var i=0; i < 5; i++ )
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
      }

      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName= makeid() + ".jpg";
      options.mimeType="image/jpeg";

      var params = new Object();
      params.value1 =  options.fileName;
      appData.views.SettingsView.uploadedPhotoUrl = options.fileName;

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();  
      ft.upload(imageURI, appData.settings.servicePath + appData.settings.imageUploadService, appData.views.SettingsView.avatarUploadHandler, null, options);    
    }
});

appData.views.SportSelectorView = Backbone.View.extend({

    initialize: function () {
        appData.views.SportSelectorView.selectedSports = [];
        Backbone.on('addFavouriteSportsHandler', this.addFavouriteSportsHandler)
    
        appData.views.SportSelectorView.model = this.model;
        appData.views.SportSelectorView.align = this.align;

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function() {
    	this.$el.html(this.template({user: appData.models.userModel.toJSON()}));
        appData.settings.currentPageHTML = this.$el;
        appData.views.SportSelectorView.favouriteSportsViewList = [];

        appData.collections.sports.each(function(sport){
            appData.views.SportSelectorView.favouriteSportsViewList.push(new appData.views.FavouriteSportListView({
                model : sport
            }));
        });

        var generateGri = this.generateGrid();
        appData.views.CreateActivityLocationView.locationAutComplete = new AutoCompleteView({input: $("#sportInput", appData.settings.currentPageHTML), model: appData.collections.sports, wait: 100, updateModel: this.model, updateID: "sport_id", onSelect: function(sport){
            sport.attributes.object_class = "selected";
            appData.views.SportSelectorView.favouriteSportsViewList.push(new appData.views.FavouriteSportListView({
                model : sport
            }));

            $('#favouriteSportList', appData.settings.currentPageHTML).empty();
            _(appData.views.SportSelectorView.favouriteSportsViewList).each(function(listView) {
                $('#favouriteSportList', appData.settings.currentPageHTML).append(listView.render().$el);
            });

        }}).render();

        $('#favouriteSportList', appData.settings.currentPageHTML).hide();
        $('#favouriteSportList', appData.settings.currentPageHTML).delay(1000).queue(function() {
            appData.views.SportSelectorView.align();
        });

        $(window).resize(_.debounce(function(){
           appData.views.SportSelectorView.align();
        }, 500));

        return this;
    },

    align: function(){
        $('#favouriteSportList').hide();

        var totalWidth = $('.cl-content').width();
        var widthD = 74;

        var space = parseInt(totalWidth) / parseInt(widthD);
        var rounded = Math.floor(space);
        
        var xspace = rounded * widthD;
        var yspace = totalWidth - xspace;
        var margin = yspace/2;
            
        $('#favouriteSportList').css({
                    'margin-left':margin + 'px',
                    'margin-right':margin + 'px',
                    'width': xspace + 'px',
                    'display': 'block'
        });

        $('#favouriteSportList').show(500);
    },

    generateGrid: function(){
        $('#favouriteSportList', appData.settings.currentPageHTML).empty();
        _(appData.views.SportSelectorView.favouriteSportsViewList).each(function(listView, index) {
            $('#favouriteSportList', appData.settings.currentPageHTML).append(listView.render().$el);

            if(index == (appData.views.SportSelectorView.favouriteSportsViewList.length -1)){
            }
        });    

        if(appData.models.userModel.attributes.myFavouriteSports.models.length > 0){
            $('#backButton', appData.settings.currentPageHTML).removeClass('hide');
        }

        // set selected items
        $.each(appData.models.userModel.attributes.myFavouriteSports.models, function(index, element){
            $('#sp' + element.attributes.sport_id, appData.settings.currentPageHTML).addClass('selected');
        });
    },

    events: {
      "click #confirm": "confirmSportsHandler",
      "click #favouriteSportList a": "favouriteSportClickHandler"
    },

    favouriteSportClickHandler: function(evt){
        //$(evt.target).html().addClass('selected');
        if($('body').hasClass('422')){
            $(evt.currentTarget).toggleClass('selected');
        }else{
            $(evt.target).toggleClass('selected');
        }
        //alert(event.target)
    },

    confirmSportsHandler: function(){
        var selectedSports = [];

        $('#favouriteSportList .selected .layer', appData.settings.currentPageHTML).each(function(index, element){
            var sportID = $(element).attr('data-id');
            var model = appData.collections.sports.where({'sport_id': sportID.toString()})
        
            selectedSports.push(model[0]);
        });

        appData.services.phpService.addFavouriteSportsService(selectedSports);
    },

    addFavouriteSportsHandler: function(){
        appData.services.utilService.updateLocalStorage();

        if(appData.settings.forwardAfterLogin){
            appData.settings.forwardAfterLogin = false;
            window.location.hash = "#activity/" + appData.settings.forwardAfterLoginID;    
        }else{
           if(!appData.settings.sportselector){
             appData.router.navigate('dashboard', true);
           }else{
             appData.router.navigate('settings', true);
           }
        }
    }
});


appData.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "dashboard":        "dashboard",
        "planner":          "planner",
        "profile": 			"profile",
        "activity/:id":     "activity",
        "navigater":        "navigater", 
        "createActivity":   "createActivity",
        "createUser":       "createUser",
        "settings":         "settings",
        "sportselector":    "sportselector",
        "noconnection":     "noconnection",
        "loading":          "loading",
        "friend/:id":       "friend",
        "update/:id":       "update",
        "forward/:id":      "forward"
    },

    initialize: function () {
        appData.slider = new PageSlider($('#container'));

        this.routesHit = 0;
        
        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    back: function() {
        if(this.routesHit > 1) {
          //more than one route hit -> user did not land to current page directly
          window.history.back();
        } else {
          //otherwise go to the home page. Use replaceState if available so
          //the navigation doesn't create an extra history entry
          this.navigate('/', {trigger:true, replace:true});
        }
    },

    forward: function(id){

        // save the activity ID nog go to the login
        appData.settings.forwardAfterLoginID = id;
        appData.settings.forwardAfterLogin = true;

        window.location.hash = "#";
    },

    noconnection: function(){
        appData.slider.slidePage(new appData.views.NoConnectionView().render().$el);
    },

    home: function () {

        // are we on a device or a mobile webbrowser?
        if(appData.settings.native){

            if(appData.settings.network){
                // is this user already logged in? if so skip the login page and go straight to loading or the offline mode
                if(appData.settings.userLoggedIn){
                    window.location.hash = "loading";
                }else{
                    appData.slider.slidePage(new appData.views.HomeView().render().$el);
                }
            }else{

                 // check if we have local storage from an earlier login
                if(appData.settings.storageFound){

                    appData.services.utilService.localDataToCollection(appData.storage);
                    window.location.hash = "dashboard";
                }else{
                    window.location.hash = "noconnection";
                }
            }

        }else{

            appData.slider.slidePage(new appData.views.HomeView().render().$el);

        }
    },

    loading: function () {

        if(!appData.settings.dataLoaded){
        
            if(appData.settings.native){
                // load it
                if(appData.services.utilService.getNetworkConnection()){
                    appData.slider.slidePage(new appData.views.LoadingView({model: appData.models.userModel}).render().$el);
                }else{
                    if(appData.settings.storageFound){
                        window.location.hash = "#dashboard";
                    }else{
                        window.location.hash = "#noconnection"
                    }
                }
            }else{
                appData.slider.slidePage(new appData.views.LoadingView({model: appData.models.userModel}).render().$el);
            }

        }else{

            window.location.hash = "dashboard";
        }
    },
    
    dashboard: function () {

        appData.settings.created = false;
        clearInterval(appData.settings.timer);

        $('#mainMenu ul li').removeClass('mm-selected');
        $('#mainMenu ul li').first().addClass('mm-selected');

        if(appData.settings.userLoggedIn){

            if(appData.settings.dataLoaded){    
            
                appData.slider.slidePage(new appData.views.DashboardView().render().$el);
        

                if(appData.settings.native){
                    /*var c = appData.services.utilService.getNetworkConnection();
                    if(!c){
                        alert('false')
                        $('#container').addClass('offline');
                    }*/
                }
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "";
        }
    },

    planner: function () {
        clearInterval(appData.settings.timer);

        $('#plannerButton').addClass('mm-selected');

        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.PlannerView().render().$el);
        }else{
            window.location.hash = "";
        }
    },

    profile: function () {
       clearInterval(appData.settings.timer);

        $('#mainMenu ul li').removeClass('mm-selected');
        $('#mainMenu #profielButton').addClass('mm-selected');

        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.ProfileView().render().$el);
        }else{
            window.location.hash = "";
        }
    },

    friend: function(id){
        clearInterval(appData.settings.timer);

        if(appData.settings.userLoggedIn){

            var userModel = appData.collections.users.where({ "user_id": id });
                userModel = userModel[0];

            
            appData.slider.slidePage(new appData.views.FriendView({model: userModel}).render().$el); 
        }else{
            window.location.hash = ""
        }
    },

    activity: function (id) {
        clearInterval(appData.settings.timer);

        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.ActivityDetailView().render().$el); 
        }else{
            window.location.hash = "";
        }
    },

    update: function(id){        
        clearInterval(appData.settings.timer);

        if(appData.settings.userLoggedIn){

            if(appData.settings.dataLoaded){
                var activitiesCollection = appData.collections.activities;
                var selectedActivityModel = activitiesCollection.where({activity_id: id}); 
                    selectedActivityModel = selectedActivityModel[0];
                    selectedActivityModel.attributes.updateActivity = true;

                appData.slider.slidePage(new appData.views.CreateActivityView({model: selectedActivityModel}).render().$el);
            }else{
                window.location.hash = "loading";
            }
        
        }else{
            window.location.hash = "";
        }
    },

    createActivity: function () {
        clearInterval(appData.settings.timer);

        if(appData.settings.userLoggedIn){

            if(appData.settings.created){
                window.location.hash = "#dashboard";
            }else{

                if(appData.settings.dataLoaded){
                    appData.slider.slidePage(new appData.views.CreateActivityView({model: appData.models.userTemplate}).render().$el);
                }else{
                    window.location.hash = "loading";
                }

            }
        }else{
            window.location.hash = "";
        }
    },

    createUser: function () {
        appData.slider.slidePage(new appData.views.CreateUserView({model: appData.models.userModel}).render().$el);
    },
    
    navigater: function (id) {
        clearInterval(appData.settings.timer);

        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.NavigationView().render().$el);
        }else{
            window.location.hash = ""
        }
    },

    activity: function (id) {
        clearInterval(appData.settings.timer);

        if(appData.settings.userLoggedIn){

            if(appData.settings.dataLoaded){
                var activitiesCollection = appData.collections.activities;
                var selectedActivityModel = activitiesCollection.where({activity_id: id}); 
                    selectedActivityModel = selectedActivityModel[0];

                var view = new appData.views.ActivityDetailView({model: selectedActivityModel});
                    appData.slider.slidePage(view.render().$el);

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "";
        }
    },

    settings: function (id) {
        clearInterval(appData.settings.timer);

        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.SettingsView().render().$el);
        }else{
            window.location.hash = "";
        }
    },

    sportselector: function (id) {
        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.SportSelectorView({ model: new Backbone.Model({"sport_id": ""})}).render().$el);
        }else{
            window.location.hash = "";
        }
    },

    checkLoggedIn: function(){

    }
});

/**
* Updating a users avatar according to app usage
*/
appData.services.AvatarService = Backbone.Model.extend({

	initialize: function() {

	},

	addScore: function(paramter){
		var arr = [];
		var multiplier;

		switch(paramter){
			case "create":
				multiplier = 1.1;
			break;

			case "join":
				multiplier = 0.5;
			break;

			case "media":
				multiplier = 1.1
			break;

			case "chat":
				multiplier = 1.1;
			break;

			case "challenge":
				multiplier = 1.2;
			break;

			case "friend":
				multiplier = 1.1;
			break;
		}

		// score generator
		while(arr.length < 3){
		  var randomnumber=Math.ceil((Math.random()*3)*multiplier)
		  var found=false;
		  for(var i=0;i<arr.length;i++){
		    if(arr[i]==randomnumber){found=true;break}
		  }
		  if(!found)arr[arr.length]=randomnumber;
		}

		appData.models.userModel.attributes.equipment_score = parseInt(appData.models.userModel.attributes.equipment_score) + arr[0];
		appData.models.userModel.attributes.stamina_score = parseInt(appData.models.userModel.attributes.stamina_score) + arr[1];
		appData.models.userModel.attributes.strength_score = parseInt(appData.models.userModel.attributes.strength_score) + arr[2];
	
		// update avatar on the database
		Backbone.on('updateAvatarCompleteHandler', this.avatarCompleteHandler);
		appData.services.phpService.updateAvatar();
	},

	avatarCompleteHandler: function(){
		Backbone.off('updateAvatarCompleteHandler');
	},

	levelUp: function(){
		Backbone.trigger('levelUp');
	},

	generateAvatar: function(userModel){
		var avatarModel = new Avatar();
			avatarModel.attributes.strengthDisplay = "";
			avatarModel.attributes.equipmentDisplay = "";


		// which gender?
		switch(parseInt(userModel.attributes.gender)){
			case 0:
				// female
				console.log('female avatar');
				var eScore = parseInt(userModel.attributes.strength_score);

				if(eScore < 20){
						avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[0];
				}else if(eScore < 40){
						avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[1];
				}else if(eScore < 60){
						avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[2];
				}else if(eScore < 80){
						avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[3];
				}else if(eScore < 100){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[4];
				}else if(eScore > 99){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[5];
				}

				var sScore = parseInt(userModel.attributes.equipment_score);

				if(sScore < 20){
						avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[0];
				}else if(sScore < 40){
						avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[1];
				}else if(sScore < 60){
						avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[2];
				}else if(sScore < 80){
						avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[3];
				}else if(sScore < 100){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[4];
				}else if(sScore > 99){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[5];
				}

			break;
			case 1:

				// male
				console.log('male avatar');
				var eScore = parseInt(userModel.attributes.strength_score);

				if(eScore < 20){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[0];
				}else if(eScore < 40){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[1];
				}else if(eScore < 60){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[2];
				}else if(eScore < 80){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[3];
				}else if(eScore < 100){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[4];
				}else if(eScore > 99){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[5];
				}

				var sScore = parseInt(userModel.attributes.equipment_score);

				if(sScore < 20){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[0];
				}else if(sScore < 40){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[1];
				}else if(sScore < 60){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[2];
				}else if(sScore < 80){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[3];
				}else if(sScore < 100){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[4];
				}else if(sScore > 99){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[5];
				}

			break;
		}

		return avatarModel;
	}

});


/**
* Updating a users avatar according to app usage
*/
appData.services.CHallengeService = Backbone.Model.extend({

	initialize: function() {

	},

	checkChallenges: function(userModel, sportsFilter, activityCreateFilter, fotoCreateFilter, participateFilter, activityModel){
	
		userModel.attributes.myChallenges.each(function(challenge){
            var status = challenge.attributes.status;
            var total;
            var sc = false;
            var sa = false;
            var fs = false;
            var ps = false;
            var isChallenge = false;



            if(challenge.attributes.challengeData.sportsFilter && sportsFilter){

                total = challenge.attributes.challengeData.sportsFilter.total;
                var sport = challenge.attributes.challengeData.sportsFilter.sport_id;
                isChallenge = true;

                if(activityModel.attributes.sport_id == sport){
                    if(typeof status.sportsFilter === 'undefined'){
                       // your code here.
                       status.sportsFilter = {};
                       status.sportsFilter.count =0;
                       status.sportsFilter.count++;

                    }else{
                        status.sportsFilter.count++;
                    }

                    if(status.sportsFilter.count >= total){
                        status.sportsFilter.complete = true;
                        sc = true;
                    }
                }
            }else{
                sc = true
            }

            if(challenge.attributes.challengeData.activityCreateFilter && activityCreateFilter){
                total = challenge.attributes.challengeData.activityCreateFilter.total;
                isChallenge = true;


                 if(typeof status.activityCreateFilter === 'undefined'){
                   // your code here.
                   status.activityCreateFilter = {};
                   status.activityCreateFilter.count =0;
                   status.activityCreateFilter.count++;

                }else{
                    status.activityCreateFilter.count++;
                }

                if(status.activityCreateFilter.count >= total){
                    status.activityCreateFilter.complete = true;
                    sa = true;
                }
            }else{
                sa = true;
            }

            if(challenge.attributes.challengeData.fotoCreateFilter && fotoCreateFilter){
                total = challenge.attributes.challengeData.fotoCreateFilter.total;
                isChallenge = true;

                if(typeof status.fotoCreateFilter === 'undefined'){
                   // your code here.
                   status.fotoCreateFilter = {};
                   status.fotoCreateFilter.count =0;
                   status.fotoCreateFilter.count++;

                }else{
                    status.fotoCreateFilter.count++;
                }

                console.log(status.fotoCreateFilter.count + '-' + total);

                if(status.fotoCreateFilter.count >= total){
                    status.fotoCreateFilter.complete = true;
                   fs = true;
                }
            }else{
                fs = true;
            }

            if(challenge.attributes.challengeData.participateFilter && participateFilter){

                total = challenge.attributes.challengeData.participateFilter.total;
                isChallenge = true;

                if(typeof status.participateFilter === 'undefined'){
                   // your code here.
                   status.participateFilter = {};
                   status.participateFilter.count =0;
                   status.participateFilter.count++;

                }else{
                    status.participateFilter.count++;
                }

                if(status.participateFilter.count >= total){
                    status.participateFilter.complete = true;
                    ps = true;
                }
            }else{
                ps = true;
            }

            var complete = 0;

            // need to do a more complex complete check
            if(sc && sa && fs && ps && isChallenge){
                complete = 1;
                console.log("challenge complete");
            }

            console.log('check hieronder');
            console.log(challenge);

            // update challenge on the database
            Backbone.on('updateChallengeScore', this.updateChallengeScore);
            appData.services.phpService.updateChallenge(challenge.attributes.challenge_id, status, complete);
    
		});
	},

    updateChallengeScore: function(){
        alert('updated');
    }

});


/**
* Facebook Services
*/
appData.services.FacebookServices = Backbone.Model.extend({

	initialize: function() {

	},

	facebookConnect: function(){
		if(!appData.settings.native){

    		try {

	            FB.init({
	                appId: '595730207182331', // App ID
	                status: false // check login status
	            });

			} catch (e) {
				alert(e);
			}
    	}
	},

	facebookUserToSQL: function(){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.facebookUserToSQL,
			type:'POST',
			dataType:'json',
			data: "email="+appData.models.userModel.attributes.email+"&age="+appData.models.userModel.attributes.age+"&gender="+appData.models.userModel.attributes.gender+"&name="+appData.models.userModel.attributes.name+"&facebook_data="+JSON.stringify(appData.models.userModel.attributes.facebook_data)+"&facebook_id="+appData.models.userModel.attributes.facebook_id+"&avatar="+appData.models.userModel.attributes.facebook_avatar+"&current_location="+JSON.stringify(appData.models.userModel.attributes.current_location),
			timeout:60000,
			success:function(data){
				if(data.value === true){
					// store the userID
					appData.settings.userLoggedIn = true;
					appData.models.userModel.set('user_id', data.user_id);
					appData.events.facebookUserToSQLEvent.trigger("facebookUserToSQLSuccesHandler");

				}else{
					appData.events.createUserErrorEvent.trigger("createUserErrorHandler");
				}
			}
		});
	},

	getUserFromFacebookID: function(){

	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.getUserFromFacebookID,
			type:'GET',
			dataType:'json',
			data: "facebook_id="+appData.models.userModel.attributes.facebook_id,
			timeout:60000,
			success:function(data){		

				appData.models.userModel.attributes.strength_score = data.strength_score;
				appData.models.userModel.attributes.stamina_score = data.stamina_score;
				appData.models.userModel.attributes.equipment_score = data.equipment_score;
				appData.models.userModel.attributes.gender = data.gender;
				appData.models.userModel.attributes.age = data.age;

				if(data.avatar !== ""){
					appData.models.userModel.attributes.avatar = data.avatar;
				}
				appData.events.getUserFromFacebookIDEvent.trigger("facebookGetIDHandler", data);
			}
		});
	},

	facebookLogin: function(){
    	

		if(appData.settings.native){

	    	var fbLoginSuccess = function (userData) {

			   	if (userData.authResponse) {

			    	appData.settings.userLoggedIn = true;

					// store the data in the user profile
					appData.models.userModel.attributes.facebookUser = true;
					appData.models.userModel.attributes.facebook_id = userData.authResponse.userId;


					facebookConnectPlugin.api("me?fields=name,email,id,picture,gender,first_name", ["user_birthday"],function(re,bd){
						appData.models.userModel.attributes.name = re.first_name;
						appData.models.userModel.attributes.email = re.email;
						appData.models.userModel.attributes.facebook_avatar = re.picture.data.url;


						var gender;
						if(re.gender == "male"){
							gender = 1;
						}else{
							gender = 0;
						}
						appData.models.userModel.attributes.gender = gender;


						Backbone.trigger("facebookLoginHandler");

					},function (error) {
                		alert("Failed: " + error);
            		});

				}else{
					alert("Je kan nu niet inloggen met Facebook, probeer het later opnieuw");
				}
			}
			// username removed


	    	facebookConnectPlugin.login(["basic_info"], 
	    	    fbLoginSuccess, 
	    	    function (error) { alert("" + error) }
	    	);
    	}else{
			FB.login(function(response) {
			   if (response.authResponse) {
			    appData.settings.userLoggedIn = true;
				Backbone.trigger("facebookLoginHandler");
			   } else {
				alert("Je kan nu niet inloggen met Facebook, probeer het later opnieuw");
			   }
		    },{ scope: "email" });
		}
	},

	facebookWallpost: function(activityModel){

		console.log(activityModel);

		var params = {
			method: 'feed',
			name: activityModel.attributes.title,
			link: appData.settings.forwardPath + '#forward/' + activityModel.attributes.activity_id,
			caption: 'We App To Move',
			description: activityModel.attributes.description
		};

		if(appData.settings.native){
		    facebookConnectPlugin.getLoginStatus( 
		        function (status) { 
		            facebookConnectPlugin.showDialog(params, 
		                function (result) {
          					Backbone.trigger('FacebookWallPostCompleteEvent');
		               	}, 
		            function (e) {
						Backbone.trigger('FacebookWallPostCompleteEvent');
		            });
		        }
		    );
		}else{
			FB.ui(params, function(response){ 
				if (response && response.post_id) {
			    } else {
			    }

				Backbone.trigger('FacebookWallPostCompleteEvent');
			});
		}
	},

	getProfileData:function(){
		
		if(!appData.settings.native){

			FB.api('/me', {fields:['id','name','email','username','age_range','gender','hometown','link','favorite_athletes','favorite_teams']}, function(response) {

				// store the date in the user profile
				appData.models.userModel.attributes.facebookUser = true;
				appData.models.userModel.attributes.name = response.name;
				appData.models.userModel.attributes.email = response.email;
				
				if(response.age_range.min){
				appData.models.userModel.attributes.age = response.age_range.min;
				}
				
				// out of scope
				//appData.models.userModel.attributes.facebook_data.favorite_athletes = response.favorite_athletes;
				//appData.models.userModel.attributes.facebook_data.favorite_teams = response.favorite_teams;
				//appData.models.userModel.attributes.facebook_data.hometown = response.hometown.name;
				//appData.models.userModel.attributes.facebook_data.username = response.name;
		
				var gender;
				if(response.gender == "male"){
					gender = 1;
				}else{
					gender = 0;
				}

				appData.models.userModel.attributes.gender = gender;
				appData.models.userModel.attributes.facebook_id = response.id;

				FB.api("/me/picture", function(response) {
					appData.models.userModel.attributes.facebook_avatar = response.data.url;
					Backbone.trigger("facebookProfileDataHandler");
				});

			});
		}else{
			Backbone.trigger("facebookProfileDataHandler");
		}
	},

	getFacebookFriends: function(){
		// out of scope
		/*
		FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
	    	if (response.error) {
	        	appData.events.facebookGetFriendsErrorEvent.trigger("facebookGetFriendErrorHandler");

	    	} else {
				appData.models.userModel.attributes.friends= [];
				appData.models.userModel.attributes.friends = new UsersCollection(response.data);

				// succesfully signed in via Facebook
	    	}
		});*/
		appData.models.userModel.attributes.friends= [];
       	appData.events.facebookGetFriendsEvent.trigger("facebookGetFriendsHandler");
	}

});

/**
* PHP Services
*/
appData.services.PhpServices = Backbone.Model.extend({

	initialize: function() {

	},

	createActivity: function(activityModel){
		var that = this;

		$.ajax({
        url:appData.settings.servicePath + appData.settings.createActivityService,
        type:'POST',
        dataType:'json',
        data: "location_id="+activityModel.attributes.location_id+"&title="+activityModel.attributes.title+"&sport_id="+activityModel.attributes.sport_id+"&description="+activityModel.attributes.description+"&date="+activityModel.attributes.date+"&time="+activityModel.attributes.time+"&stopTime="+activityModel.attributes.stopTime+"&user_id="+appData.models.userModel.attributes.user_id+"&participants="+activityModel.attributes.participants,
        timeout:60000,
	        success:function(data){
	        	if(data.value === true){
	        		Backbone.trigger('activityCreated', data.activity_id);
	        	/*
	        		// set a reminder
	        		                // Test
      var now                  = new Date().getTime(),
          _60_seconds_from_now = new Date(now + 60*1000);

      window.plugin.notification.local.add({
          id:      1,
          title:   "Jouw activiteit" + activityModel.attributes.title + " gaat beginnen",
          message: 'De activiteit die je hebt aangemaakt gaat beginnen',
          repeat:  'weekly',
          date:    _60_seconds_from_now
      });

      alert(window.plugin.notification);*/

	        		appData.services.avatarService.addScore("create");
        			appData.services.challengeService.checkChallenges(appData.models.userModel, false, true, false, false);
	        	}else{

	        	}
	        },
	        error: function(){
	        	window.location.hash = "dashboard";		
	        }
    	});
	},

	updateActivity: function(activityModel){
		var that = this;

		$.ajax({
        url:appData.settings.servicePath + appData.settings.updateActivityService,
        type:'POST',
        dataType:'json',
        data: "location_id="+activityModel.attributes.location_id+"&activity_id="+activityModel.attributes.activity_id+"&title="+activityModel.attributes.title+"&sport_id="+activityModel.attributes.sport_id+"&description="+activityModel.attributes.description+"&date="+activityModel.attributes.date+"&time="+activityModel.attributes.time+"&stopTime="+activityModel.attributes.stopTime+"&user_id="+appData.models.userModel.attributes.user_id+"&participants="+activityModel.attributes.participants,
        timeout:60000,
	        success:function(data){
	        	if(data.value === true){
	        		Backbone.trigger('activityUpdated', data.activity_id);
	        	}else{

	        	}
	        },
	        error: function(){
	        	window.location.hash = "dashboard";		
	        }
    	});
	},

	addMessage: function(message, activity_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.addMessageService,
			type:'POST',
			dataType:'json',
			data: "message="+message+"&activity_id="+activity_id+"&user_id="+appData.models.userModel.attributes.user_id,
			timeout:60000,
			success:function(data){
				if(data.value === true){
					appData.events.postMessageSuccesEvent.trigger("postMessageSuccesHandler");
					appData.services.avatarService.addScore("chat");
				}else{

				}
			}
		});
	},

	createUser: function(){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.addUserService,
			type:'POST',
			dataType:'json',
			data: "email="+appData.models.userModel.attributes.email+"&age="+appData.models.userModel.attributes.age+"&gender="+appData.models.userModel.attributes.gender+"&name="+appData.models.userModel.attributes.name+"&password="+appData.models.userModel.attributes.password+"&current_location="+JSON.stringify(appData.models.userModel.attributes.current_location),
			timeout:60000,
			success:function(data){
				if(data.value === true){
					// store the userID
					appData.settings.userLoggedIn = true;
					appData.models.userModel.attributes.user_id = data.id;

			    	Backbone.trigger('createUserHandler');
				}else{
					appData.events.createUserErrorEvent.trigger("createUserErrorHandler");
				}
			}
		});
	},

  	userLogin: function(){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.getUserService,
			type:'POST',
			dataType:'json',
			data: "name="+appData.models.userModel.attributes.email+"&password="+appData.models.userModel.attributes.password,
			timeout:60000,
			success:function(data){
				if(data.status === true){
					if(data.password){

						// store the userID
						appData.models.userModel.set('name', data.name);
						appData.models.userModel.set('avatar', data.avatar);
						appData.models.userModel.set('user_id', data.value);
						appData.models.userModel.attributes.strength_score = data.strength_score;
						appData.models.userModel.attributes.stamina_score = data.stamina_score;
						appData.models.userModel.attributes.equipment_score = data.equipment_score;
						appData.models.userModel.attributes.avatar = data.avatar;
						appData.models.userModel.attributes.age = data.age;

						appData.settings.userLoggedIn = true;
						appData.events.userLoggedInEvent.trigger("userLoggedInHandler");
					}else{
						appData.events.userLoggedInPasswordErrorEvent.trigger("userLoggedInPasswordErrorHandler");
					}
				}else{
					appData.events.userLoggedInErrorEvent.trigger("userLoggedInErrorHandler");
				}
			}
		});
  	},

	getMessages: function(activityModel){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMessagesService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activityModel.attributes.activity_id,
			success:function(data){
				var messages = new MessagesCollection(data);
      			Backbone.trigger('getMessages', messages);
			}
		});
  	},

  	getMyPlannedActivities: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyPlannedActivities,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
    		appData.collections.myPlannedActivities = new ActivitiesCollection(data);
				Backbone.trigger('myPlannedActivitiesLoadedHandler');
			}
		});
  	},

	getMyActivities: function(){
		$.ajax({
		url:appData.settings.servicePath + appData.settings.getMyActivities,
		type:'POST',
		dataType:'json',
		data: "user_id="+appData.models.userModel.attributes.user_id,
		success:function(data){
			appData.collections.myActivities = new ActivitiesCollection(data);
			Backbone.trigger('myActivitiesLoadedHandler');
		}
	});
	},

	getMyCreatedActivities: function(){
		$.ajax({
		url:appData.settings.servicePath + appData.settings.getMyActivitiesService,
		type:'POST',
		dataType:'json',
		data: "user_id="+appData.models.userModel.attributes.user_id,
		success:function(data){
			appData.collections.myActivities = new ActivitiesCollection(data);
			Backbone.trigger('myActivitiesLoadedHandler');
		}
	});
	},

  	getMedia: function(activityModel){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMediaService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activityModel.attributes.activity_id,
			success:function(data){

				var media = new MediaCollection(data);
				Backbone.trigger("mediaLoadSuccesHandler", media);
			}
		});
  	},

	getActivities: function(initialLoad, forwardID){
  		$.ajax({
     		url:appData.settings.servicePath + appData.settings.getActivitiesService,
     		type:'GET',
     		dataType:'json',
     		success:function(data){
    			appData.collections.activities = new ActivitiesCollection(data);

    			// initialLoad is when the app starts up
    			if(initialLoad){
    				appData.events.getActivitiesSuccesEvent.trigger("activitiesLoadedHandler");
        		}else if(forwardID){
        			// go to an activity after creating it
        			appData.router.navigate('activity/' + forwardID, true);
        		}else{
        			Backbone.trigger('dashboardUpdatedHandler');
        		}
        	}
    	});
  	},

  	getSports: function(){
        $.ajax({
        	url:appData.settings.servicePath + appData.settings.getSportsService,
            type:'GET',
            dataType:'json',
            success:function(data){
                appData.collections.sports = new SportsCollection(data);
         		appData.events.getSportsSuccesEvent.trigger("sportsLoadedHandler");
         	}
    	});
  	},

  	getBuurten: function(){
        $.ajax({
        	url:appData.settings.servicePath + appData.settings.getBuurtenService,
            type:'GET',
            dataType:'json',
            success:function(data){
                appData.collections.buurten = new BuurtenCollection(data);
         		appData.events.getBuurtenEvent.trigger("buurtenLoadedHandler");
         	}
    	});
  	},

  	getChallenges: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getChallengesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.collections.challenges = new ChallengesCollection(data);
         		Backbone.trigger('getChallengesHandler');
			}
		});
  	},

  	getUsers: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getUsersService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.users = new UsersCollection(data);
         		appData.events.getUsersSuccesEvent.trigger("usersLoadedHandler");
			}
		});
  	},

  	getActivityUsers: function(activityModel){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getActivityUserService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activityModel.attributes.activity_id,
			success:function(data){
				Backbone.trigger('activityUsersSuccesEvent', data);
			},error: function(){
			}
		});
  	},

  	setGoingToActivity: function(activity_id, going){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.setGoingToActivityService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&going="+going+"&activity_id="+activity_id,
			success:function(data){
				Backbone.trigger('goinToActivitySuccesEvent');
			},error: function(){

			}
		});
  	},

  	getLocations: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getLocationsService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.locations = new LocationsCollection(data);
				appData.events.getLocationsSuccesEvent.trigger("getLocationsSuccesHandler");

			}
		});
  	},

  	getFavouriteSports: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getFavouriteSportsService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.favouriteSports = new SportsCollection(data);
      			Backbone.trigger('getFavouriteSportsHandler');
			}
		});  		
  	},

  	addFavouriteSportsService: function(selectedSports){
  		  $.ajax({
			url:appData.settings.servicePath + appData.settings.addFavouriteSportsService,
			type:'POST',
			dataType:'json',
			data: "favourite_sports="+JSON.stringify(selectedSports)+"&user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
      			Backbone.trigger('addFavouriteSportsHandler');

			}, error: function(error){
				console.log(error);
			}
		});  
  	},

  	getUserFavouriteSports: function(){
  		  $.ajax({
			url:appData.settings.servicePath + appData.settings.getUserFavouriteSportsService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myFavouriteSports = new SportsCollection(data);
        		Backbone.trigger('getMyFavouriteSportsHandler');
			},
			error: function(){
				appData.models.userModel.attributes.myFavouriteSports = new SportsCollection();
        		Backbone.trigger('getMyFavouriteSportsHandler');
			}
		}); 
  	},

  	addLocation: function(location, coordinates, description){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.addLocationService,
			type:'POST',
			dataType:'json',
			data: "location="+location+"&coordinates="+coordinates+"&description="+description,
			timeout:60000,
			success:function(data){
				if(data.value === true){
					Backbone.trigger('addedLocationSuccesEvent', data.location_id);
				}else{

				}
			}
		});
  	},

  	addPhotoToDatabase: function(imageName, activity_id){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.addPhotoToDatabase,
			type:'POST',
			dataType:'json',
			data: "url="+imageName+"&user_id="+appData.models.userModel.attributes.user_id+"&type="+1+"&activity_id="+activity_id,
			success:function(data){
        		Backbone.trigger('addPhotoToDatabaseHandler');
				appData.services.avatarService.addScore("media");
			}
		}); 
  	},

  	getMyAvatar: function(){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.getMyAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.attributes.avatar_data = data;
        		Backbone.trigger('getAvatarCompleteHandler');
			}
		}); 
  	},

  	getUserAvatar: function(user_id){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.getMyAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id,
			success:function(data){
        		Backbone.trigger('getUserAvatarCompleteHandler');
			}
		}); 
  	},

  	getUserChallenges: function(user_id){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.getUserChallengesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id,
			success:function(data){
        		Backbone.trigger('getUserChallengesCompleteHandler');
			}
		}); 
  	},

  	updateAvatar: function(){
  	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.updateAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&strength_score="+appData.models.userModel.attributes.strength_score+"&stamina_score="+appData.models.userModel.attributes.stamina_score+"&equipment_score="+appData.models.userModel.attributes.equipment_score,
			success:function(data){
				Backbone.trigger('updateAvatarCompleteHandler');
			}
		}); 	
  	},

  	updateSport: function(sportModel){
  	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.updateSportService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&strength_score="+appData.models.userModel.attributes.strength_score+"&stamina_score="+appData.models.userModel.attributes.stamina_score+"&equipment_score="+appData.models.userModel.attributes.equipment_score,
			success:function(data){
				Backbone.trigger('updateAvatarCompleteHandler');
			}
		}); 	
  	},

  	getMyChallengesHandler: function(){
  	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyChallengesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){

				$(data).each(function(index, element){
					element.challengeData = element.challengeData.replace(new RegExp("\\\\", "g"), "");
					element.challengeData = element.challengeData.substring(1, element.challengeData.length-1);
					element.challengeData  = JSON.parse(element.challengeData);

					element.status = element.status.replace(new RegExp("\\\\", "g"), "");
					element.status = element.status.substring(1, element.status.length-1);
					element.status  = JSON.parse(element.status);
				});

				console.log(data);

				appData.models.userModel.attributes.myChallenges = new ChallengesCollection(data);
				Backbone.trigger('getMyChallengesHandler');
			}
		}); 	
  	},

  	getChallengesCount: function(){
  	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.getChallengesCount,
			type:'POST',
			dataType:'json',
			success:function(data){
				appData.models.userModel.attributes.challengesCount = data;
				Backbone.trigger('getChallengesCount');
			}
		}); 	
  	},

  	joinChallenge: function(challenge_id){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.joinChallengeService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&challenge_id="+challenge_id,
			success:function(data){
				Backbone.trigger('joinedChallengeHandler');
				appData.services.avatarService.addScore("challenge");
			}, error: function(){
				alert('errro');
			}
		}); 
  	},

  	getMyBadges: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getBadgesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myBadges = new ChallengesCollection(data);
				Backbone.trigger('getMyBadgesHandler');
			}
  		});
  	},

  	getBadges: function(user_id){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getBadgesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id,
			success:function(data){
				Backbone.trigger('getBadgesHandler', data);
			}
  		});
  	},

  	updateChallenge: function(challenge_id, status, completed){

  		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateChallengeService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&challenge_id="+challenge_id+"&status="+JSON.stringify(status)+"&completed="+ completed,
			success:function(data){
				Backbone.trigger('updateChallengeScore');
			}
  		});
  	},

  	addSport: function(sport_title, description, icon){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.addSportService,
			type:'POST',
			dataType:'json',
			data: "sport_title="+sport_title+"&description="+description+"&icon="+icon,
			success:function(data){
				Backbone.trigger('addedSportHandler', data);
			}
  		});
  	},

  	getFriends: function(sport_title, description, icon){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getFriendsService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myFriends = new UsersCollection(data);
				Backbone.trigger('getFriendsHandler');
			}, error:function(){
				alert('errr');
			}
  		});
  	},

	addFriend: function(friend_id, friend_from_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.addFriendService,
			type:'POST',
			dataType:'json',
			data: "friend_id="+friend_id+"&friend_from_id="+friend_from_id,
			success:function(data){
				Backbone.trigger('addedFriendHandler');
				appData.services.avatarService.addScore("friend");
			}
  		});
    },

    getMyInvitations: function(){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyInvitationsService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.collections.myInvitations = new ActivitiesCollection(data);
				Backbone.trigger('getInvitationsHandler');
			}
  		});
    },

    getUserMedia: function(userID){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.getUserMediaService,
			type:'POST',
			dataType:'json',
			data: "user_id="+userID,
			success:function(data){
				var media = new MediaCollection(data);
				Backbone.trigger('userMediaHandler', media);
			}
  		});
    },

    inviteFriends: function(friends, activity_id){

    	var counter = 0;
    	friends.each(function(friendModel){
    		$.ajax({
				url:appData.settings.servicePath + appData.settings.inviteFriendsService,
				type:'POST',
				dataType:'json',
				data: "user_id="+friendModel.attributes.user_id+"&activty_id="+activity_id,
				success:function(data){
					counter++;
					if(counter == friends.length){
						Backbone.trigger('friendsInvitedHandler');
					}
				}
  			});	
    	});
    },

	handleInvitations: function(invitation_id, accepted, activity_id){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.handleInvitationsService,
			type:'POST',
			dataType:'json',
			data: "invitation_id="+invitation_id+"&accepted="+accepted+"&activity_id="+activity_id+"&user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				console.log("dataaaaaa");
				Backbone.trigger('acceptInviteHandler');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    removeFriend: function(friend_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeFriendService,
			type:'POST',
			dataType:'json',
			data: "friend_id="+friend_id,
			success:function(data){
				Backbone.trigger('friendRemovedHandler');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    updateUserAvatar: function(avatar){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateUserAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&avatar="+avatar,
			success:function(data){
				Backbone.trigger('updateUserAvatar');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    uploadMediaNonNative: function(files){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.uploadMediaNonNativeService + "?files",
			type:'POST',
			cache: false,
			dataType:'json',
			data: files,
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		    success: function(data, textStatus, jqXHR)
		    {
		    	if(typeof data.error === 'undefined')
		    	{
		    		// Success so call function to process the form
		    		console.log(data);
		    		Backbone.trigger('fileUploadedEvent', data);
		    	}
		    	else
		    	{
		    		// Handle errors here
		    		console.log('ERRORS: ' + data.error);
		    	}
		    },
		    error: function(jqXHR, textStatus, errorThrown)
		    {
		    	// Handle errors here
		    	console.log('ERRORS: ' + textStatus);
		    	// STOP LOADING SPINNER
		    }
		});	
    }
});


/**
* Facebook Services
*/
appData.services.UtilServices = Backbone.Model.extend({

	initialize: function() {

	},

	getNetworkConnection: function(){
		if(appData.settings.native){

			// check if there is a working internet / 3G / 4G / WIFI connection to enable the dynamic mode
			var networkState = navigator.connection.type;

			var states = {};
			states[Connection.UNKNOWN]  = false;
			states[Connection.ETHERNET] = true;
			states[Connection.WIFI]     = true;
			states[Connection.CELL_2G]  = true;
			states[Connection.CELL_3G]  = true;
			states[Connection.CELL_4G]  = true;
			states[Connection.CELL]     = true;
			states[Connection.NONE]     = false;

			appData.settings.network = states[networkState];
		}else{
			appData.settings.network = true;
		}
		return appData.settings.network;
	},

	getLatLon: function(keywords){
		$.ajax({
			url:"http://maps.google.com/maps/api/geocode/json?address="+ keywords +"&sensor=false&region=be",
			type:'GET',
			dataType:'json',
			success:function(data){
				console.log(data);

				var location = data.results[0];
				appData.events.getLatLonEvent.trigger('getLatLonSuccesHandler', location);

			},error: function(){

			}
		});
	},

	reverseGeo: function(lat, long){
		var latlng = new google.maps.LatLng(lat, long);
		
		geocoder.geocode({'latLng': latlng}, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
		    if (results[1]) {
		      alert(results[1].formatted_address);
		    }
		  } else {
		    alert("Geocoder failed due to: " + status);
		  }
		});
	},

	getLocationService: function(target){

		// geolocate
		if(navigator.geolocation){

				navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout:8000});
				var location = [];

				function onSuccess(position) {
					switch(target){
					case "login":
						appData.events.locationHomeEvent.trigger('locationSuccesHandler', position);
						break;
					case "createActivity":
						appData.events.locationCreateActivityEvent.trigger('locationSuccesHandler', position);
						break;
					case "dashboard":
						Backbone.trigger('getMyLocationHandler', position);
						break;
					case "create":
						Backbone.trigger('createUserLocationHandler', position);
						break;
					}
				}

				// onError Callback receives a PositionError object
				function onError(error) {
					switch(target){
					case "login":
						Backbone.trigger('locationError');
						break;
					case "createActivity":
						appData.events.locationCreateActivityEvent.trigger('locationSuccesHandler', location);
						break;
					case "create":
						Backbone.trigger('locationErrorHandler');
						break;
					}
				}
		}else{

			appData.events.locationEvent.trigger('locationErrorHandler', location);
		}
	},

	localDataToCollection: function(dataObject){


		// this function converts localstorage object to backbone collections
		appData.collections.activities = new ActivitiesCollection(dataObject.activities);
		appData.collections.buurten = new BuurtenCollection(dataObject.buurten);
		appData.collections.challenges = new ChallengesCollection(dataObject.challenges);
		appData.collections.favouriteSports = new SportsCollection(dataObject.favouriteSports);
		appData.collections.locations = new LocationsCollection(dataObject.locations);
		appData.collections.myActivities = new ActivitiesCollection(dataObject.myActivities);
		appData.collections.myPlannedActivities = new ActivitiesCollection(dataObject.myPlannedActivities);
		appData.collections.myInvitations = new ActivitiesCollection(dataObject.myInvitations);
		appData.collections.myJoinedActivitiesView = new ActivitiesCollection(dataObject.myJoinedActivitiesView);

		appData.collections.sortOptions = new SortOptionsCollection(dataObject.sortOptions);
		appData.collections.sports = new SportsCollection(dataObject.sports);
		appData.collections.users = new UsersCollection(dataObject.users);


		appData.settings.dataLoaded = true;

	},

	updateLocalStorage: function(){
		// detect localstorage
		var hasStorage = (function() {
	      try {
	        localStorage.setItem(mod, mod);
	        localStorage.removeItem(mod);
	        return true;
	      } catch(e) {
	        return false;
	      }
	    }());

		if(hasStorage){
        	window.localStorage.setItem("collections", JSON.stringify(appData.collections));
        	window.localStorage.setItem("userModel", JSON.stringify(appData.models.userModel));
		}
	},

  // check if there is a working internet / 3G / 4G / WIFI connection to enable the dynamic mode
  checkConnection: function() {
    var networkState = navigator.connection.type;

    var states = {};
        states[Connection.UNKNOWN]  = false;
        states[Connection.ETHERNET] = true;
        states[Connection.WIFI]     = true;
        states[Connection.CELL_2G]  = true;
        states[Connection.CELL_3G]  = true;
        states[Connection.CELL_4G]  = true;
        states[Connection.CELL]     = false;
        states[Connection.NONE]     = false;

        appData.settings.network = states[networkState];
  },

  convertDate: function(date, time, notification){
 	var myTimeDate = date + " " + time;
  	var bits = myTimeDate.split(/\D/);

  	// now fix the month
  	var month = bits[1] - 1;
  	var date = new Date(bits[0], month, bits[2], bits[3], bits[4]); 	
  
  	// if this is a notification make it 30 minutes before the activity
  	if(notification){
  		date = new Date(date.getTime() - 30*60000);
  	}

  	return date;
  }

});


appData.utils.templates = (function() {

    var load = function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (appData.views[view]) {
                deferreds.push($.get('public/templates/' + view + '.html', function(data) {
                    appData.views[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });


        $.when.apply(null, deferreds).done(callback);
    }



    // The public API
    return {
        load: load
    };


}());