<?php
namespace Digi\Dashboard\Http\Controllers;
use Illuminate\Http\Request;
use Spatie\Valuestore\Valuestore;
use Illuminate\Routing\Controller;
use App\Reminder;
use App\Setting;
use Validator;
use Response;
use Mail;
class ReminderController extends Controller
{
    /** @var string */
 
    public function __construct(string $settingsPath = null)
    {
    }

    public function read(Request $request,$pageNum=1,$limit=10)
    {
        // $data = Newsletter::get()->toArray();
        $offset = 0;
        if($pageNum > 1){
            $offset = ($pageNum-1)*$limit;
        }
         
         $data = Reminder::offset($offset)->limit($limit)->get();
         $total_record = Reminder::get()->count();
        //$settingConfig = config('settings.panels');
         if($total_record > $limit){
            $page = ceil($total_record/$limit);
         }else{
            $page = 1;
         }
         return response()->json([
            'total_record' => $total_record,
            'total_page' => $page,
            'data' => $data,
         ]);
    }

    public function getdata(Request $request,$id)
    {
         $data = Reminder::find($id)->toArray();
        //$settingConfig = config('settings.panels');
         return response()->json([
            'data' => $data,
         ]);
    }


    public function search(Request $request)
    {

         $dataa = $request->all();

         $offset = 0;
        $limit = 10;

         $keyword = isset($dataa['keyword'])?$dataa['keyword']:'';
        if($keyword){
              $data = Reminder::where('phone', 'LIKE', '%' . $keyword . '%')->get();
              $total_record = Reminder::where('phone', 'LIKE', '%' . $keyword . '%')->count();
                if($total_record > $limit){
                    $page = ceil($total_record/$limit);
                }else{
                    $page = 1;
                }
         }else{

              $data = Newsletter::offset($offset)->limit($limit)->get();
                $total_record = Newsletter::get()->count();
                if($total_record > $limit){
                    $page = ceil($total_record/$limit);
                }else{
                    $page = 1;
                }
        
          }
           return response()->json([
            'total_record' => $total_record,
            'total_page' => $page,
            'data' => $data,
         ]);
    }

    public function getSubscriber(Request $request)
    {
         $subscribers = Subscriber::where(['status'=> 1])->select(['email'])->get();
         $newsletter = Newsletter::where(['status'=> 1])->select(['id','title'])->get();
        //$settingConfig = config('settings.panels');
         return response()->json([
            'subscribers' => $subscribers,
            'newsletter' => $newsletter,
         ]);
    }

    public function uploadImage(Request $request){

         $file = $request->file('image');
        
        if(!empty($file)){
  
            // Display File Name
            $file_name = $file->getClientOriginalName();

            //Display File Extension
            $ext = $file->getClientOriginalExtension();

            //Display File Real Path
            $path = $file->getRealPath();
            //Display File Size
            list($width, $height)   = getimagesize($path);
            $mime_size = $file->getMimeType();
            $destinationPath = '/uploads';
            $filename = time().'.'.$ext;
            $file->move(public_path('uploads'),$filename);
            $Image = $filename;
    }

        return Response::json($Image, 200);;
         
    }

    public function create(Request $request)
    {
        // echo '<pre>';
        //  print_r($request->all());
        // die;
   
            $messsages = array(
                'data.phone.required'=>'Please enter phone number',
                'data.appointment_date.required'=>'Please select Appointment Date',
                'data.appointment_time.required'=>'Please select Appointment Time',
            );
            $request->validate([
                'data.phone' => 'required',
                'data.appointment_date' => 'required',
                'data.appointment_time' => 'required',
            ],$messsages);

                $data = $request->data;

                 if(!empty($data)){

                    $reminder = new Reminder();
                    $ap_date = $data['appointment_date'];
                    $ap_time = $data['appointment_time'];
                    $before_hours = $this->getReminderHours();
                    $ap_date = new \Carbon\Carbon($ap_date);
                    $reminder_date = $ap_date->addHours($before_hours);
                    $reminder_time = $ap_time;

                    $reminder->phone = isset($data['phone'])?$data['phone']:'';
                    $reminder->reminder_date = $reminder_date;
                    $reminder->reminder_time = $reminder_time;
                   // $newsletter->slug = $this->createSlug(isset($data['title'])?str_slug($data['title']):'');
                    $reminder->appointment_date = isset($data['appointment_date'])?$data['appointment_date']:'';
                    $reminder->appointment_time = isset($data['appointment_time'])?$data['appointment_time']:'';
                    if($reminder->save()){
                            $status =1;
                            $message = 'Reminder Created succesfully';
                        }else{

                             $status =0;
                             $message = 'Something went wrong';
                        }
                        
                 }else{
                    $status =0;
                    $message = 'data not found';
                 }

        return response()->json([
            'data' => $data,
            'status' =>$status,
            'message' => $message
         ]);

     }

