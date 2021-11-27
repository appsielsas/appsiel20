<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSysModelHasfieldsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_model_has_fields', function(Blueprint $table)
		{
            $table->id();
			$table->foreignId('model_id')
					->constrained('sys_models')
					->onUpdate('restrict')
					->onDelete('restrict');
			$table->foreignId('field_id')
					->constrained('sys_fields')
					->onUpdate('restrict')
					->onDelete('restrict');
			$table->integer('position')->unsigned();
			$table->boolean('required')->default(1);
			$table->boolean('editable')->default(1);
			$table->boolean('unique');
			$table->unique(['model_id','field_id']);
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
		Schema::drop('sys_model_has_fields');
	}

}
