<template>
    <div class="relative">
        <div v-if="loading" class="rounded-lg flex items-center justify-center absolute pin z-50 bg-40 -m-4">
            <loader class="text-60" />
        </div>

        <div>
        <heading class="mb-6">Edit Reminder</heading>
                <div class="card">
                    <form @submit.prevent="update">
                        <div>
                            <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2">Phone Number</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-3/4 px-8 py-6">
                                    <input v-model="data.phone" name="phone" placeholder="Phone" type="text" class="w-full form-control form-input form-input-bordered">
                                    <div v-if="errors['data.phone']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.phone'][0] }}
                                    </div> 
                                </div>
                            </div>

                            <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2">Date of Appointment</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-3/4 px-8 py-6">
                                    <input v-model="data.appointment_date" name="appointment_date" placeholder="Appointment Date" type="date" class="w-full form-control form-input form-input-bordered">
                                    <div v-if="errors['data.appointment_date']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.appointment_date'][0] }}
                                    </div> 
                                </div>
                            </div>

                            <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2">Time of Appointment</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-3/4 px-8 py-6">
                                    <input v-model="data.appointment_time" name="appointment_time" placeholder="Appointment Time" type="time" class="w-full form-control form-input form-input-bordered">
                                    <div v-if="errors['data.appointment_time']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.appointment_time'][0] }}
                                    </div> 
                                </div>
                            </div>
                          <!--   <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2">Slug</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-3/4 px-8 py-6">
                                    <input v-model="data.slug" placeholder="Slug" type="text" class="w-full form-control form-input form-input-bordered" readonly>
                                    <div v-if="errors['data.slug']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.slug'][0] }}
                                    </div> 
                                </div>
                            </div> -->
                            <!--div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2" for="Version">Subscriber</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-1/4 px-8 py-6">
                                    <select class="w-full form-control form-input form-input-bordered">
                                        <option>-Select Subscriber-</option>
                                        <option value="all">All</option>
                                        <option value="anuj@mailinator.com">anuj@mailinator.com</option>
                                    </select>
                                </div>
                            </div-->
<!-- 
                            <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2" for="Content">Content</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-full px-8 py-6 ckeditor">
                                    <!--textarea v-model="data.content" class="w-full form-control form-input form-input-bordered" id="Content">
                                    </textarea-->
                                    <!-- <vue-ckeditor v-model="data.content" :config="config"  />
                                </div>
                            </div> -->

                           <!--  <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2" for="Version">Status</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-1/4 px-8 py-6">
                                    <select v-model="data.status" class="w-full form-control form-input form-input-bordered">
                                        <option value="1">Publish</option>
                                        <option value="0">Unpublish</option>
                                    </select>
                                </div>
                            </div> -->

                        </div>
                        <div class="bg-30 flex px-8 py-4">
                            <button type="submit" class="ml-auto btn btn-default btn-primary mr-3">
                                Update Reminder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>

const setting = {
    name: null,
    version: null
}

const social_profile = {
    facebook_url: null,
 }

import VueCkeditor from 'vue-ckeditor2';

export default {
    components: { VueCkeditor },
    data: () => ({
        loading: true,
        data: {},
        errors: [],
        file:'',
        config: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript',
          'Undo','Redo','NumberedList','BulletedList','Cut','Copy','Paste'],
        ],
        height: 300
      }
     }),

    mounted() {
        const vm = this
           vm.loadData()
    },

    methods: {
       
        saveAndReload(groupName) {
            this.saving = groupName

            let settingsToUpdate = {}

            let keys = this.settingConfig
                .filter(g => g.name == groupName)[0].settings
                .map(settingItem => settingItem.key)

            keys.forEach(key => {
                settingsToUpdate[key] = this.settings[key]
            })

            Nova.request().post('/nova-vendor/setting', { settings: settingsToUpdate })
                .then((response) => {
                    if (response.status == 202) {
                        this.saving = ''
                        this.$toasted.show('Settings saved!', { type: 'success' })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    this.saving = ''
                })
        },
        loadData() {
            Nova.request().get("/nova-vendor/dashboard/getdata/"+this.$route.params.id)
                .then(response => {
                    this.data = response.data.data
                    setTimeout(() => { this.loading = false }, 200)   
                })
                .catch(() => this.error = true)
        },
        update() {
                this.loading = true 
                this.errors = [];
                this.data.id =this.$route.params.id
                Nova.request().put("/nova-vendor/dashboard",{data:this.data})
                .then(response => {
                    this.data = response.data.data
                    setTimeout(() => { this.loading = false }, 200)
                    if(response.data.status == 1){
                        this.$toasted.success(response.data.message, {
                        duration : 3000,
                         onComplete : () => this.$router.push('/dashboard')
                    })

                    }else{
                        setTimeout(() => { this.loading = false }, 200)
                        this.$toasted.error(response.data.message, {
                        duration : 3000,
                         //onComplete : () => window.location.reload(true)
                    })

                    }
                    
                })
                .catch((error) => {
                    console.log(error.response.data.errors)
                     this.errors = error.response.data.errors;
                     setTimeout(() => { this.loading = false }, 200)
                 })
        },
         /*
        Handles a change on the file upload
      */
      handleFileUpload(){
       // console.log(this.$refs.file.files)
        this.file = this.$refs.file.files[0];
         this.loading = true;
            const fd = new FormData();
             fd.append('image',this.file,this.file.name)
                Nova.request().post("/nova-vendor/setting/uploadImage",fd)
                .then(response => {
                    this.app.logo = response.data;
                    setTimeout(() => { this.loading = false }, 200)
                    this.$toasted.success(response.data.message, {
                        duration : 3000,
                        // onComplete : () => window.location.reload(true)
                    })
                })
                .catch((error) => {
                    //console.log(error.response.data.errors)
                     this.errors = error.response.data.errors;
                     setTimeout(() => { this.loading = false }, 200)
                    // console.log(this.errors['data.app.name'])
                })
              // setTimeout(() => { this.loading = false }, 200)

      },
    }
}
</script>
