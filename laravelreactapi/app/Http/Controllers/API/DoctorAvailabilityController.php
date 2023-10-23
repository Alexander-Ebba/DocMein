<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DoctorAvailability;
use Illuminate\Support\Facades\Validator;



class DoctorAvailabilityController extends Controller
{

    public function index() {
        $availability = DoctorAvailability::all();
        return response()->json([
            'status' => 200, 
            'availability' => $availability,
        ]);
    }

    public function edit($id) {

        $availability = DoctorAvailability::find($id);
        
        if($availability) {
            return response()->json([
                'status'=>200,
                'availability' => $availability,
            ]);
        }
        else {
            return response()->json([
                'status'=> 404,
                'message' => "No Availability Id Found "
            ]);
        }
    }


    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            // 'day' => 'required|unique:doctor_availabilities',
            'start_time' => 'required',
            'end_time' => 'required',
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
            $availability = new DoctorAvailability;
            // $availability->day = $request->input('day');
            $availability->start_time = $request->input('start_time');
            $availability->end_time = $request->input('end_time');
            $availability->save();
            return response()->json([
                'status' => 200,
                'message' => 'Availability Added Successfully'
            ]);
        }
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            // 'day' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
                'message'=> 'this is not working brother'
            ]);
        }
        else 
        {
            $availability = DoctorAvailability::find($id);
            if($availability) {
                // $availability->day = $request->input('day');
                $availability->start_time = $request->input('start_time');
                $availability->end_time = $request->input('end_time');
                $availability->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Availability Added Successfully'
                ]);
            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Availability ID Found !'
                ]);
            }
            
        }
    }

    public function destroy($id) 
    {
        $availability = DoctorAvailability::find($id);
        if($availability)
        {   
            $availability->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Availability Deleted Successfully'
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Availability ID Found !'
            ]);
        }
    }


    // public function getAvailabilityByDay($day)
    // {
    //     $availability = DoctorAvailability::where('day', $day)->first();

    //     if ($availability) {
    //         // If availability data is found for the specified day, retrieve start_time and end_time
    //         $start_time = $availability->start_time;
    //         $end_time = $availability->end_time;
    //         // You can also include the availability data itself if needed
    //         $availabilityData = $availability;
    //         $status = 200;
    //         $message = 'Data retrieved successfully!';
    //     } else {
    //         // Handle the case when availability data is not found for the specified day
    //         $start_time = '';
    //         $end_time = '';
    //         $availabilityData = '';
    //         $status = 404; // Or any appropriate status code for "Not Found"
    //         $message = 'Data not found for the specified day.';
    //     }

    //     return response()->json([
    //         'status' => $status,
    //         'message' => $message,
    //         'start_time' => $start_time,
    //         'end_time' => $end_time,
    //         'availabilityData' => $availabilityData, // Include the availability data if needed
    //     ]);
    // }




}
