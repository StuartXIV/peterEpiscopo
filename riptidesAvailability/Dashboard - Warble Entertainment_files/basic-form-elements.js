$(function () {
	//Textare auto growth
	autosize($('textarea.auto-growth'));

	//Datetimepicker plugin
	$('.datetimepicker').bootstrapMaterialDatePicker({
		format: 'dddd DD MMMM YYYY - HH:mm',
		clearButton: true,
		weekStart: 1
	});

	$('.datepicker').bootstrapMaterialDatePicker({
		format: 'DD/MM/YYYY',
		switchOnClick: true,
		weekStart: 1,
		time: false,
		clearButton: true,		
		nowButton: true,
		nowText: 'Today'

	});

	$('.timepicker').bootstrapMaterialDatePicker({
		format: 'HH:mm',
		clearButton: true,
		date: false
	});
});




$(document).ready(function (e) {
	
	
	var regex = /^(.+?)(\d+)$/i;
	var cloneIndex = $(".clonedInput").length;

	function clone(e) {
		e.preventDefault();
		$(".act_search").typeahead('destroy');
		$(this).parents().prev().prev(".clonedInput").clone(true,true)
			.appendTo(".acts")
			.attr("id", "clonedInput" + cloneIndex)
			.find("*")
			.each(function () {
				var id = this.id || "";
				var match = id.match(regex) || [];
				if (match.length == 3) {
					this.id = match[1] + (cloneIndex);
				}
			})
			.find("input:text").val("").end()
			.find("input:hidden").val("").end()
			.find("textarea").val("").end()
			.on('click', 'button.clone', clone)
			.on('click', 'button.remove', remove);
		$.get('/enquiry_ajax/json_search_act', function (data) {
		typeahead_initialize(data);
	}, 'json');
		
			
		cloneIndex++;
	}

	function remove(e) {
		e.preventDefault();
		$(this).parents().prev().children(".clonedInput").remove();
	}

	$(document).on("click", "button.clone", clone);

	$(document).on("click", "button.remove", remove);
	


	
	//autocomplete 
	function typeahead_initialize(data) {
		
		var site_url = "<?php echo site_url(); ?>";
		var input = $(".act_search");

		input.typeahead({
				source: data,
				minLength: 3,
			
			});
		
	}
	
	var truncates = $('.act_search');
	if (truncates.length) {
		//get JSON records
		$.get('/enquiry_ajax/json_search_act', function (data) {
			typeahead_initialize(data);
		}, 'json');
	}

	//pass act id to hidden field
	$(document).on("change", ".act_search", function() {
		var current = $(this).typeahead("getActive");
		$(this).prev('input').val(current.id);
		
console.log(current)
		if($(this).data('full')==true) {
			
			get_terms(current.id,$(this).parent().parent().parent().next().children().next().children().children());

			get_options(current.id,$(this).parent().parent().parent().parent().next().next().children().children().next().children().children());
		}
		
		
	})
	
	function get_terms(id,location) {
		
		$.post("/enquiry_ajax/get_act_terms/"+id,{action:''},function(result){
					
			
			
					var obj = jQuery.parseJSON( result );
			
			if(obj.length>2) {
				
					location.val(obj);
			} 
				
									
		});
	}

	function get_options(id,location) {
		
		$.post("/enquiry_ajax/get_act_options/"+id,{action:''},function(result){
				
						
					var obj = jQuery.parseJSON( result );
					if(obj.length>2) {	
						location.val(obj);
				} else {
				var default_text = `** piece band performing 2 x 60 minute sets
 all PA and lighting equipment
 pre-mixed party music between sets
 fee includes all travel and accommodation costs`;
				location.val(default_text)
			}
									
		});
	}

	//end autocomplete 

	$(".invoice_paid_checkbox").click(function () {
		var id = $(this).data('show');

		$("#" + id).fadeIn("slow", function () {
			// Animation complete
		});




	});

	$(function () {
		$('[data-toggle="popover"]').popover({
			container: 'body',
			trigger: 'click',
			html:true
		});
	});
	
	$(function () {
		$('[data-toggle="popover1"]').popover({
			container: 'body',

			html:true
		});
	});
	
	
})

$(document).on('click', function (e) {
    $('[data-toggle="popover"],[data-original-title]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
            (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
        }

    });
});

