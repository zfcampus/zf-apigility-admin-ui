#!/usr/bin/env php
<?php
/**
 * Enable development or production usage
 *
 * Usage: ui-mode.php --dev|--production
 */

use Zend\Console\Exception\RuntimeException;
use Zend\Console\Getopt;

chdir(__DIR__ . '/../');
require_once 'vendor/autoload.php';
$viewfile   = './view/zf-apigility-ui.phtml';
$configfile = './config/module.config.php';

$opts = new Getopt(array(
    'help|h'       => 'This usage message',
    'dev|d'        => 'Enable Development mode (use src UI)',
    'production|p' => 'Enable Production mode (use dist UI)',
));

try {
    $opts->parse();
} catch (RuntimeException $e) {
    echo $e->getUsageMessage();
    exit(1);
}

if (isset($opts->h)) {
    echo $opts->getUsageMessage();
    exit(0);
}

if ((! isset($opts->d) && ! isset($opts->p))
    || (isset($opts->d) && isset($opts->p))
) {
    echo "Please select one of EITHER --dev OR --production.\n";
    echo $opts->getUsageMessage();
    exit(1);
}

if (isset($opts->d)) {
    echo "Enabling development mode\n";
    $from = 'dist';
    $to   = 'src';
} else {
    echo "Enabling production mode\n";
    $from = 'src';
    $to   = 'dist';
}

updateFile($configfile, $from, $to);
updateFile($viewfile, $from, $to);

echo "Done!\n";

function updateFile($file, $from, $to)
{
    echo "    Updating $file\n";

    $content     = file_get_contents($file);
    $pattern     = '#/(' . $from . ')/#';
    $replacement = '/' . $to . '/';
    $content     = preg_replace($pattern, $replacement, $content);

    if (! empty($content)) {
      file_put_contents($file, $content);
    }
}
