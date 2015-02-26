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
            'application/index/index' => __DIR__ . '/../view/zf-apigility-ui.phtml',
        ),
    ),
);
