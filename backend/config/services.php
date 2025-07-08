<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'newsapi' => [
        'key' => env('NEWSAPI_KEY'),
        'base_url' => 'https://newsapi.org/v2/',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'opennws' => [
        'key' => env('OPENNWS_KEY'),
        'base_url' => 'https://api.opennws.com/v1/', // Placeholder URL
    ],

    'newscred' => [
        'key' => env('NEWSCRED_KEY'),
        'base_url' => 'https://api.newscred.com/v2/', // Placeholder URL
    ],

];
