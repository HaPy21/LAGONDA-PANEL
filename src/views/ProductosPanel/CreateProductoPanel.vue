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
                      Productos
                    </h6>
                    <!-- Title -->
                    <h1 class="header-title">
                      Todos los productos
                    </h1>
                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/ProductoPanel" class="nav-link" >Todos los productos</router-link>
                      </li>
                      <a class="nav-link active">Nuevo producto  </a>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Form -->
            <div class="mb-7">

            <div class="row justify-content-between align-items-center">
            <div class="col">
                <div class="row align-items-center">
                <div class="col-auto">

                    <!-- Avatar -->
                    <div class="avatar">
                    <img class="avatar-img rounded-circle" :src="srcImage" alt="...">
                    </div>

                </div>
                <div class="col ms-n2">

                    <!-- Heading -->
                    <h4 class="mb-1">
                    <b>Portada</b>
                    </h4>

                    <!-- Text -->
                    <small class="text-muted">
                    PNG o JPG no debe superar los 1000Px.
                    </small><br>
                    <small class="text-muted">
                    La imagen no debe superar los 1MB.
                    </small>

                </div>
                </div> <!-- / .row -->
            </div>
            <div class="col-auto">

                <!-- Button -->
                
                <label for="file-upload" class="btn btn-sm btn-primary">
                    Upload
                </label>
                <input style="display:none" id="file-upload" type="file" v-on:change="cargarImagen($event)"/>

            </div>
            </div> <!-- / .row -->

            <!-- Divider -->
            <hr class="my-5">

            <div class="row">
                <div class="col-6">

                <!-- Email address -->
                    <div class="form-group">

                    <!-- Label -->
                    <label class="mb-1">
                        Título del producto
                    </label>

                    <!-- Form text -->
                    <small class="form-text text-muted">
                        Nombre del producto comercial.
                    </small>

                    <!-- Input -->
                    <input type="email" class="form-control" placeholder="Título del producto" v-model="producto.titulo">

                    </div>

                </div>
                <div class="col-4">

                <!-- Email address -->
                    <div class="form-group">
                    <!-- Label -->
                    <label class="mb-1">
                        Modelo
                    </label>

                    <!-- Form text -->
                    <small class="form-text text-muted">
                        &nbsp;
                    </small>

                    <!-- Input -->
                    <input type="text" class="form-control" placeholder="Modelo" v-model="producto.modelo">

                    </div>

                </div>
               
            <div class="col-12 col-md-3">

                <!-- First name -->
                <div class="form-group">

                <!-- Label -->
                <label class="form-label">
                    Categoria
                </label>

                <!-- Input -->
                <select  class="form-select" v-model="producto.categoria">
                    <option value="" disabled selected>Seleccionar</option >
                    <option value="Rin">Rin</option>
                    <option value="Neumatico">Neumatico</option>
                </select>

                </div>

            </div>

            <!-- si es Rin -->
            <div>
                <div v-if="producto.categoria=='Rin'" class="col-12 col-md-3">
                    <!-- First name -->
                    <div class="form-group">
                    <!-- Label -->
                    <label class="form-label">
                        Medida
                    </label>
                    <!-- Input -->
                    <input  type="text" class="form-control" placeholder="Medida Rin">
                    </div>
                </div>
            </div>
            
            <!-- Termina si es Rin -->
            <div class="col-12 col-md-2">

                <!-- Last name -->
                <div class="form-group">

                <!-- Label -->
                <label class="form-label">
                    Precio
                </label>

                <!-- Input -->
                <input type="number" class="form-control" placeholder="Precio" v-model="producto.precio">

                </div>

            </div>
            
            <div class="col-12 col-md-12">

                <!-- Phone -->
                <div class="form-group">

                <!-- Label -->
                <label class="form-label">
                    Descripcción
                </label>

                <!-- Input -->
                <textarea class="form-control" id=""  rows="3" placeholder="Extracto" v-model="producto.descripcion"></textarea>

                </div>

            </div>
            
            </div> <!-- / .row -->



            <div class="row">
            <div class="col-12 col-md-6">

                <!-- Public profile -->
                <div class="form-group">

                <!-- Label -->
                <label class="mb-1">
                    Producto publicado
                </label>

                <!-- Form text -->
                <small class="form-text text-muted">
                    Si esta en check al momento de guardar el producto se publicará automaticamente.
                </small>

                <div class="row">
                    <div class="col-auto">

                    <!-- Switch -->
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="switchOne" v-model="producto.publicado"/>
                        <label class="form-check-label" for="switchOne"></label>
                    </div>

                    </div>
                    <div class="col ms-n2">

                    <!-- Help text -->
                    <small class="text-muted" v-if="!producto.publicado">
                        Mandar a borrador
                    </small>
                    <small class="text-muted" v-if="producto.publicado">
                        Mandar a publicar
                    </small>

                    </div>
                </div> <!-- / .row -->
                </div>

            </div>
            <div class="col-12 col-md-6">

                <!-- Allow for additional Bookings -->
                <div class="form-group">

                <!-- Label -->
                <label class="mb-1">
                    En descuento
                </label>

                <!-- Form text -->
                <small class="form-text text-muted">
                    Unicamente para productos en descuentos
                </small>

                <div class="row">
                    <div class="col-auto">

                    <!-- Switch -->
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="switchTwo" v-model="producto.enDescuento"/>
                        <label class="form-check-label" for="switchTwo"></label>
                    </div>

                    </div>
                    <div class="col ms-n2">

                    <!-- Help text -->
                    <small class="text-muted" v-if="!producto.enDescuento">
                        Descuento desactivado
                    </small>
                    <small class="text-muted" v-if="producto.enDescuento">
                        Descuento Activado
                    </small>

                    </div>
                </div> <!-- / .row -->
                </div>

            </div>
            </div> <!-- / .row -->

            <!-- Divider -->
            <hr class="mt-4 mb-5">

            <!-- Button -->
            <button class="btn btn-primary" v-on:click="validar()">
            Crear producto
            </button>


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
import axios from 'axios';

    export default {
        name:'CreateProductoPanel',
        components : {
            Sidebar,
            TopNav
        },
        data(){
            return{
                srcImage:'',
                producto:{
                    categoria:'',
                    publicado: false,
                    enDescuento:false,
                    portada:undefined
                },
                portada:''
            }
        },
        methods:{
            
            cargarImagen($event){
                var image;
                if($event.target.files.length>=1){
                    image=$event.target.files[0];
                }
                if(image.size<=100000){
                    if(image.type== 'image/jpeg'||image.type== 'image/jpg'||image.type== 'image/png'||image.type== 'image/webp'){
                        this.srcImage=URL.createObjectURL(image)
                        this.portada=image;
                        this.producto.portada=this.portada;
                    }
                    else{
                        this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: 'Selecciona una imagen',
                        type: 'error'
                    });
                    }
                }
                else{
                    this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: 'La Imagen no debe execeder 1MB',
                        type: 'error'
                    });
                }
            },
            validar(){
                // if(!this.producto.titulo){
                //     this.$notify({
                //         group: 'foo',
                //         title: 'ERROR',
                //         text: 'Coloque un nombre de producto',
                //         type: 'error'
                //     });
                // }
                // else if(!this.producto.categoria){
                //         this.$notify({
                //         group: 'foo',
                //         title: 'ERROR',
                //         text: 'Seleccione una categoria del producto',
                //         type: 'error'
                //     });
                // }
                // else if(!this.producto.precio){
                //         this.$notify({
                //         group: 'foo',
                //         title: 'ERROR',
                //         text: 'Coloque un precio',
                //         type: 'error'
                //     });
                // }
                // else if(!this.producto.descripcion){
                //         this.$notify({
                //         group: 'foo',
                //         title: 'ERROR',
                //         text: 'Coloque una descripción',
                //         type: 'error'
                //     });
                // }
                // else{
                    this.registrarProducto()
                // }
            },
            registrarProducto(){
                console.log(this.producto.categoria)
                // var fm=new FormData();
                // fm.append('titulo',this.producto.titulo);
                // fm.append('categoria',this.producto.categoria);
                // fm.append('precio',this.producto.precio);
                // fm.append('publicado',this.producto.publicado);
                // fm.append('descripcion',this.producto.descripcion);
                // fm.append('enDescuento',this.producto.enDescuento);
                // fm.append('portada',this.producto.portada);
                // axios.post(this.$url+'/registrarProducto',fm,{
                //     headers:{
                //         'Content-Type': 'multipart/form-data',
                //         'Authorization' : this.$store.state.token
                //     }
                // }).then((result)=>{
                //     this.$notify({
                //         group: 'foo',
                //         title: 'SUCCESS',
                //         text: result.data.message,
                //         type: 'succes'
                //     });
                //     console.log(result)
                // })
            }

        }
    }
</script>