(function($,window){
	var cwp_gimg_media = wp.media,
	cwp_gimg_routerView, pasteContent;


	cwp_gimg_routerView = cwp_gimg_media.view.routerView = typeof _wpMediaViewsL10n === 'undefined' ? {} : _wpMediaViewsL10n;

	/*Tabs of Media Library*/
	cwp_gimg_media.view.MediaFrame.Select.prototype.browseRouter = function( view ) {
		var set_data = {};
		set_data.upload = {
			text:     cwp_gimg_routerView.uploadFilesTitle,
			priority: 20
		};
		
		set_data.browse = {
			text:     cwp_gimg_routerView.mediaLibraryTitle,
			priority: 40
		};

		set_data.gsearch = {
			text:     "Google Image Search",
			priority: 50
		};
		view.set(set_data);
	};

	
	/*Content of GSearch tab*/
	wp.media.view.Router = wp.media.view.Router.extend(
	{
		select : function(id){
			var view = this.get( id );
			this.deselect();
			if(view && view.$el)
				view.$el.addClass('active');
	 
			 if(id == "gsearch"){
				jQuery(".media-frame-content").html("<div class='cwp_gimg_ginputs'><form id='cwp_gimg_gsearch_form' action='"+path_var.path+"' method='POST'><input type='text' id='cwp_gimg_input_text' name='search_input' placeholder='Search' class='search cwp_gimg_gsearch_text_input'/><input type='submit' id='cwp_gimg_gsearch_submit' class='button cwp_gimg_gsearch_input_button'/></div>");
				
				
				
				
				
				jQuery("#cwp_gimg_gsearch_form").submit(function(e){
					var  data = {
						action:"cwp_gimg_get_images",
						q:jQuery("#cwp_gimg_input_text").val()
					}
					jQuery.ajax(
					{
						url : ajax_url,
						type: "POST",
						data : data,
						success:function(data, textStatus, jqXHR) 
						{
							jQuery('.cwp_gimg_ginputs').append(data);

						},
						error: function(jqXHR, textStatus, errorThrown) 
						{
							//if fails      
						}
					});
				
					return false;
				});
			}
		}
	});
	
})(jQuery,window);