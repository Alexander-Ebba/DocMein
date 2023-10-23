<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;
    protected $table = 'medicine';
    protected $fillable = [
        'name',
        'manufacturer',
        'description',
        'dosagestr',
        'dosage_form',
        'prescription',
        'quantity',
        'expiry_date',
        'price',
        'storage_requirement',
        'medicine_category',
        'creationdate',
        'notes',
        'availability',
    ];
}
