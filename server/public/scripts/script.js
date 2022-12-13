$(document).ready(handleReady);

function handleReady() {
    console.log('loaded');
    $('.calculator').submit(function(event) {
        event.preventDefault();
        handleSubmit(event);
    });
    $('.operator').on('click', 'input', function(event) {
        setOperator(event);
    });
    getHistory();
};

function getHistory() {
    $.ajax({
        type: "GET",
        url: '/history',
        success: function(historyRes) {
            console.log('historyRes', historyRes);
            renderHistory(historyRes);
        },
      });
};

function renderHistory({history}) {
    const historyItems = [];
    $(history).each(function() {
        historyItems.push(`<li>
            ${this.firstNumber} ${this.operator} ${this.secondNumber} = ${this.result}
        </li>`);
    });
    console.log('historyItems', historyItems);
    $('.history').empty().append(historyItems);
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
        payLoad[this.name] = parseInt( $(this).val() );
    })
    console.log('handleSubmit, payLoad:', payLoad);
    $.ajax({
        type: "POST",
        url: '/calculate',
        data: payLoad,
        success: function(response) {
            console.log('response', response);
            $('.result').text(response.result);
            $('.calculator').get(0).reset();
            getHistory();
        },
      });
};

