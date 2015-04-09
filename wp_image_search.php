<?php
/**
 * Plugin Name: WP Image Search
 */

 
 /* Register style and script*/
function  cwp_gimg_gsearch_admin_init() {
	wp_register_script( 'cwp_gimg_gsearch-media-view' , plugins_url( 'js/media-view.js' , __FILE__ ) , array('media-editor') , '0.0.1' );
	wp_register_style( 'cwp_gimg_gsearch_style' , plugins_url( 'css/gsearch.css' , __FILE__ ) , array( ) , '0.0.1' );
}
add_action( 'admin_init' , 'cwp_gimg_gsearch_admin_init');



 /* Enqueue style and script*/
function cwp_gimg_gsearch_load() {
	
	$data = array('path' => plugins_url( 'inc/gsearch_ajax.php' , __FILE__ ));
	
	wp_enqueue_script( 'cwp_gimg_gsearch-media-view');
	wp_localize_script ('cwp_gimg_gsearch-media-view', 'path_var', $data);
	wp_enqueue_style( 'cwp_gimg_gsearch_style' );
}
add_action( 'load-post.php' , 'cwp_gimg_gsearch_load');
add_action( 'load-post-new.php' , 'cwp_gimg_gsearch_load');

add_action( 'wp_ajax_cwp_gimg_get_images', 'cwp_gimg_get_images' );

/* Set default tab 'Upload Files'*/
add_action( 'admin_footer-post-new.php', 'cwp_gimg_media_default' );
add_action( 'admin_footer-post.php', 'cwp_gimg_media_default' );
function cwp_gimg_media_default()
{
?>
	<script type="text/javascript">
	 var ajax_url = "<?php echo admin_url('admin-ajax.php'); ?>";
		jQuery(document).ready(function($){
			wp.media.controller.Library.prototype.defaults.contentUserSetting=false;
		});
	</script>
<?php 




} 


function cwp_gimg_get_images() {
	global $wpdb; // this is how you get access to the database


	$search_input = $_POST['q'];
	$index = $_POST['start'];
	$key='AIzaSyDWSsGSlg5SsIx8Yd3i-t2LsHlnInsrZkQ';
	$search_e_id='011702104363087577801:cpgquustv30';
	$content = file_get_contents('https://www.googleapis.com/customsearch/v1?key='.$key.'&cx='.$search_e_id.'&q='.$search_input.'&start='.$index);
	$obj = json_decode($content);
	
	if(!empty($obj->items)){
		foreach($obj->items as $iterator){
			if ( !empty($iterator->pagemap->cse_thumbnail[0]->src)):
				echo '<img src="'.$iterator->pagemap->cse_thumbnail[0]->src.'" />';
			endif;	
		}
	}
	
	die(); // this is required to terminate immediately and return a proper response
}


