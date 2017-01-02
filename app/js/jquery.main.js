"use strict";
( function(){

	$( function() {

	  $.each( $( '.star' ), function() {
	     
	    new  Star ( $( this ) );
	     
	  } );


	} );


	var Star = function ( obj ) {
	
	  //private properties
	  var _self = this,
	      _starContainer = obj,
	      _star = _starContainer.children();

	  //private methods
	  var _constructor = function () {

	          _onEvents();
	  
	      },
	  _onEvents = function () {
	  
	      _star.on ( {
	          click: function () {
	           
	           _showIndex( $(this) );

	          }
	      } );

	  },
	
	  _showIndex = function ( el ) {

	  	var curentElementIndex,
					rating;	  			

	  	curentElementIndex = el.index();
			
			rating =  _star.length - curentElementIndex;

			_star.css({'fill':'#000','strocke':'#000'});

			for ( var i = curentElementIndex; i < _star.length; i++ ) {

				_star.eq( i ).css({'fill':'#0f0','strocke':'#0f0'});

			}	

	    console.log(rating);

	  };
	
	  _constructor ();
	
	}

} )();