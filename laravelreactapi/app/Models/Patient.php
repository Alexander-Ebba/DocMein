<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;
    protected $table = 'patient';
    protected $fillable = [
        'patient_name',
        'patient_date',
        'patient_gender',
        'patient_contact',
        'medical_condition',
        'allergies',
        'medications',
        'surgery',
        'height',
        'weight',
        'blood_pressure',
        'blood_pressure_two',
        'pulse_rate',
        'temperature',
        'emergency_name',
        'emergency_phone',
    ];
}
