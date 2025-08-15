<?php

function basetheme_enqueue_scripts()
{
    wp_enqueue_style('basetheme-main-css');
    wp_enqueue_script('basetheme-main-js');
}
add_action('wp_enqueue_scripts', 'basetheme_enqueue_scripts');
