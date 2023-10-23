<?php
    namespace App\Http\Controllers\API; // This should be the very first statement in the file

    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use App\Models\Event;
    use Illuminate\Support\Carbon;


    class EventController extends Controller
    {
            
        public function index()
        {
            return Event::all();
        }

        public function store(Request $request)
        {
            $data = $request->all();

            // Convert the start and end values to MySQL datetime format
            $data['start'] = Carbon::parse($data['start'])->format('Y-m-d H:i:s');
            $data['end'] = Carbon::parse($data['end'])->format('Y-m-d H:i:s');

            // Create and save the event
            return Event::create($data);
        }


        public function update(Request $request, $id)
        {
            $event = Event::find($id);

            // Format the start and end dates using Carbon
            $event->start = Carbon::parse($request->start)->format('Y-m-d H:i:s');
            $event->end = Carbon::parse($request->end)->format('Y-m-d H:i:s');

            $event->allDay = $request->allDay;

            $event->update();

            return $event;
        }

        public function destroy($id)
        {
            Event::destroy($id);
            return response(['message' => 'Event deleted']);
        }
    }
