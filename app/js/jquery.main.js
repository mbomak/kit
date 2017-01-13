"use strict";
( function(){

	class Drawing{

		constructor( item ){
			//private properties
			this._canvas = item;
			this._ctx = this._canvas.getContext('2d');
			this._pos = undefined;
			this._shape = undefined;
			this._color = undefined;
			this._width = this._canvas.width;
			this._height = this._canvas.height;
			this._drag = false;
			this._startX = undefined;
			this._startY = undefined;
			this._rect = [];
			this._radioButtons = document.querySelectorAll( '.site__shape input' );
			this._onEvents();
		}

		_onEvents(){

			let getPos = ( evt )=>{

			  	let rect = this._canvas.getBoundingClientRect();

			  	return  {
			  		x: Math.round(evt.clientX - rect.left),
			  		y: Math.round(evt.clientY - rect.top)
			  	};

			},
			takeShape = ()=>{

			  let checkedButton = undefined;

			  for( let item of this._radioButtons ){

			  	if ( item.checked ) checkedButton = item;

			  }

			  if ( checkedButton.value == 1 ) {

			  	 this._shape = 'square';

			  } else if ( checkedButton.value == 2 ) {

			  	this._shape = 'triangle';

			  } else if ( checkedButton.value == 3 ) {

			  	this._shape = 'circle';

			  }

			},
			changeShape = ()=>{

			  for( let item of this._radioButtons ){

			  	item.addEventListener( 'change', ()=>{

			  		takeShape();

			  	} );

			  }

			},
			draw = ()=>{

				if ( this._ctx ) {

					this._canvas.addEventListener( 'click',( e )=>{

						this._pos = getPos( e );
						let x = this._pos.x;
						let y = this._pos.y;

						this._color = getRandomColor();

						if ( this._shape == 'square' ) {

							drawSquare( x,y,this._color );

							this._rect.push( { 
								x:x-30,
								y:y-30,
								width:60,
								height:60,
								fill:this._color,
								isDragging:false,
								shape:this._shape
							} );

						} else if ( this._shape == 'triangle' ) {

							drawTriangle( x,y,this._color );

							this._rect.push( { 
								x:x-(Math.sqrt(3)*20),
								y:y-40,
								width:Math.sqrt(3)*20,
								height:60,
								fill:this._color,
								isDragging:false,
								shape:this._shape
							} );


						} else if ( this._shape == 'circle' ) {

							drawCircle( x,y,this._color );

							this._rect.push( { 
								x:x-30,
								y:y-30,
								width:60,
								height:60,
								fill:this._color,
								isDragging:false,
								shape:this._shape
							} );

						}

					} );

				}

			},
			getRandomColor = ()=>{

			  let letters = '0123456789ABCDEF';

			  let color = '#';

			  for (var i = 0; i < 6; i++ ) {

			      color += letters[Math.floor(Math.random() * 16)];

			  }

			  return color;

			},
			drawSquare = (x,y,color)=>{

				this._ctx.beginPath();
				this._ctx.fillStyle = color;
				this._ctx.fillRect( x-30,y-30,60,60 );

			},
			drawTriangle = (x,y,color)=>{

				this._ctx.beginPath();
				this._ctx.fillStyle = color;
				this._ctx.lineJoin = 'miter';
				this._ctx.moveTo( x,y-40 );
				this._ctx.lineTo( x+(Math.sqrt(3)*20),y+20 );
				this._ctx.lineTo( x-(Math.sqrt(3)*20),y+20 );
				this._ctx.closePath();
				this._ctx.fill();

			},
			drawCircle = (x,y,color)=>{

				this._ctx.beginPath();
				this._ctx.fillStyle = color;
				this._ctx.arc(x,y,30,0,2*Math.PI,false);
				this._ctx.fill();

			},
			drawRect = ( x,y,w,h )=>{
				ctx.beginPath();
				ctx.rect(x, y, w, h);
				ctx.closePath();
				ctx.fill();
			},
			clear = ()=>{
				this._ctx.clearRect( 0,0,this.width,this._height );
			},
			redraw = ()=>{

				clear();

				this._ctx.fillStyle = "#eee";

				drawRect( 0,0,this.width,this.height );

			},
			myDown = ( e )=>{

				this._canvas.addEventListener( 'mousedown',( e )=>{

			    e.preventDefault();
			    e.stopPropagation();

			    //var mx = parseInt(e.clientX - offsetX);
			    //var my = parseInt(e.clientY - offsetY);

			    this._pos = getPos( e );
			    let x = this._pos.x;
			    let y = this._pos.y;

			    this._drag = false;

			    for (let i = 0; i < this._rect.length; i++ ) {

			        let r = this._rect[i];

			        if ( x > r.x && x < r.x + r.width && y > r.y && y < r.y + r.height ) {

			            this._drag = true;
			            r.isDragging = true;

			        }
			    }

			    this._startX = x;
			    this._startY = y;

			  } );
			    
			},
			myUp = ( e )=>{  
			    // tell the browser we're handling this mouse event
			    e.preventDefault();
			    e.stopPropagation();

			    // clear all the dragging flags
			    dragok = false;
			    for (var i = 0; i < rects.length; i++) {
			        rects[i].isDragging = false;
			    }
			};

			takeShape();

			changeShape();

			draw();

			myDown();

		}

	}


	for( let item of document.querySelectorAll( '.canvas' ) ){

		new Drawing( item );

	}

} )();