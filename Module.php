<?php
/**
 * @link      http://github.com/zfcampus/zf-apigility-admin-ui for the canonical source repository
 * @copyright Copyright (c) 2013-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace ZF\Apigility\Admin\Ui;

class Module
{
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }
}
