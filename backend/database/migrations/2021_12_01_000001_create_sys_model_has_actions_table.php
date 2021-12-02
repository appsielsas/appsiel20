<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSysModelHasActionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sys_model_has_actions', function(Blueprint $table)
		{
            $table->id();
			$table->foreignId('model_id')
					->constrained('sys_models')
					->onUpdate('restrict')
					->onDelete('restrict');
			$table->foreignId('action_id')
					->constrained('sys_actions')
					->onUpdate('restrict')
					->onDelete('restrict');
			$table->integer('position')->unsigned();
			$table->unique(['model_id','action_id']);
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
		Schema::drop('sys_model_has_actions');
	}

}
