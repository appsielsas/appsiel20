<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoreContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('core_contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tradename'); // Nombre comercial
            $table->integer('identity_number');
            $table->string('address');
            $table->string('phone');
            $table->string('email');
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
        Schema::dropIfExists('core_contacts');
    }
}
