"use strict";
( function(){

	$( function() {

	  $.each( $( '.canvas' ), function() {
	     
	    new  Drawing ( $( this ) );
	     
	  } );


	} );


	var Drawing = function ( obj ) {
	
	  //private properties
	  var _self = this,
	      _canvas = obj[0],_pos,
	      _shape = $( '.site__shape input:checked' ),
	      _document = $( document );

	  //private methods
	  var _constructor = function () {

	          _onEvents();
	  
	      },
	  _onEvents = function () {
	  
	      _document.on ( {

	          ready: function () {

	          	_takeShape();

	          }
	      } );

	  },	
	  _takeShape = function () {

	  	var ctx = _canvas.getContext('2d');

	  	_document.mousemove( function ( evt ) {

	  		_pos = function () {

	  			var rect = _canvas.getBoundingClientRect();

	  			return {
	  			   x: evt.clientX - rect.left,
	  			   y: evt.clientY - rect.top
	  			 };

	  		}();

	  	});

	  	if ( ctx ) {

	  		if ( _shape.val() == 1 ) {
	  				console.log('ky');

	  		} else if ( _shape.val() == 2 ) {

console.log('tr');

	  		} else if ( _shape.val() == 3 ) {

console.log('kr');

	  		}

	  	}

	  },
	  _draw = function () {

	  	

	  };
	
	  _constructor ();
	
	}

} )();