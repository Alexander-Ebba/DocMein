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
        Schema::create('patient', function (Blueprint $table) {
            $table->id();
            $table->string('patient_name');
            $table->date('patient_date');
            $table->string('patient_gender');
            $table->string('patient_contact');
            $table->string('medical_condition')->nullable();
            $table->string('allergies')->nullable();
            $table->string('medications')->nullable();
            $table->string('surgery')->nullable();
            $table->integer('height');
            $table->integer('weight');
            $table->integer('blood_pressure');
            $table->integer('blood_pressure_two');
            $table->integer('pulse_rate');
            $table->integer('temperature');
            $table->string('emergency_name');
            $table->string('emergency_phone');
            $table->timestamps();
        });
    }

    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient');
    }
};
