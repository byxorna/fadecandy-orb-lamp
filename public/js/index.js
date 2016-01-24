var throttle_data_change_ms = 100;
console.log("got data from server: " , data);

function handle_error(msg){
  $('.message').addClass('alert-danger').text(msg).show();
};
function clear_error(){
  $('.message').hide().removeClass('alert-danger');
};

function handle_data_change(evt){
  var slider = $(evt.currentTarget);
  var channel = slider.attr('name');
  console.log("Got data change", channel, evt.value.newValue);
  data[channel] = evt.value.newValue;
  console.log("got value",evt.value.newValue);
  $.post('update', data).fail(function(x){
    console.log("failed: ", x);
    handle_error(x.responseJSON.error);
  }).done(function(x){
    clear_error();
  });
};
// throttle calls to this handler
var throttled_data_change = _.throttle(handle_data_change, throttle_data_change_ms);

$(function(){
  $('form#patterns select').on('change', function(){
    var t = $(this);
    //$('form#patterns').submit();
    $.get('start?pattern=' + t.val()).fail(function(x){
      console.log("failed: ", x);
      handle_error(x.responseJSON.error);
    }).done(function(x){
      clear_error();
    });
  });
  $('form').on('submit', function(){
    var t = $(this);
    console.log("Submitting ",t);
    $.get(t.attr('action')).fail(function(x){
      console.log("failed: ", x);
      handle_error(x.responseJSON.error);
    }).done(function(x){
      clear_error();
    });
    return false;
  });
  $('input.dataslider').each(function(){
    var s = $(this);
    var sl = s.slider({
      id: s.attr('name') + "_slider",
      reversed: true,
      tooltip: 'hide',
    });
    sl.on('change', throttled_data_change);
  });
});
