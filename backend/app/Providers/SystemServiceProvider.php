<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Appsiel\System\Services\CrudServ;

class SystemServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('CrudServ', function ($app) {
            return new CrudServ();
        });
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
    }
}
