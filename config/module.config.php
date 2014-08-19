<?php
return array(
    'asset_manager' => array(
        'resolver_configs' => array(
            'paths' => array(
                'ui' => __DIR__ . '/dist',
            ),
        ),
    ),
    'view_manager' => array(
        'template_map' => array(
            'zf/app/app' => __DIR__ . '/../view/zf-apigility-ui.phtml',
        ),
    ),
);
