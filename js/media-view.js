(function($,window){
	var media       = wp.media,
	bindHandlers = media.view.MediaFrame.Select.prototype.bindHandlers,
	routerView, pasteContent;


	routerView = media.view.routerView = typeof _wpMediaViewsL10n === 'undefined' ? {} : _wpMediaViewsL10n;
	// override media input methods.
	media.view.MediaFrame.Select.prototype.browseRouter = function( view ) {
		var set_data = {};
		set_data.upload = {
			text:     routerView.uploadFilesTitle,
			priority: 20
		};
		
		set_data.browse = {
			text:     routerView.mediaLibraryTitle,
			priority: 40
		};

		set_data.gsearch = {
			text:     "Google Image Search",
			priority: 50
		};
		view.set(set_data);
	};
	
	wp.media.view.Router = wp.media.view.Router.extend(
	{
		select : function(id){
		  var view = this.get( id );
		  this.deselect();
		  if(view && view.$el)
			view.$el.addClass('active');
	 
		 if(id == "gsearch"){
			
			
			
			jQuery(".media-frame-content").html("<div class='ginputs'><form id='gsearch_form' action='"+path_var.path+"' method='POST'><input type='text' name='search_input' placeholder='Search' class='search gsearch_text_input'/><input type='submit' id='gsearch_submit' class='button gsearch_input_button'/></div>");

			
			//do something
			jQuery("#gsearch_form").submit(function(e){
				var postData = jQuery(this).serializeArray();
				var formURL = jQuery(this).attr("action");
				
				jQuery.ajax(
				{
					url : formURL,
					type: "POST",
					data : postData,
					success:function(data, textStatus, jqXHR) 
					{
						alert(data);
						//data: return data from server
					},
					error: function(jqXHR, textStatus, errorThrown) 
					{
						//if fails      
					}
				});
				e.preventDefault(); //STOP default action
			});
 

			
			
			
						
			
			//probably there is a better way
		}
    }
});

	
	

})(jQuery,window);
