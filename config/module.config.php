<?php
return array(
    'asset_manager' => array(
        'resolver_configs' => array(
            'paths' => array(
                __DIR__ . '/../dist/',
            ),
        ),
    ),
    'view_manager' => array(
        'template_map' => array(
            'zf-apigility-ui' => __DIR__ . '/../view/zf-apigility-ui.phtml',
        ),
    ),
);
