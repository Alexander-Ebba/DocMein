<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;
use Illuminate\Support\Facades\Validator;

class PatientController extends Controller
{


    public function index() {
        $patient = Patient::all();
        return response()->json([
            'status' =>200,
            'patient' => $patient,
        ]);
    }

    public function edit($id){
        $patient = Patient::find($id);
        if($patient)
        {
            return response()->json([
                'status' => 200,
                'patient' => $patient
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Patient Id has been Found'
            ]);
        }
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_name' => 'required|max:191',
            'patient_date' => 'required|max:191',
            'patient_gender' => 'required|max:191',
            'patient_contact' => 'required|max:191',
            'height' => 'required|max:191',
            'weight' => 'required|max:191',
            'blood_pressure' => 'required|max:191',
            'blood_pressure_two' => 'required|max:191',
            'pulse_rate' => 'required|max:191',
            'temperature' => 'required|max:191',
            'emergency_name' => 'required|max:191',
            'emergency_phone' => 'required|max:191',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $patient = new Patient;
            $patient->patient_name = $request->input('patient_name');
            $patient->patient_date = $request->input('patient_date');
            $patient->patient_gender = $request->input('patient_gender');
            $patient->patient_contact = $request->input('patient_contact');
            $patient->medical_condition = $request->input('medical_condition');
            $patient->allergies = $request->input('allergies');
            $patient->medications = $request->input('medications');
            $patient->surgery = $request->input('surgery');
            $patient->height = $request->input('height');
            $patient->weight = $request->input('weight');
            $patient->blood_pressure = $request->input('blood_pressure');
            $patient->blood_pressure_two = $request->input('blood_pressure_two');
            $patient->pulse_rate = $request->input('pulse_rate');
            $patient->temperature = $request->input('temperature');
            $patient->emergency_name = $request->input('emergency_name');
            $patient->emergency_phone = $request->input('emergency_phone');
            $patient->save();
            return response()->json([
                'status'=>200,
                'message'=>'Patient Added Successfully',
            ]);
        }
    }


    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'patient_name' => 'required|max:191',
            'patient_date' => 'required|max:191',
            'patient_gender' => 'required|max:191',
            'patient_contact' => 'required|max:191',
            'height' => 'required|max:191',
            'weight' => 'required|max:191',
            'blood_pressure' => 'required|max:191',
            'blood_pressure_two' => 'required|max:191',
            'pulse_rate' => 'required|max:191',
            'temperature' => 'required|max:191',
            'emergency_name' => 'required|max:191',
            'emergency_phone' => 'required|max:191',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $patient = Patient::find($id);
            if($id) {
                $patient->patient_name = $request->input('patient_name');
                $patient->patient_date = $request->input('patient_date');
                $patient->patient_gender = $request->input('patient_gender');
                $patient->patient_contact = $request->input('patient_contact');
                $patient->medical_condition = $request->input('medical_condition');
                $patient->allergies = $request->input('allergies');
                $patient->medications = $request->input('medications');
                $patient->surgery = $request->input('surgery');
                $patient->height = $request->input('height');
                $patient->weight = $request->input('weight');
                $patient->blood_pressure = $request->input('blood_pressure');
                $patient->blood_pressure_two = $request->input('blood_pressure_two');
                $patient->pulse_rate = $request->input('pulse_rate');
                $patient->temperature = $request->input('temperature');
                $patient->emergency_name = $request->input('emergency_name');
                $patient->emergency_phone = $request->input('emergency_phone');
                $patient->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Patient Updated Successfully',
                ]);
            }
            else 
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'No Patient Id has been found !',
                ]);
            }
        }
    }

    public function destroy($id)
            {
                $patient = Patient::find($id);
                if($patient)
                {
                    $patient->delete();
                    return response()->json([
                        'status'=>200,
                        'message'=>'Patient Profile Deleted Successfully!',
                    ]); 
                }
                else 
                {
                    return response()->json([
                        'status'=>404,
                        'message'=>'No Patient Id has been found !',
                    ]);
                }
            }
}
