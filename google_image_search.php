<?php
/**
 * Plugin Name: Google Image Search
 */
 
function gsearch_admin_init() {

	wp_register_script( 'gsearch-media-view' , plugins_url( 'js/media-view.js' , __FILE__ ) , array('media-editor') , '0.0.1' );
	wp_register_style( 'gsearch-style' , plugins_url( 'css/gsearch.css' , __FILE__ ) , array( ) , '0.0.1' );
}
add_action( 'admin_init' , 'gsearch_admin_init');


function gsearch_load() {
	wp_enqueue_script( 'gsearch-media-view');
	$data = array(
    'path'            => plugins_url( 'inc/gsearch_ajax.php' , __FILE__ )
   );
	wp_localize_script ('gsearch-media-view', 'path_var', $data);
	wp_enqueue_style( 'gsearch-style' );
}
add_action( 'load-post.php' , 'gsearch_load');
add_action( 'load-post-new.php' , 'gsearch_load');

add_action( 'admin_footer-post-new.php', 'idealien_mediaDefault_script' );
add_action( 'admin_footer-post.php', 'idealien_mediaDefault_script' );

function idealien_mediaDefault_script()
{
    ?>
<script type="text/javascript">
jQuery(document).ready(function($){
wp.media.controller.Library.prototype.defaults.contentUserSetting=false;
});
</script>
<?php } 
?>