    public function update(Request $request)
    {
   // echo '<pre>';
   //      print_r($request->all());
   //      die;
        //$settings = Valuestore::make($this->settingsPath);
      //   $requestd =  $request-;
        //  $request->validate([
        //    '*.name'=>'required',
        // ]); 
                // $validator = Validator::make($request->all(), [
                //     'data.*.name' => 'required',
                // ]);
            $messsages = array(
                'data.phone.required'=>'Please enter phone number',
                'data.appointment_date.required'=>'Please select Appointment Date',
                'data.appointment_time.required'=>'Please select Appointment Time',
            );
            $request->validate([
                'data.phone' => 'required',
                'data.appointment_date' => 'required',
                'data.appointment_time' => 'required',
            ],$messsages);

                // if($validator->fails()){
                //     $errors = $validator->errors();
                //     return response()->json([
                //     'errors' => $errors,
                //     'message' => 'Something went wrong'
                //  ]);
                // }
                $data = $request->data;

                $newsletter = new Reminder();
                     $id = $data['id'];
                    $dataa = Reminder::find($id)->get()->toArray();
                    $ap_date = $data['appointment_date'];
                    $ap_time = $data['appointment_time'];
                    $before_hours = $this->getReminderHours();
                    $ap_date = new \Carbon\Carbon($ap_date);
                    $reminder_date = $ap_date->addHours($before_hours);
                    $reminder_time = $ap_time;

                 if(!empty($dataa)){
                        $update = Reminder::where(['id'=> $id])->update(array(
                        'phone'     =>  isset($data['phone'])?$data['phone']:'',
                        //'slug'      =>  isset($data->slug)?$data->slug:'',
                        'reminder_date'   =>  $reminder_date,
                        'reminder_time'   =>  $reminder_time,
                        'appointment_date'   =>  isset($data['appointment_date'])?$data['appointment_date']:'',
                        'appointment_time'    =>  isset($data['appointment_time'])?$data['appointment_time']:''
                    ));
                        if($update){
                            $data = Reminder::find($id)->get();
                            $data = $data[0];
                            $status =1;
                            $message = 'Reminder updated succesfully';
                        }else{

                             $status =0;
                             $message = 'Something went wrong';
                        }
                        
                 }else{
                    $status =0;
                    $message = 'data not found';
                 }

        return response()->json([
            'data' => $data,
            'status' =>$status,
            'message' => $message
         ]);

     }

     private function getReminderHours(){
         
             $setting = Setting::where(['key'=> 'before_hours'])->select(['value'])->get();
             return isset($setting[0]->value)?$setting[0]->value:24;
     }

      public function send(Request $request)
    {   
            $messsages = array(
                'data.subscriber.required'=>'Please select Subscriber',
                'data.newsletter.required'=>'Please select newsletter',
                );
            $request->validate([
                'data.subscriber' => 'required',
                'data.newsletter' => 'required',
            ],$messsages);

         $data = $request->data;

         if(!empty($data)){

            $subscribers = $data['subscriber'];
            $newsletter_id = $data['newsletter'];

            $newsletter = Newsletter::where(['id'=> $newsletter_id])->select(['id','title','content'])->get()->toArray();
            $newsletter = $newsletter[0];
            
            if($subscribers == 'all'){
                 $subscribers = Subscriber::where(['status'=> 1])->select(['email'])->get()->toArray();
                 foreach ($subscribers as $key => $subscriber) {
                    $email = $subscriber->email;

                    try {
                            Mail::send(['html' => $newsletter['content']],
                            function ($message) use ($email,$newsletter) {
                            $message->to($email)
                            ->from('test@mailinartor.com') //not sure why I have to add this
                            ->subject($newsletter['title']);
                            });

                        //return Response::json(['code' => 200, 'msg' => 'Sent successfully']);
                        $status = 1;
                        $message = "Newsletter sent succesfully";
                    } catch (Exception $ex) {
                        return Response::json(['code' => 200, 'msg' => 'Something went wrong, please try later.']);
                    }  
                 }
                 
            }else{

                $email = $subscribers;
                try {
                            Mail::send(['html' => $newsletter['content']],
                            function ($message) use ($email,$newsletter) {
                            $message->to($email)
                            ->from('test@mailinartor.com') //not sure why I have to add this
                            ->subject($newsletter['title']);
                            });

                        //return Response::json(['code' => 200, 'msg' => 'Sent successfully']);
                        $status = 1;
                        $message = "Newsletter sent succesfully";
                    } catch (Exception $ex) {
                        return Response::json(['status' => 0, 'message' => 'Something went wrong, please try later.']);
                    } 
            }
            
         }
         
         return response()->json([
            'status' => $status,
            'message' => $message,
         ]);
    }

     public function createSlug($title,$id =0){

        // Normalize the title
        $slug = str_slug($title);
        // Get any that could possibly be related.
        // This cuts the queries down by doing it once.
        $allSlugs = $this->getRelatedSlugs($slug, $id);
        // If we haven't used it before then we are all good.
        if (! $allSlugs->contains('slug', $slug)){
            return $slug;
        }
        // Just append numbers like a savage until we find not used.
        for ($i = 1; $i <= 10; $i++) {
            $newSlug = $slug.'-'.$i;
            if (! $allSlugs->contains('slug', $newSlug)) {
                return $newSlug;
            }
        }
        throw new \Exception('Can not create a unique slug');

     }

     protected function getRelatedSlugs($slug, $id = 0)
    {
        return Newsletter::select('slug')->where('slug', 'like', $slug.'%')
            ->where('id', '<>', $id)
            ->get();
    }


    // Delete Record

    public function delete(Request $request){


        $data = $request->all();
        $id = isset($data['id'])?$data['id']:'';
        if($id){

            $reminder = Reminder::find($id);

            if($reminder->delete()){
                $data = Reminder::get()->toArray();
                $status = 1;
                $message = "Reminder Deleted succesfully";

            }else{

                $status = 0;
                $message = "Something went wrong";
            }

        }else{

            $status = 0;
            $message = "Please Provide id";

        }

        return response()->json([
            'data' => $data,
            'status' =>$status,
            'message' => $message
         ]);
    }
}
