// function preview(img, selection) {
//     try {
//     var scaleX = (thumb_width/2) / selection.width;
//     var scaleY = (thumb_height/2) / selection.height;

//     $('#previewimage').css({
//             width: Math.round(scaleX * image_width) + 'px',
//             height: Math.round(scaleY * image_height) + 'px',
//             marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
//             marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
//     });
//     $('#x1').val(selection.x1);
//     $('#y1').val(selection.y1);
//     $('#x2').val(selection.x2);
//     $('#y2').val(selection.y2);
// } catch(e){

// }
// }

// $(document).ready(function () {
//     $('#save_thumb').click(function() {
//         var x1 = $('#x1').val();
//         var y1 = $('#y1').val();
//         var x2 = $('#x2').val();
//         var y2 = $('#y2').val();
//         if(x1=="" || y1=="" || x2=="" || y2==""){
//                 alert("You must make a selection first");
//                 return false;
//         }else{
//                 return true;
//         }
//     });
// });

// $(window).load(function () {
//     $('#thumbnail').imgAreaSelect({ aspectRatio: '1:' + thumb_height/thumb_width, onSelectChange: preview });
// });