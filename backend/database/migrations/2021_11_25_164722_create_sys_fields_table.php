<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSysFieldsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_fields', function(Blueprint $table)
		{
            $table->id();
			$table->string('label');
			$table->string('type');
			$table->string('name');
			$table->text('options');
			$table->text('value');
			$table->string('attributes');
			$table->text('definition');
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
		Schema::drop('sys_fields');
	}

}
