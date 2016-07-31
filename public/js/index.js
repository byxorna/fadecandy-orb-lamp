var throttle_data_change_ms = 100;
console.log("got data from server: " , data);

function handle_error(msg){
  $('.message').addClass('alert-danger').text(msg).show();
};
function clear_error(){
  $('.message').hide().removeClass('alert-danger');
};
// for a selected pattern, set disabled on the inputs for each exported
// feature
function set_features_enabled(){
  var featuresmap = {
    color: 'input#colorinput',
    period: 'input#period',
    intensity: 'input#intensity'
  };
  //console.log(data);
  //console.log(patterns);
  for (feature in featuresmap) {
    var selector = featuresmap[feature];
    var enabled = true;
    if (data.pattern != null) {
      enabled = (patterns[data.pattern]['features'][feature]);
    }
    //console.log(selector + " is " + enabled.toString() + " " + feature);
    if (enabled) {
      $(selector).removeAttr('disabled');
    } else { $(selector).attr('disabled', true); }
  }
};

function handle_data_change(evt){
  var slider = $(evt.currentTarget);
  var channel = slider.attr('name');
  var v = slider.val();
  console.log("Got data change", channel, v);
  data[channel] = v;
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
    $.get('start?pattern=' + t.val()).fail(function(x){
      console.log("failed: ", x);
      handle_error(x.responseJSON.error);
    }).done(function(x){
      clear_error();
      data.pattern = t.val();
      set_features_enabled();
    });
  });
  $('form').on('submit', function(){
    var t = $(this);
    console.log("Submitting ",t);
    if ( t.attr('id') == 'stop') {
      console.log("Clearing selected pattern");
      $('form#patterns select').val(null);
    }
    $.get(t.attr('action')).fail(function(x){
      console.log("failed: ", x);
      handle_error(x.responseJSON.error);
    }).done(function(x){
      clear_error();
    });
    return false;
  });
  $('form input').on('change', throttled_data_change);
});
