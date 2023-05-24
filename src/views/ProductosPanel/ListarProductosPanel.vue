<template>
    <div>
          <Sidebar />
          <div class="main-content">
  
              <TopNav />
  
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
                                      Productos
                                      </h6>
  
                                      <!-- Title -->
                                      <h1 class="header-title">
                                      Nuevo Producto
                                      </h1>
  
                                  </div>
                                  </div> <!-- / .row -->
                                  <div class="row align-items-center">
                                  <div class="col">
  
                                      <!-- Nav -->
                                      <ul class="nav nav-tabs nav-overflow header-tabs">
                                      <li class="nav-item">
                                          <a class="nav-link active">
                                          Todos los productos
                                          </a>
                                      </li>
                                      <li class="nav-item">
                                          <router-link to="/ProductoPanel/create" class="nav-link">Nuevo producto</router-link>
                                      </li>
                                      
                                      </ul>
  
                                  </div>
                                  </div>
                              </div>
                          </div>
  
                          <div class="row">
                              <div class="col-12">
  
                                  <!-- Files -->
                                  <div class="card" data-list="{&quot;valueNames&quot;: [&quot;name&quot;]}">
                                  
                                  <div class="card-header">
                                      <div class="input-group input-group-flush input-group-merge input-group-reverse">
  
                                          <!-- Input -->
                                          <input class="form-control list-search" type="search" placeholder="Busca tu producto" v-model="filtro">
  
                                          <!-- Prepend -->
                                          <div class="input-group-text" style="cursor:pointer" v-on:click="getAllProductos">
                                          <span class="fe fe-search"></span>
                                          </div>
  
                                      </div>
  
                                  </div>
                                  <div class="card-body">
  
                                      <!-- List -->
                                      <ul class="list-group list-group-lg list-group-flush list my-n4" v-if="productos.length>=1">
                                          <li class="list-group-item" v-for="item in productos">
                                              <div class="row align-items-center">
                                              <div class="col-auto">
  
                                                  <!-- Avatar -->
                                                  <a href="#!" class="avatar avatar-lg">
                                                  <img :src="$url+'/getPortadaProducto/'+item.portada" alt="..." class="avatar-img rounded">
                                                  </a>
  
                                              </div>
                                              <div class="col ms-n2">
  
                                                  <!-- Title -->
                                                  <h4 class="mb-1 name">
                                                  <a href="#!">{{item.titulo}}</a>
                                                  </h4>
  
                                                  <!-- Text -->
                                                  <p class="card-text small text-muted mb-1">
                                                      {{item.categoria}} &nbsp;
                                                      <span v-if="!item.publicado" class="item-score badge bg-danger-soft">Borrador</span>
                                                      <span v-if="item.publicado" class="item-score badge bg-success-soft">Publicado</span>
                                                  </p>
  
                                                  <!-- Time -->
                                                  <p class="card-text small text-muted">
                                                      Creación <time datetime="2018-01-03">{{convertDate(item.fechaRegistro)}}</time>
                                                  </p>
  
                                              </div>
                                              <div class="col-auto">
                                                  <span><b>{{convertCurrency(item.precio)}}</b></span>
                                                
                                              </div>
                                              <div class="col-auto">
  
                                                  <!-- Dropdown -->
                                                  <div class="dropdown">
                                                  <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                      <i class="fe fe-more-vertical"></i>
                                                  </a>
                                                  <div class="dropdown-menu dropdown-menu-end">
                                                      <a href="#!" class="dropdown-item">
                                                      Editar
                                                      </a>
                                                  </div>
                                                  </div>
  
                                              </div>
                                              </div> <!-- / .row -->
                                          </li>
                                      </ul>
                                      <div class="text-center">
                                        <span v-if="productos.length==0"> NO SE ENCONTRARON PRODUCTOS</span>
                                      </div>
  
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
  
  import Sidebar from '@/components/Sidebar.vue';
  import TopNav from '@/components/TopNav.vue';
  import axios from 'axios';
  import moment from 'moment';
  import currency_formatter from 'currency-formatter';
  import Error from '@/components/Error.vue'
  
  export default {
    name: 'ListarProductosPanel',
    data() {
        return {
            productos: [],
            filtro: ''
        }
    },
    methods: {
        getAllProductos(){
            axios.get(this.$url+'/getAllProductos/'+this.filtro,{
                headers:{
                      'Content-Type': 'application/json',
                      'Authorization': this.$store.state.token,
                }
            }).then((result)=>{
                this.productos = result.data;
                console.log( this.productos);
            });
        },
  
        convertDate(date){
            return moment(date).format('YYYY-MM-DD');
        },
  
        convertCurrency(number){
            return currency_formatter.format(number, { code: 'USD' });
        }
    },
    beforeMount() {
        this.getAllProductos();
    },
    components: {
      Sidebar,
      TopNav,
      Error
    }
  }
  </script>
  