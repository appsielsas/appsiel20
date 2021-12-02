<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSysActionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_actions', function(Blueprint $table)
		{
            $table->id();
			$table->string('label');
			$table->enum('type', ['create','edit','delete','duplicate','generic']);
			$table->string('method');
			$table->string('prefix');
			$table->string('icon');
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
		Schema::drop('sys_actions');
	}

}
