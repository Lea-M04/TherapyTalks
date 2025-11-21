<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
        use HasFactory;


        protected $table = 'patients';
        protected $primaryKey = 'patientID';
        public $incrementing = true;
        protected $keyType = 'int';


        protected $fillable = [
            'userID',
            'medicalHistory',
            'allergies',
            'emergencyContactName',
            'emergencyContactPhone',
            'insuranceNumber',
            'pseudonym',
        ];


        protected $casts = [
        ];


        public function user()
        {
            return $this->belongsTo(User::class, 'userID', 'userID');
        }
}