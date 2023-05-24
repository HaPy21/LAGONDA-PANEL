<template>
   <div>
        <Sidebar/>
        <div class="main-content">
        <TopNav/>
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">

            
            <!-- Header -->
            <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Pretitle -->
                    <h6 class="header-pretitle">
                      usuarios
                    </h6>
                    <!-- Title -->
                    <h1 class="header-title">
                      Todos los usuarios
                    </h1>
                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a  class="nav-link active">
                          Todos los usuarios
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/UsuarioPanel/create" class="nav-link">Nuevo Usuario</router-link>
                        
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            
            <!-- Form -->
            
            <div class="tab-content">
                          <div class="tab-pane fade show active" id="contactsListPane" role="tabpanel" aria-labelledby="contactsListTab">
                            <!-- Card -->
                            <div class="card" data-list='{"valueNames": ["item-name", "item-title", "item-email", "item-phone", "item-score", "item-company"], "page": 10, "pagination": {"paginationClass": "list-pagination"}}' id="contactsList">
                              <div class="card-header">
                                <div class="row align-items-center">
                                  <div class="col">
                                    <!-- Form -->
                                    <form>
                                      <div class="input-group input-group-flush input-group-merge input-group-reverse">
                                        <input class="form-control list-search" type="search" placeholder="Buscar usuario" v-model="filtro">
                                        <span class="input-group-text">
                                          <i class="fe fe-search"></i>
                                        </span>
                                      </div>
                                    </form>
                                  </div>
                                  <div class="col-auto">
                                    <!-- Dropdown -->
                                    <button class="btn btn-sm btn-white" type="button"  v-on:click="filtrarUsuario()">
                                      <i class="fe fe-sliders me-1"></i> Filtrar <span class="badge bg-primary ms-1 d-none">0</span>
                                    </button>

                                  </div>
                                </div> <!-- / .row -->
                              </div>
                              <!-- Tabla -->
                              <div class="table-responsive">
                                <table class="table table-sm table-hover table-nowrap card-table">
                                  <thead>
                                    <tr>
                                      
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-name" href="#">Nombres</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-title" href="#">Rol</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-email" href="#">Correo</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-phone" href="#">Estado</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-score" href="#">Acciones</a>
                                      </th>
                                      
                                    </tr>
                                  </thead>
                                  <!-- Cuerpo de la tabla -->
                                  <paginate  tag="tbody" ref="usuariosPanel" name="usuariosPanel" :list="usuariosPanel" :per="numPaginas" class="list fs-base">
                                    <tr v-if="!loadData" v-for="item in paginated('usuariosPanel') ">
                                      <td>

                                        <!-- Avatar -->
                                        <div class="avatar avatar-xs align-middle me-2">
                                          <img class="avatar-img rounded-circle" src="assets/img/avatars/profiles/avatar-1.jpg" alt="...">
                                        </div> <a class="item-name text-reset" >{{item.nombres}}</a>

                                      </td>
                                      <td>

                                        <!-- Text -->
                                        <span class="item-title">{{item.rol}}</span>

                                      </td>
                                      <td>

                                        <!-- Email -->
                                        <a class="item-email text-reset" >{{item.email}}</a>

                                      </td>
                                      <td>

                                        <!-- Badge -->
                                        <span v-if="!item.estado" class="item-score badge bg-danger-soft">Inactivo</span>
                                        <span v-if="item.estado" class="item-score badge bg-success-soft">Activo</span>
                                      </td>
                                      
                                      <td class="text-end">

                                        <!-- Dropdown -->
                                        <div class="dropdown">
                                          <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fe fe-more-vertical"></i>
                                          </a>
                                          <div class="dropdown-menu dropdown-menu-end">
                                            <router-link :to="{name:'EditarUsuarioPanel',params:{id: item._id}}" class="dropdown-item">Editar</router-link>
                                            <a style="cursor:pointer" class="dropdown-item" v-b-modal="'desactivar'+item._id">
                                              <span v-if="item.estado">Desactivar</span>
                                              <span v-if="!item.estado">Activar</span>
                                            </a>
                                          </div>
                                          

                                        </div>

                                        <b-modal centered :id="'desactivar'+item._id" title="BootstrapVue" title-html="<h1 class='card-header-title' >Mensaje</h1>" @ok="actualizarEstadoUsuario(item._id,item.estado)">
                                            <p class="my-4">{{'Desea Actualizar el usuario '+item.email+'?'}}</p>
                                        </b-modal>
                                      </td>
                                    </tr>  
                                    </paginate>
                                    <tr v-if="loadData">
                                      <td colspan="5" class="text-center">
                                        <div class="spinner-border mt-5 mb-5" role="status">
                                          <span class="visually-hidden">Cargando...</span>
                                        </div>
                                      </td>
                                    </tr>
                                </table>
                              </div>
                              <div class="card-footer d-flex justify-content-between">

                                <!-- Pagination (prev) -->
                                <ul class="list-pagination-prev pagination pagination-tabs card-pagination">
                                  <li class="page-item">
                                    <a class="page-link ps-0 pe-4 border-end" v-on:click="prePage()"  >
                                      <i class="fe fe-arrow-left me-1"></i> Prev
                                    </a>
                                  </li>
                                </ul>

                                <!-- Pagination -->
                                
                                <paginate-links @change="onLangsPageChange" for="usuariosPanel" :classes="{'ul':['list-pagination','pagination','pagination-tabs','card-pagination',], 'a': ['page']}"></paginate-links>
                                
                                <!-- Pagination (next) -->
                                <ul class="list-pagination-next pagination pagination-tabs card-pagination">
                                  <li class="page-item">
                                    <a class="page-link ps-4 pe-0 border-start" v-on:click="nextPage()">
                                      Next <i class="fe fe-arrow-right ms-1"></i>
                                    </a>
                                  </li>
                                </ul>

                                <!-- Alert -->
                                

                              </div>
                            </div>

                          </div>
              
                        </div>
          </div>
        </div> <!-- / .row -->
      </div>
    </div>

        
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import TopNav from '@/components/TopNav.vue'
import axios from 'axios'
// import store from '@/store/index'
import { RouterLink } from 'vue-router'


