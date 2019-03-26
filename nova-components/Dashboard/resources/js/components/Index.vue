<template>
    <div class="relative">
        <div v-if="loading" class="rounded-lg flex items-center justify-center absolute pin z-50 bg-40 -m-4">
            <loader class="text-60" />
        </div>
        <div>
            <heading class="mb-6">Reminders</heading>
            <div class="flex" style="">
                <div class="relative h-9 mb-6 flex-no-shrink">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="search" role="presentation" class="fill-current absolute search-icon-center ml-3 text-70">
                        <path fill-rule="nonzero" d="M14.32 12.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387a8 8 0 1 1 1.414-1.414zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                    </svg>
                    <input v-model="search" v-on:keyup="SearchData" data-testid="search-input" dusk="search" placeholder="Search" type="search" class="appearance-none form-control form-input w-search pl-search">
                </div>
                <div class="w-full flex items-center mb-6">
                    <div class="flex w-full justify-end items-center mx-3"></div> 
                    <div class="flex-no-shrink ml-auto">
                        <a href="reminder/new?viaResource=&amp;viaResourceId=&amp;viaRelationship=" class="btn btn-default btn-primary" dusk="create-button">Add Reminder</a>
                    </div>
                </div>
                <!-- <div class="w-1/4 flex items-center mb-6">
                    <div class="flex w-full justify-end items-center mx-3"></div> 
                    <div class="flex-no-shrink ml-auto">
                        <a href="newsletter/send" class="btn btn-default btn-primary" dusk="create-button">Send Newsletter</a>
                    </div>
                </div> -->
            </div>
            <div class="card relative">
                <div class="py-3 flex items-center border-b border-50">
                    <div class="flex items-center">
                        <div class="px-3">
                            <div class="dropdown relative" dusk="select-all-dropdown">
                                
                            </div>
                        </div>
                    </div> 
                    <div class="flex items-center ml-auto px-3">
                        <div class="dropdown relative" dusk="filter-selector">
                            <a class="dropdown-trigger h-dropdown-trigger flex items-center cursor-pointer select-none bg-30 px-3 border-2 border-30 rounded"></a> 
                        </div> <!---->
                    </div>
                 </div>
                <table cellpadding="0" cellspacing="0" data-testid="resource-table" class="table w-full">
                    <thead>
                        <tr>
                            <th class="w-16"></th>
                             <th class="text-left">
                                <span dusk="sort-id" class="cursor-pointer inline-flex items-center">ID</span>
                            </th>
                            <th class="text-left">Reminder Date</th>
                            <th class="text-left">Reminder Time</th>
                            <th class="text-left">Phone</th>
                            <th class="text-left">Appointment Date</th>
                            <th class="text-left">Appointment Time</th>
                            <th class="text-left"></th>
                          </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in data">
                            <td class="w-16">
                                <div class="flex items-center" data-testid="users-items-0-checkbox" dusk="1-checkbox">
                                    <div tabindex="0" role="checkbox" class="checkbox select-none rounded">
                                        <input type="checkbox" v-model="check" value="item.id"> 
                                        <div class="check">
                                            <!-- <svg v-show="false" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="block"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="checkbox-off"><g id="b-link" fill="#FFF" fill-rule="nonzero"><rect id="b" width="20" height="20" rx="4"></rect></g> <rect id="Rectangle-path" width="19" height="19" x=".5" y=".5" stroke="#CCD4DB" rx="4"></rect></g></g></svg>
                                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="block"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="checkbox-on" fill-rule="nonzero"><g id="b-link" fill="var(--primary)"><rect id="b" width="20" height="20" rx="4"></rect></g> <path id="Shape" fill="#FFF" d="M7.7 9.3c-.23477048-.3130273-.63054226-.46037132-1.01285927-.37708287-.38231702.08328846-.68093514.38190658-.7642236.7642236C5.83962868 10.0694577 5.9869727 10.4652295 6.3 10.7l2 2c.38884351.3811429 1.01115649.3811429 1.4 0l4-4c.3130273-.23477048.4603713-.63054226.3770829-1.01285927-.0832885-.38231702-.3819066-.68093514-.7642236-.7642236C12.9305423 6.83962868 12.5347705 6.9869727 12.3 7.3L9 10.58l-1.3-1.3v.02z"></path></g></g></svg> -->
                                        </div>
                                    </div> 
                                </div>
                            </td>
                            <td>{{index+1}}</td>
                            <td>{{ item.reminder_date }}</td>
                            <td>{{ item.reminder_time }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.appointment_date }}</td>
                            <td>{{ item.appointment_time }}</td>
                            <!-- <td v-if="item.status == 1"><span class="inline-block rounded-full w-2 h-2 bg-success"></span></td> -->
