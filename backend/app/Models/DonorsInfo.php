<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonorsInfo extends Model
{
    use HasFactory;

    protected $fillable=[
        'donor_id',
        'description'
    ];
    
    public function donor(){
        return $this->belongsTo(User::class,'donor_id');
    }
}
