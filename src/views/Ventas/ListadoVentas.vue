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
                      ventas
                    </h6>
                    <!-- Title -->
                    <h1 class="header-title">
                      Todos las ventas realizadas
                    </h1>
                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a  class="nav-link active">
                          Todos las ventas
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/DashboardVentas" class="nav-link">Dashboard Ventas</router-link>

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
                                        <input class="form-control list-search" type="search" placeholder="Buscar venta" v-model="filtro">
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
                                        <a class="list-sort text-muted" data-sort="item-name" href="#">Codigo</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-fechaInicio" href="#">Fecha de Emision</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-title" href="#">Nombre</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-email" href="#">Precio</a>
                                      </th>

                                    </tr>
                                  </thead>
                                  <!-- Cuerpo de la tabla -->
                                  <paginate  tag="tbody" ref="usuarioArr" name="usuarioArr" :list="usuarioArr" :per="numPaginas" class="list fs-base">
                                    <tr v-if="!loadData" v-for="item in paginated('usuarioArr') ">
                                      <td>

                                        <!-- Codigo -->
                                        <span class="item-title">{{item.ventas.idVenta}}</span>

                                      </td>
                                      <td>

                                        <!-- Fecha -->
                                        <span class="item-fechaInicio">{{item.ventas.fechaInicio}}</span>

                                      </td>
                                      <td>

                                        <!-- Nombre -->
                                        <span class="item-title">{{item.ventas.nombreCliente}}</span>

                                      </td>
                                      <td>

                                        <!-- Precio -->
                                        <a class="item-email text-reset" >{{item.ventas.precio}}</a>

                                      </td>
                                      

                                      <td class="text-end">

                                        <!-- Dropdown -->
                                        <div class="dropdown">
                                          <!-- <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fe fe-more-vertical"></i>
                                          </a> -->
                                          <button class="btn btn-sm btn-white" type="button">
                                            <!-- <router-link to="/DetalleVenta" class="nav-link">Detalle</router-link> -->
                                            <router-link :to="{name:'DetalleVenta',params:{id: item.ventas.idVenta}}" class="dropdown-item">Detalle</router-link>
                                          </button>
                                        </div>
                                        <!-- 
                                        <b-modal centered :id="'desactivar'+item._id" title="BootstrapVue" title-html="<h1 class='card-header-title' >Mensaje</h1>" @ok="actualizarEstadoUsuario(item._id,item.estado)">
                                            <p class="my-4">{{'Desea Actualizar el usuario '+item.email+'?'}}</p>
                                        </b-modal> -->
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

                                <paginate-links @change="onLangsPageChange" for="usuarioArr" :classes="{'ul':['list-pagination','pagination','pagination-tabs','card-pagination',], 'a': ['page']}"></paginate-links>

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
  name: 'ListarVetasPanel',
  data(){
    return{
      usuariosPanel:[],
      usuarioArr:[

          {
            ventas: {
              idVenta: '0001',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Sebastian Rodriguez',
              precio: '$340.00',
            },
          },
          {
            ventas: {
              idVenta: '0002',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Jairo Melendez',
              precio: '$50.00',
            },
          },
          {
            ventas: {
              idVenta: '0003',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Luis Huerta',
              precio: '$300.00',
            },
          },
          {
            ventas: {
              idVenta: '0004',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Pedro Huamani',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0005',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Luis Sanchez',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0006',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Lionel Messi',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0007',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Cristiano Ronaldo',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0008',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Peter Parker',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0009',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Pedro Santos',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0010',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Peter Castle',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0011',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Jairo Melendez',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0012',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Renzo Roa',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0013',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Bruno Pinasco',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0014',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Sebastian Rodriguez',
              precio: '$340.00',
            },
          },
          {
            ventas: {
              idVenta: '0015',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Jairo Melendez',
              precio: '$50.00',
            },
          },
          {
            ventas: {
              idVenta: '0016',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Luis Huerta',
              precio: '$300.00',
            },
          },
          {
            ventas: {
              idVenta: '0017',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Pedro Huamani',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0018',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Luis Sanchez',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0019',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Lionel Messi',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0020',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Cristiano Ronaldo',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0021',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Peter Parker',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0022',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Pedro Santos',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0023',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Peter Castle',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0024',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Jairo Melendez',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0025',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Renzo Roa',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0026',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Bruno Pinasco',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0027',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Sebastian Rodriguez',
              precio: '$340.00',
            },
          },
          {
            ventas: {
              idVenta: '0028',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Jairo Melendez',
              precio: '$50.00',
            },
          },
          {
            ventas: {
              idVenta: '0029',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Luis Huerta',
              precio: '$300.00',
            },
          },
          {
            ventas: {
              idVenta: '0030',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Pedro Huamani',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0031',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Luis Sanchez',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0032',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Lionel Messi',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0033',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Cristiano Ronaldo',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0034',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Peter Parker',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0035',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Pedro Santos',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0036',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Peter Castle',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0037',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Jairo Melendez',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0038',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Renzo Roa',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0039',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Bruno Pinasco',
              precio: '$150.00',
            },
          },
          {
            ventas: {
              idVenta: '0040',
              fechaInicio: 'o1-06-2023',
              nombreCliente: 'Bruno Pinasco',
              precio: '$150.00',
            },
          },

      ],
      paginate: ['usuarioArr'],
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
        this.$refs.usuarioArr.goToPage(--this.currentPage);
      }
    },
    nextPage(){
      if(this.currentPage <= Math.ceil(this.usuarioArr.length/this.numPaginas)){
        this.$refs.usuarioArr.goToPage(++this.currentPage);
      }
    },
    filtrarUsuario(){
      let expression=new RegExp(this.filtro,'i')
      // this.initData();
      // this.usuariosPanel=this.usuarioArr.filter(user=>expression.test(user.nombres)||expression.test(user.rol)||expression.test(user.email)||expression.test(user.estado))
    },
    // initData(){
    //   this.loadData=true;
    //   axios.get(this.$url+'/getAllUsuarios/'+this.filtro,{
    //   headers:{
    //     'Content-Type': 'application/json',
    //     'Authorization': this.$store.state.token
    //   }
    // }).then((result)=>{
    //   this.usuariosPanel=result.data;
    //   this.usuarioArr=this.usuariosPanel
    //   this.loadData=false;
    // }).catch((error)=>{
    //   console.log(error)
    // })
    // },
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
          // this.initData();
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
  // beforeMount(){
  //   this.initData();
  // }
}

</script>