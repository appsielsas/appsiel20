<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;

use App\Appsiel\System\Menu;
use App\Appsiel\System\Catalogs;

class HomeController extends Controller
{
	public function __construct()
	{
		//$this->middleware('auth');
	}

	public function menu()
	{
		return (new Menu())->menu;
	}

	public function catalogs()
	{
		return (new Catalogs())->catalog;
	}
}
