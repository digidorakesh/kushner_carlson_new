<?php
namespace Digi\Setting\Http\Controllers;
use Illuminate\Http\Request;
use Spatie\Valuestore\Valuestore;
use Illuminate\Routing\Controller;
use App\Setting;
use Validator;
use Response;
class SettingController extends Controller
{
    /** @var string */
    protected $settingsPath;

    public function __construct(string $settingsPath = null)
    {
        $this->settingsPath = $settingsPath ?? storage_path(config('settings.path', 'app/settings.json'));
    }

    public function read(Request $request)
    {
        //$settings = Valuestore::make($this->settingsPath)->all();
        $setting_data = Setting::get()->toArray();
        //$settingConfig = config('settings.panels');
        $settings = array();
         foreach ($setting_data as $object) {
                
                 $settings[$object['panel']][$object['key']] = $object['value'];
                
            }
        
         

        return response()->json([
            'setting' => $settings,
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

    public function write(Request $request)
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
            'data.app.sms_message.required'=>'You cant leave Name field empty',
            'data.app.before_hours.required'=>'You cant leave this field empty',
            'data.app.before_hours.integer'=>'Please enter only integer number',
            'data.app.before_hours.min'=>'Please enter only integer number',
            );
            $request->validate([
                'data.app.sms_messgae' => 'required',
                'data.app.before_hours' => 'required|integer|min:0',
            ],$messsages);

                // if($validator->fails()){
                //     $errors = $validator->errors();
                //     return response()->json([
                //     'errors' => $errors,
                //     'message' => 'Something went wrong'
                //  ]);
                // }


                    $settings = new setting();
        foreach ($request->data as $panel => $dataa) {

            foreach ($dataa as $key => $value) {
                 $data = setting::where(['panel'=> $panel,'key' => $key])->get()->toArray();
                 if(!empty($data)){
                    $update = setting::where(['panel'=> $panel,'key' => $key])->update(array(
                    'key'    =>  $key,
                    'value'    =>  $value,
                    'status'    =>  1
                    ));
                 }else{

                    $setting  = new setting;  
                    $setting->key = $key;
                    $setting->value = $value;
                    $setting->panel = $panel;
                    $setting->status = 1;
                    $setting->save();
 
                 }   
               

            }

            //$settings->put($setting, $value);
        }

        $setting_data = Setting::get()->toArray();
        $settings = array();
         foreach ($setting_data as $object) {
                
                 $settings[$object['panel']][$object['key']] = $object['value'];
                
            }

        return response()->json([
            'setting' => $settings,
            'message' => 'Global settings successfully updated'
         ]);

     }
}
