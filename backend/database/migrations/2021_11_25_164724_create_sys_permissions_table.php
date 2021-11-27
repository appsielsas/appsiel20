<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSysPermissionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_permissions', function(Blueprint $table)
		{
            $table->id();
			$table->foreignId('application_id')
					->constrained('sys_applications')
					->onUpdate('restrict')
					->onDelete('restrict');
			$table->foreignId('model_id')
					->nullable()
					->constrained('sys_models')
					->onUpdate('restrict')
					->onDelete('restrict');
			$table->string('name')->unique();
			$table->string('label');
			$table->string('url');
			$table->integer('parent')->unsigned();
			$table->smallInteger('position')->default(0);
			$table->boolean('visible')->default(1);
			$table->string('fa_icon');
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
		Schema::drop('sys_permissions');
	}

}
