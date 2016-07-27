<?php
/**
 * @link      http://github.com/zfcampus/zf-apigility-admin-ui for the canonical source repository
 * @copyright Copyright (c) 2013-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

return [
    'asset_manager' => [
        'resolver_configs' => [
            'paths' => [
                __DIR__ . '/../dist/',
            ],
        ],
    ],
    'view_manager' => [
        'template_map' => [
            'zf-apigility-ui' => __DIR__ . '/../view/zf-apigility-ui.phtml',
        ],
    ],
];
