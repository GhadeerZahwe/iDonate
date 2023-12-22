<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryInfo extends Model
{
    use HasFactory;
    protected $fillable=[
        'delivery_id',
        'is_approved',
        'license_number',
        'profile_image'
    ];
}
