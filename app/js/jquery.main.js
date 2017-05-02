"use strict";
( function(){

    $( '.popup-buggy-feedback__form' ).validate({
        ignore: [], 
        rules: {
            popupBuggyFeedbackEmail: {
                required: true,
                email: true
            }           
        },
        messages: {
            popupBuggyFeedbackEmail: {
                required: 'Введите, пожалуйста, Ваш e-mail!',
                email: 'Введите, пожалуйста, правельный e-mail!'
            }
        },
        errorPlacement: function(error, element) {
            error.insertBefore(element);
        }
    });

        $.validator.addMethod("valueNotEquals", function(value, element, arg){
            return arg != value;
        }, "Value must not equal arg.");

    

        $( '.popup-places__form' ).validate({
            rules: {
                placesName: {
                    required: true
               },
                popupPlacesService1: {
                    valueNotEquals: "default"
                },
                popupPlacesCity: {
                    valueNotEquals: "default"
                },
                popupPlacesAdress: {
                    required: true
                }            
            },
            messages: {
                placesName: {
                    required: 'Введите пожалуйста название места!'
                },
                popupPlacesService1: {
                    valueNotEquals: 'Выбирите пожалуйста услугу!'                 
                },
                popupPlacesCity: {
                    valueNotEquals: 'Укажите город!'               
                },
                popupPlacesAdress: {
                    required: 'Укажите адрес!'
                }
            }
        });

} )();