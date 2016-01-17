var throttle_color_change_ms = 200;
console.log("got data from server: " , data);

function handle_color_change(evt){
  var slider = $(evt.currentTarget);
  var channel = slider.attr('name');
  //console.log("Got color change: ",channel, evt.value.newValue);
  data[channel] = evt.value.newValue;
};
// throttle calls to this handler
var throttled_color_change = _.throttle(handle_color_change, throttle_color_change_ms);

$(function(){
  $('input.colorslider').each(function(){
    var s = $(this);
    var sl = s.slider({
      id: s.attr('name') + "_slider",
      reversed: true,
      tooltip: 'hide',
    });
    sl.on('change', throttled_color_change);
  });
});
