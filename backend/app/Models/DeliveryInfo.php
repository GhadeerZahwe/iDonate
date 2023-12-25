<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryInfo extends Model
{
    use HasFactory;
    protected $table = 'delivery_info';

    protected $fillable=[
        'delivery_id',
        'is_approved',
        'license_number',
        'profile_image',
        'mobility_type'
    ];

    public function delivery(){
        return $this->belongsTo(User::class,'delivery_id');
    }
}
