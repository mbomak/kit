"use strict";
( function(){

    $( function() {

      $.each( $( '.popup' ), function() {
         
        new  Popup ( $( this ) );
         
      } );

    } );


    var Popup = function ( obj ) {
    
      //private properties
      var _self = this,
          _popup = obj,
          _popupContent = _popup.children( '.popup__content' ),
          _btnShow =  $( '.popup__open' ),
          _btnClose = _popupContent.children( '.popup__close' ),
          _scrollConteiner = $( 'body' ),
          _timer = setTimeout( function(){}, 1 );

      //private methods
      var _constructor = function () {

            _onEvents();
      
          },
      _onEvents = function () {
      
        _btnShow.on( {
          click: function(){
            _show( $( this ).attr( 'data-popup' ) );
            return false;
          }
        } );

        _popupContent.on( {
          click: function( e ){
            e.stopPropagation();
          }
        } );

        _popup.on( {
          click: function(){
              _hide();
              return false;
          }
        } );

        _btnClose.on( {
          click: function(){
              _hide();
              return false;
          }
        } );

      },
      _getScrollWidth = function (){
          var scrollDiv = document.createElement( 'div'),
              scrollBarWidth;

          scrollDiv.className = 'popup__scrollbar-measure';

          document.body.appendChild( scrollDiv );

          scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

          document.body.removeChild( scrollDiv );

          return scrollBarWidth;
      },
      _show = function( className ){

        _setContentBgColor( className );

        _scrollConteiner.css( {
            overflowY: 'hidden',
            paddingRight: _getScrollWidth()
        } );

        _popup.addClass( 'popup_opened' );

      },
      _hide = function(){

        _scrollConteiner.css( {
            overflowY: 'auto',
            paddingRight: 0
        } );

        _popup.removeClass( 'popup_opened' );        
        _popup.addClass( 'popup_hide' );

        _timer = setTimeout( function(){

          _popup.removeClass( 'popup_hide' );

        }, 300 );

      },
      _setContentBgColor = function( className ){

        var curContent,
            backgroundColor;

        curContent = _popup.children( '.popup__' + className );

        _popupContent.hide();

        curContent.show();

        backgroundColor = curContent.attr( 'data-background' );

        if ( backgroundColor ) _popup.css( 'background',backgroundColor );         

        else _popup.css( 'background','' );        

      };
    
      _constructor ();
    
    }

} )();