<!--                             <td v-else><span class="inline-block rounded-full w-2 h-2 bg-danger"></span></td>
 -->                            <td class="td-fit text-right pr-6">
                               <!--  <span>
                                    <router-link :to="{ name: 'reminder-detail', params: { id: item.id }}" class="cursor-pointer text-70 hover:text-primary mr-3" > 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 16" aria-labelledby="view" role="presentation" class="fill-current"><path d="M16.56 13.66a8 8 0 0 1-11.32 0L.3 8.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 0 0 8.48 0L19.38 8l-4.24-4.24a6 6 0 0 0-8.48 0L2.4 8l4.25 4.24h.01zM10.9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                                        </svg></router-link>
                                </span>  -->
                                <span>
                                   
                                    <router-link :to="{ name: 'reminder-edit', params: { id: item.id }}" class="cursor-pointer text-70 hover:text-primary mr-3" > 
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="edit" role="presentation" class="fill-current"><path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z"></path>
                                        </svg>
                                    </router-link>
                                </span> 
                                <button data-testid="pages-items-0-delete-button" dusk="1-delete-button" title="Delete" v-on:click="deleteRecord(item.id)" class="appearance-none cursor-pointer text-70 hover:text-primary mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"></path>
                                    </svg>
                                 </button> 
                                 <!----> <div class="v-portal" style="display: none;">
                                </div>
                            </td>
                          </tr>
                          <tr>
                          <td colspan='6'><paginate
                :page-count="page"
                :container-class="pagination"
                :prev-text="prev"
                :next-text="next"
                :click-handler="loadAllData">
              </paginate></td>
                          </tr>
                    </tbody>
                </table>
             

            </div>
      </div>
    </div>
</template>

<script>
export default {
     data: () => ({
        loading: true,
        data: [],
        errors: [],
        pageCount: 0,
        page:1,
        pageNum:0,
        limit:10,
        pagination:'pagination',
        search:''
     }),
    mounted() {
        //
         const vm = this;
         vm.loadAllData()
    },


    methods: {

        loadAllData(pageNum) {
            if(!pageNum){
                pageNum = 1;
            }

                 Nova.request().get("/nova-vendor/dashboard/"+pageNum+"/"+this.limit)
                    .then(response => {
                        this.data = response.data.data
                        this.pageCount = response.data.total_record
                        this.page = response.data.total_page
                        setTimeout(() => { this.loading = false }, 200)   
                    })
                    .catch(() => this.error = true)
        },

        SearchData() {
                 Nova.request().post("/nova-vendor/reminder/search",{keyword:this.search})
                    .then(response => {
                        this.data = response.data.data
                        this.pageCount = response.data.total_record
                        this.page = response.data.total_page
                        setTimeout(() => { this.loading = false }, 200)   
                    })
                    .catch(() => this.error = true)
        },

        deleteRecord(id) {
                this.loading = true 
                this.errors = [];
                Nova.request().post("/nova-vendor/dashboard/delete",{id:id})
                .then(response => {
                     this.data = response.data.data
                    setTimeout(() => { this.loading = false }, 200)
                    if(response.data.status == 1){
                        this.$toasted.success(response.data.message, {
                        duration : 3000,
                         //onComplete : () => this.$router.push('/reminder')
                    })

                    }else{
                        setTimeout(() => { this.loading = false }, 200)
                        this.$toasted.error(response.data.message, {
                        duration : 2000,
                       // onComplete : () => this.$router.push('/reminder')
                    })

                    }
                    
                })
                .catch((error) => {
                    console.log(error.response.data.errors)
                     this.errors = error.response.data.errors;
                     setTimeout(() => { this.loading = false }, 200)
                 })
        },
       
    },
}
</script>

<style>
.pagination{
    float:right;
}
.pagination li {
    float : left;
    padding: 10px;
    list-style: none;
    border: 1px solid var(--50);    
}
.pagination li.active {
    background : var(--primary-dark);  
}
</style>
