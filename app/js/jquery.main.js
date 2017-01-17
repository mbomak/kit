"use strict";
( function(){

	class Drawing{

		constructor( item ){
			//private properties
			this._canvas = item;
			this._ctx = this._canvas.getContext('2d');
			this._canvasCur = undefined;
			this._pos = undefined;
			this._shape = undefined;
			this._color = undefined;
			this._arrCanvas = [];
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
			getRandomColor = ()=>{

			  let letters = '0123456789ABCDEF';

			  let color = '#';

			  for (var i = 0; i < 6; i++ ) {

			      color += letters[Math.floor(Math.random() * 16)];

			  }

			  return color;

			},
			drawSquare = ( color )=>{

				let ctx = initNewCanvas( 60,60 );

				ctx.beginPath();
				ctx.fillStyle = color;
				ctx.rect(0,0,60,60);
				ctx.fill();

			},
			drawTriangle = ( color)=>{

				let heightCanv = 90/Math.sqrt(3);

				let ctx = initNewCanvas( 60,heightCanv );

				ctx.beginPath();
				ctx.fillStyle = color;
				ctx.lineJoin = 'miter';
				ctx.moveTo( 30,0 );
				ctx.lineTo( 60,heightCanv );
				ctx.lineTo( 0,heightCanv );
				ctx.closePath();
				ctx.fill();

			},
			drawCircle = ( color )=>{

				let ctx = initNewCanvas( 60,60 );

				ctx.beginPath();
				ctx.fillStyle = color;
				ctx.arc( 30,30,30,0,2*Math.PI,false );
				ctx.fill();

			},
			initNewCanvas = ( width,height )=>{

				let canvas = undefined;
				let context = undefined; 

				canvas = document.createElement( 'canvas' );

				canvas.width = width;
				canvas.height = height;

				this._canvasCur = canvas;

				context = canvas.getContext('2d');
 
				return context;

			},
			clickOnCanvas = ()=>{

				this._canvas.addEventListener( 'click',( e )=>{

					if ( this._arrCanvas.length !=0 ) {

						// for ( let i = 0; i < this._arrCanvas.length; i++ ) {

						// 	let contCanvasArr = this._arrCanvas[i];

						// 	if ( contCanvasArr.isPointInPath(30,30) ) {

						// 		draw( e );

						// 	} else {

						// 		draw( e );

						// 	}
						// }

						draw( e );
					} else {

						draw( e );
						
					}

				} );
			
			},
			draw = ( e )=>{

				if ( this._ctx ) {

					this._pos = getPos( e );
					let x = this._pos.x;
					let y = this._pos.y;

					this._color = getRandomColor();

					if ( this._shape == 'square' ) {

						drawSquare( this._color );

						this._ctx.drawImage( this._canvasCur,x-30,y-30 );

						this._arrCanvas.push(this._canvasCur.getContext('2d'));

					} else if ( this._shape == 'triangle' ) {

						drawTriangle( this._color );

						this._ctx.drawImage( this._canvasCur,x-30,y-(60/Math.sqrt(3)) );

						this._arrCanvas.push(this._canvasCur);

					} else if ( this._shape == 'circle' ) {

						drawCircle( this._color );

						this._ctx.drawImage( this._canvasCur,x-30,y-30 );

						this._arrCanvas.push(this._canvasCur);

					}
				}

			};

			takeShape();

			changeShape();

			clickOnCanvas();

		}

	}


	for( let item of document.querySelectorAll( '.canvas' ) ){

		new Drawing( item );

	}

} )();