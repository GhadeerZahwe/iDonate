<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('donor_id');
            $table->foreign('donor_id')->references('id')->on('users')->where('user_type','donor');

            $table->unsignedBigInteger('delivery_id')->nullable();
            $table->foreign('delivery_id')->references('id')->on('users')->where('user_type','delivery')->onDelete('set null');
            
            $table->enum('status',['pending','received','on_the_way','delivered'])->default('pending');
            $table->text('description');
            $table->float('total_weight',8,2);
            $table->string('pickup_within');
            $table->dateTime('pickup_time');
            $table->string('location_pickup');

            $table->unsignedBigInteger('location_id');
            $table->foreign('location_id')->references('id')->on('location');
         
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
