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
                                    Ventas
                                    </h6>
                                    <!-- Title -->
                                    <h1 class="header-title">
                                    Listado de Ventas Registradas
                                    </h1>
                                </div>
                                </div> <!-- / .row -->                
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
                                    <button class="btn btn-sm btn-white" type="button"  v-on:click="filtrarVentas()">
                                      <i class="fe fe-sliders me-1"></i> Filtrar <span class="badge bg-primary ms-1 d-none">0</span>
                                    </button>
                                    <button class="btn btn-sm btn-white" type="button"  v-on:click="ExportarVentas()">
                                      <i class></i> Exportar <span class="badge bg-primary ms-1 d-none">0</span>
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
                                        <a class="list-sort text-muted" data-sort="item-cod" href="#">Codigo</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-cliente" href="#">Cliente</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" data-sort="item-precio" href="#">Precio</a>
                                      </th>
                                      <th>
                                        <a class="list-sort text-muted" >Acciones</a>
                                      </th>
                                      
                                    </tr>
                                  </thead>
                                  <!-- Cuerpo de la tabla -->
                                  <paginate  tag="tbody" ref="ventasPanel" name="ventaArr" :list="ventasPanel" :per="numPaginas" class="list fs-base">
                                    <tr v-if="!loadData" v-for="item in paginated('ventaArr') ">
                                      <td>

                                        <!-- Codigo -->
                                        <span class="item-cod">{{item.ventas.idVenta}}</span>

                                      </td>
                                      <td>

                                        <!-- Text -->
                                        <span class="item-cliente">{{item.ventas.nombreCliente}}</span>

                                      </td>
                                      <td>

                                        <!-- Email -->
                                        <a class="item-precio text-reset" >{{item.ventas.precio}}</a>

                                      </td>
                                      
                                        <td class="text-end">

                                            <!-- Dropdown -->
                                            <div class="dropdown">
                                            <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fe fe-more-vertical"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <router-link :to="{name:'DetalleVenta',params:{id: item._id}}" class="dropdown-item">Detalle</router-link>
                                            </div>                                        

                                            </div>

                                       
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
                                
                                <paginate-links @change="onLangsPageChange" for="ventasPanel" :classes="{'ul':['list-pagination','pagination','pagination-tabs','card-pagination',], 'a': ['page']}"></paginate-links>
                                
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
                </div>
            </div>
        </div>
    </div>
    
</template>


<script>
    import Sidebar from '@/components/Sidebar.vue';
    import TopNav from '@/components/TopNav.vue';

    export default {
        name: 'Ventas',

        Data(){
            return{
                ventaArr:[{
                    ventas:{
                        idVenta:'0001',
                        nombreCliente:'Sebastian Rodriguez',
                        precio:'Precio'
                    }},{
                        ventas:{
                        idVenta:'0002',
                        nombreCliente:'Jairo Melendez',
                        precio:'Precio'
                    }
                    },{
                        ventas:{
                        idVenta:'0003',
                        nombreCliente:'Luis Huerta',
                        precio:'Precio'
                    }
                    },{
                        ventas:{
                        idVenta:'0004',
                        nombreCliente:'Pedro Huamni',
                        precio:'Precio'
                    }
                    }],
                currentPage:1,
                numPaginas:5,
            }
        },

        components: {
            Sidebar,
            TopNav,
            Error,
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
            }
         }
    }
</script>
