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
    ];

    public function donor(){
        return $this->belongsTo(User::class,'donor_id');
    }

    public function delivery(){
        return $this->belongsTo(User::class,'delivery_id');
    }

    public function location(){
        return $this->belongsTo(Location::class, 'location_id');
    }
}