export default {
  name: 'ListarUsuarioPanel',
  data(){
    return{
      usuariosPanel:[],
      usuarioArr:[],
      paginate: ['usuariosPanel'],
      currentPage:1,
      numPaginas:5,
      filtro:'',
      loadData:false
    }
  },
  components:{
    Sidebar,
    TopNav,
    RouterLink
},
  methods:{
    onLangsPageChange(toPage,fromPage){
      this.currentPage=toPage;
    },
    prePage(){
      if(this.currentPage>=2){
        this.$refs.usuariosPanel.goToPage(--this.currentPage);
      }
    },
    nextPage(){
      if(this.currentPage <= Math.ceil(this.usuariosPanel.length/this.numPaginas)){
        this.$refs.usuariosPanel.goToPage(++this.currentPage);
      }
    },
    filtrarUsuario(){
      let expression=new RegExp(this.filtro,'i')
      this.initData();
      // this.usuariosPanel=this.usuarioArr.filter(user=>expression.test(user.nombres)||expression.test(user.rol)||expression.test(user.email)||expression.test(user.estado))
    },
    initData(){
      this.loadData=true;
      axios.get(this.$url+'/getAllUsuarios/'+this.filtro,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': this.$store.state.token
      }
    }).then((result)=>{
      this.usuariosPanel=result.data;
      this.usuarioArr=this.usuariosPanel
      this.loadData=false;
    }).catch((error)=>{
      console.log(error)
    })
    },
    actualizarEstadoUsuario(id,estado){
      
      axios.put(this.$url+'/updateEstadoUsuario/'+id,{estado: estado },{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': this.$store.state.token
      }
    }).then((result)=>{
      console.log(result)
      this.$notify({
            group: 'foo',
            title: 'SUCCES',
            text: 'Se actualizó correctamente',
            type: 'succes'
          });
          this.initData();
    }).catch((error)=>{
      console.log(error)
      this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Error al actualizar',
            type: 'error'
          });
    })
    }
  },
  beforeMount(){
    this.initData();
  }
}

</script>
