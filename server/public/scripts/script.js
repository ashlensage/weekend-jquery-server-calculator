$(document).ready(handleReady);

function handleReady() {
    console.log('loaded');
    $('.calculator').submit(function(event) {
        event.preventDefault();
        handleSubmit(event);
    })
    $('.operator').on('click', 'input', function(event) {
        setOperator(event);
    })
};

function setOperator({target}) {
    console.log('setOperator, target:', target);
};

function handleSubmit({target}) {
    const payLoad = {};
    
    payLoad.operator = $(target).find('input[type="radio"]:checked').val();
    const numbers = $(target).find('input[type="number"]');
    console.log('handleSubmit, numbers:', numbers);
    $(numbers).each(function(){
        console.log('handleSubmit, each this:', this);
        payLoad[this.name] = $(this).val();
    })
    console.log('handleSubmit, payLoad:', payLoad);
};

