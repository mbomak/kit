"use strict";
( function(){

	class Shape {

		constructor( x,y ){
			this.x = x;
			this.y = y;
			this.canvas = document.createElement( 'canvas' );
			this._ctx = this.canvas.getContext( '2d' );
			this._color = this._getRandomColor();
			this._widthCanvas = 60;
			this._heightCanvas = 60;
			this._setCanvasSize();
			this._drawShape();
		}

		_getRandomColor(){

			let letters = '0123456789ABCDEF';

			let color = '#';

			for (var i = 0; i < 6; i++ ) {

			    color += letters[Math.floor(Math.random() * 16)];

			}

			return color;

		}

		_setCanvasSize(){

			this.canvas.width = this._widthCanvas;
			this.canvas.height = this._heightCanvas;

		}
	}

	class Triangle extends Shape {

		_drawShape(){

			let triangleHeight = this._heightCanvas*(1.5/Math.sqrt(3));

			this._ctx.beginPath();
			this._ctx.fillStyle = this._color;
			this._ctx.lineJoin = 'miter';
			this._ctx.moveTo( this._widthCanvas/2,0 );
			this._ctx.lineTo( this._widthCanvas,triangleHeight );
			this._ctx.lineTo( 0,triangleHeight );
			this._ctx.closePath();
			this._ctx.fill();

		}
	
	}

	class Square extends Shape {

		_drawShape(){

				this._ctx.beginPath();
				this._ctx.fillStyle = this._color;
				this._ctx.rect( 0,0,this._widthCanvas,this._heightCanvas );
				this._ctx.fill();

		}

	}

	class Circle extends Shape {

		_drawShape(){

				this._ctx.beginPath();
				this._ctx.fillStyle = this._color;
				this._ctx.arc( 
					this._widthCanvas/2,
					this._heightCanvas/2,
					this._widthCanvas/2,
					0,
					2*Math.PI,
					false
				);

				this._ctx.fill();
		}
	
	}

	class Game{

		constructor( item ){
			//private properties
			this._canvas = item;
			this._ctx = this._canvas.getContext('2d');
			this._shape = undefined;
			this._shapes = [];
			this._radioButtons = document.querySelectorAll( '.site__shape input' );

			this._takeShape();
			this._onEvents();
			this._loop();
		}

		_onEvents(){

			this._onShapeChange();

			this._canvas.addEventListener( 'mousedown',( event )=>{

				this._canvas.addEventListener ( 'mousemove', ()=>{

					console.log('move');

				});

				let position = this._getMousePosition ( event );	
				
				let x = position.x;			
				let y = position.y;

				if ( this._shape == 'square' )	{

					this._shapes.push( new Square( x,y ) );

				}	else if ( this._shape == 'triangle' ) {

					this._shapes.push( new Triangle( x,y ) );

				} else if ( this._shape == 'circle' ) {

					this._shapes.push( new Circle( x,y ) );

				}

			} );	

		}

		_getMousePosition( evt ){

			let rect = this._canvas.getBoundingClientRect();

			return  {
				x: Math.round(evt.clientX - rect.left),
				y: Math.round(evt.clientY - rect.top)
			};

		}

		_takeShape(){

			for( let item of this._radioButtons ){

				if ( item.checked ) {

					this._shape = item.value;

				}
			}			
		}

		_onShapeChange(){

			for( let item of this._radioButtons ){

				item.addEventListener( 'change', ()=>{

					this._takeShape();

				} );

			}

		}

		_loop(){

			let loop = ()=>{

				this._draw();
				requestAnimationFrame( loop );

			};

			loop();

		}

		_draw(){

			this._ctx.clearRect( 0,0,this._canvas.width,this._canvas.height );

			this._shapes.forEach( ( item )=>{

				this._ctx.save();
				this._ctx.translate( item.x, item.y );
				this._ctx.drawImage( item.canvas,-30,-30 );
				this._ctx.restore();

			} );

		}

	}

	for( let item of document.querySelectorAll( '.canvas' ) ){

		new Game( item );

	}
} )();
