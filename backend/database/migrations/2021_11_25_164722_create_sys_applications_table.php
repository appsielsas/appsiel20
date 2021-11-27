<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSysApplicationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_applications', function(Blueprint $table)
		{
            $table->id();
			$table->string('label');
			$table->string('name')->unique();
			$table->enum('scope', array('GESTIÓN EDUCATIVA','GESTIÓN EMPRESARIAL','GESTIÓN INMOBILIARIA','GESTIÓN SALUD','CORE'));
			$table->text('definition');
			$table->smallInteger('position');
			$table->string('url_image');
			$table->string('state');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('sys_applications');
	}

}