$(document).ready(function () {





	//HOME - NEW
	new_table = $('#new_table').DataTable({

		"processing": true, //Feature control the processing indicator.
		"serverSide": true, //Feature control DataTables' server-side processing mode.
		"order": [], //Initial no order.
		"pageLength": 10,

		// Load data for the table's content from an Ajax source
		"ajax": {
			"url": '/welcome/ajax_list',
			"type": "POST"
		},

		//Set column definition initialisation properties.
		"columnDefs": [{
			"targets": [0], //first column / numbering column
			"orderable": false, //set not orderable
		}, ],

	});


	//HOME - AGENT
	agent_table = $('#agent_table').DataTable({

		"processing": true, //Feature control the processing indicator.
		"serverSide": true, //Feature control DataTables' server-side processing mode.
		"order": [], //Initial no order.
		"pageLength": 10,

		// Load data for the table's content from an Ajax source
		"ajax": {
			"url": '/welcome/ajax_list_agent',
			"type": "POST"
		},

		//Set column definition initialisation properties.
		"columnDefs": [{
			"targets": [0], //first column / numbering column
			"orderable": false, //set not orderable
		}, ],

	});


	
		//HOME - AGENT OPEN
	agent_open_table = $('#agent_open_table').DataTable({

		"processing": true, //Feature control the processing indicator.
		"serverSide": true, //Feature control DataTables' server-side processing mode.
		"order": [], //Initial no order.
		"pageLength": 10,

		// Load data for the table's content from an Ajax source
		"ajax": {
			"url": '/welcome/ajax_list_open_agent',
			"type": "POST"
		},

		//Set column definition initialisation properties.
		"columnDefs": [{
			"targets": [0], //first column / numbering column
			"orderable": false, //set not orderable
		}, ],

	});



	//datatables
	table = $('.generic-table').DataTable({

		"processing": true, //Feature control the processing indicator.
		"serverSide": true, //Feature control DataTables' server-side processing mode.
		"order": [], //Initial no order.
		"pageLength": 10,
		 //"stateSave": true,

		// Load data for the table's content from an Ajax source
		"ajax": {
			"url": $('.table').data("src"),
			"type": "POST"
		},

		//Set column definition initialisation properties.
		"columnDefs": [{
			"targets": [0], //first column / numbering column
			"orderable": false, //set not orderable
		}, ]


	});
	
	
    $('.action_table').DataTable({
		"bLengthChange": false,
		"searching":   false,
		 "paging":   false,
        "info":     false,
		"columns": [
					null,
					null,
					null,
					null,
					null,
					null,
					{ "orderable": false },
					]	
		
	});



	$(document).on('click', "a.refresh", function () {

		var target = $(this).data('target');

		$(target).DataTable().ajax.reload();

	});


	$(".ajax-customer").blur(function () {

		if($(this).val().length>0) {
		
		$('.ajax-customer').parent().removeClass('error');	
		$.ajax({
				url: '/customer/customer_exists',
				type: 'POST',
				data: {
					email: $(this).val()
				}
			})
			.done(function (response) {
				if (response != 'false') {
					var r = response;
					$('.ajax-customer').parent().addClass('focused error');
					$("#my_div").fadeIn();
					$("#my_div").html('<a href="/customer/edit/' + r + '">Customer already exists</a> ');
				} else {
					$("#my_div").fadeOut();

				}
			})
		
		}
	})


	$(document).on('click', "a.make-available", function () {

		var id = $(this).attr('id');
		$.ajax({
				url: '/act/set_act_available/',
				type: 'POST',
				data: {
					act_id: $(this).data('act_id'),
					date: $(this).data('date')
				}
			})
			.done(function () {

				$('#' + id).addClass('make-unavailable');
				$('#' + id).removeClass('make-available');
				$('#' + id).removeClass('bg-red');

			})


	})

	$(document).on('click', "a.make-unavailable", function () {

		var id = $(this).attr('id');
		$.ajax({
				url: '/act/set_act_unavailable/',
				type: 'POST',
				data: {
					act_id: $(this).data('act_id'),
					date: $(this).data('date')
				}
			})
			.done(function () {
				$('#' + id).removeClass('make-unavailable');
				$('#' + id).addClass('bg-red');
				$('#' + id).addClass('make-available');
			})


	})


});



// Fill modal with content from link href
$("#quoteModal").on("show.bs.modal", function (e) {

	var link = $(e.relatedTarget);
	$(this).find(".modal-body").load(link.data("url"));

});



$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})




$(document).ready(function(){ 

	$(function() {
		$("#rows").sortable({ opacity: 0.6, cursor: 'move', update: function() {
			var order = $(this).sortable("serialize") + '&action=updateRecordsListings';
			$.post("/images/reorder_gallery", order, function(theResponse){
				$("#result").html(theResponse);
			});
		}
		});
	});

	$(function() {
		$("#audiorows").sortable({ opacity: 0.6, cursor: 'move', update: function() {
			var order = $(this).sortable("serialize") + '&action=updateRecordsListings';
			$.post("/ajax/reorder_audio", order, function(theResponse){
				$("#result").html(theResponse);
			});
		}
		});
	});


	
	
	
	

});



	$( document ).on( 'click', '.playaudio', function(e) {
		e.preventDefault();
				$('#audio').show();

			$('audio').stop();
			$('audio').attr('src',$(this).data('mp3'));
			$('audio').get(0).play();




	});

	$( document ).on( 'click', '.stopaudio', function(e) {
		e.preventDefault();
		$('#audio').hide();
			$('audio').get(0).pause();




	});




