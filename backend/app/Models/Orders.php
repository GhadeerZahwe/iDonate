<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $fillable=[
        'donor_id',
        'delivery_id',
        'status',
        'description',
        'total_weight',
        'pickup_within',
        'pickup_time',
        'location_pickup',
        'location_id'
    ]
}
